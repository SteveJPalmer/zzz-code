/**********************************************
 ** Self-Referencing table & Hierarchy query **
 **********************************************/
select * from dbo.tblJobLink jl;
select * from dbo.tblJobRelationshipType jrt;

select * from dbo.tblJobLink jl
join dbo.tblJobRelationshipType tJRT on tJRT.JobRelationshipTypeID = jl.JobRelationshipTypeID

-- join to main Job table - ref via FK
select je.JobEntryID, je.Status, je.* from dbo.tblJobEntry je where jobEntryId < 80000012;

/******************************
 **          DDL             **
 ******************************/
/* TABLE  tblJobLink */
USE MearsData_MK_Dev
GO

CREATE TABLE [dbo].[tblJobLink]
(
    [ID]						INT	IDENTITY(1,1) NOT NULL,
	[JobEntryID]				INT NOT NULL,
	[ParentJobEntryID]			INT,
	[JobRelationshipTypeID]		INT NOT NULL,
	[RootJobEntryID]			INT NOT NULL,
	CONSTRAINT [PK_ID] PRIMARY KEY ([ID])
);
GO
CREATE UNIQUE INDEX [IX_tblJobLink_JobEntryID] ON [dbo].[tblJobLink]([JobEntryID])
GO
ALTER TABLE [dbo].[tblJobLink] ADD CONSTRAINT [FK_tblJobLink_tblJobEntry_JobEntryID] FOREIGN KEY([JobEntryID])
REFERENCES [dbo].[tblJobEntry] ([JobEntryID])
GO
ALTER TABLE [dbo].[tblJobLink] ADD CONSTRAINT [FK_tblJobLink_tblJobLink_ParentJobEntryID] FOREIGN KEY([ParentJobEntryID])
REFERENCES [dbo].[tblJobLink] ([JobEntryID])
GO
ALTER TABLE [dbo].[tblJobLink] ADD CONSTRAINT [FK_tblJobLink_tblJobRelationshipType_JobRelationshipTypeID] FOREIGN KEY([JobRelationshipTypeID])
REFERENCES [dbo].[tblJobRelationshipType] ([JobRelationshipTypeID])
GO
ALTER TABLE [dbo].[tblJobLink] ADD CONSTRAINT [FK_tblJobLink_tblJobLink_RootJobEntryID] FOREIGN KEY([RootJobEntryID])
REFERENCES [dbo].[tblJobLink] ([JobEntryID])
GO

/* TABLE tblJobRelationshipType */
use MearsData_MK_Dev
go

create table dbo.tblJobRelationshipType
(
    JobRelationshipTypeID int identity
        constraint PK_JobRelationshipTypeID
            primary key,
    Name                  varchar(30),
    Description           varchar(50),
    BlockParentCompletion bit
)
go

-- static data
INSERT INTO MearsData_MK_Dev.dbo.tblJobRelationshipType (Name, Description, BlockParentCompletion) VALUES (N'Child', N'', 0);


/* DEV DATA */
INSERT INTO MearsData_MK_Dev.dbo.tblJobRelationshipType (Name, Description, BlockParentCompletion) VALUES (N'Child', N'', 0);

INSERT INTO MearsData_MK_Dev.dbo.tblJobLink (JobEntryID, ParentJobEntryID, JobRelationshipTypeID, RootJobEntryID) VALUES (80000001, null, 1, 80000001);
INSERT INTO MearsData_MK_Dev.dbo.tblJobLink (JobEntryID, ParentJobEntryID, JobRelationshipTypeID, RootJobEntryID) VALUES (80000002, 80000001, 1, 80000001);
INSERT INTO MearsData_MK_Dev.dbo.tblJobLink (JobEntryID, ParentJobEntryID, JobRelationshipTypeID, RootJobEntryID) VALUES (80000003, 80000002, 1, 80000001);
INSERT INTO MearsData_MK_Dev.dbo.tblJobLink (JobEntryID, ParentJobEntryID, JobRelationshipTypeID, RootJobEntryID) VALUES (80000004, 80000003, 1, 80000001);

INSERT INTO MearsData_MK_Dev.dbo.tblJobLink (JobEntryID, ParentJobEntryID, JobRelationshipTypeID, RootJobEntryID) VALUES (80000010, null, 1, 80000010);
INSERT INTO MearsData_MK_Dev.dbo.tblJobLink (JobEntryID, ParentJobEntryID, JobRelationshipTypeID, RootJobEntryID) VALUES (80000011, 80000010, 1, 80000010);
INSERT INTO MearsData_MK_Dev.dbo.tblJobLink (JobEntryID, ParentJobEntryID, JobRelationshipTypeID, RootJobEntryID) VALUES (80000012, 80000010, 1, 80000010);



/* Procedure to add JobLinks */
CREATE PROCEDURE [dbo].[mcm_sp_add_job_link]
(
  @JobEntryId int,
  @ParentJobEntryId int,
  @TypeName varchar(30)
)
AS

-- get the tblJobRelationshipType  for @TypeName
DECLARE @JobRelationshipTypeID int

SELECT @JobRelationshipTypeID = jrt.JobRelationshipTypeID
  FROM dbo.tblJobRelationshipType jrt with (nolock)
 WHERE jrt.Name = @TypeName

-- get RootJobEntryId for the @JobEntryId
DECLARE @RootJobEntryID int

SELECT @RootJobEntryID = jl.RootJobEntryID
  FROM tblJobLink jl with (nolock)
 WHERE jl.JobEntryID = @ParentJobEntryId

-- if no RootJobEntryID found, set root to JobEntryId
IF @@ROWCOUNT = 0
BEGIN
  SET @RootJobEntryID = @JobEntryId
END

-- do insert...
INSERT INTO tblJobLink
            (JobEntryID, ParentJobEntryID, JobRelationshipTypeID, RootJobEntryID)
VALUES		(@JobEntryId, @ParentJobEntryId, @JobRelationshipTypeID, @RootJobEntryID)

IF @@Error <> 0
	RETURN 2
ELSE
	RETURN 0
GO


-- TEST HARNESS
USE MearsData_MK_Dev
GO

begin
    declare @JobEntryId int = 80000012
    declare @ParentJobEntryId int = 80000010
    declare @TypeName varchar(30) = 'Child'
    declare @result int
    exec
        @result = dbo.mcm_sp_add_job_link
                  @JobEntryId,
                  @ParentJobEntryId,
                  @TypeName
    select @result as result
end



/***********************************************
 ** Dev: Hierarchy Query to return child Jobs **
 ***********************************************/
-- basic Hierarchy -
-- SQLServer query a self-referencing table to retrieve Child records for a given parent
DECLARE @StartJobEntryID INT = 80000002;

-- Common Table Expression (CTE)  -- Note: CTE is temp named result set that can ref within SELECT, INSERT, UPDATE, or DELETE statement
WITH JobLinkHierarchy AS (
    SELECT *
    FROM dbo.tblJobLink
    WHERE JobEntryID = @StartJobEntryID

    UNION ALL

    SELECT jl.*
    FROM dbo.tblJobLink jl
    INNER JOIN JobLinkHierarchy jlh
        ON jl.ParentJobEntryID = jlh.JobEntryID
)
SELECT *
FROM JobLinkHierarchy;


-- full version - pass in a JobEntryID and will return any open child jobs
-- also join to tblJobEntry & tblJobRelationshipType & restrict by status
DECLARE @StartJobEntryID INT = 80000010;

WITH JobLinkHierarchy(JobEntryID, ParentJobEntryID, JobRelationshipTypeID, RootJobEntryID) AS (
    -- Anchor member
    SELECT JobEntryID, ParentJobEntryID, JobRelationshipTypeID, RootJobEntryID
      FROM dbo.tblJobLink
     WHERE ParentJobEntryID = @StartJobEntryID
    UNION ALL
    -- Recursive member
    SELECT jl.JobEntryID, jl.ParentJobEntryID, jl.JobRelationshipTypeID, jl.RootJobEntryID
      FROM dbo.tblJobLink jl
     INNER JOIN JobLinkHierarchy rjlh
             ON jl.ParentJobEntryID = rjlh.JobEntryID
)
SELECT jlh.*, jrt.BlockParentCompletion, je.JOBNo1, je.Description
  FROM JobLinkHierarchy jlh
  JOIN dbo.tblJobRelationshipType jrt
    ON jrt.JobRelationshipTypeID = jlh.JobRelationshipTypeID
  JOIN dbo.tblJobEntry je
    ON je.JobEntryID = jlh.JobEntryID
 WHERE jrt.BlockParentCompletion = 1
   AND je.Status < 4;



/* Hierarchy - procedure to check for open child jobs */
CREATE PROCEDURE [dbo].[mcm_sp_check_for_open_child_jobs]
(
  @JobEntryId int,
  @HasOpenChildJob bit OUTPUT
)

AS
BEGIN

    ;WITH JobLinkHierarchy(JobEntryID, ParentJobEntryID, JobRelationshipTypeID, RootJobEntryID) AS (
    -- Anchor member
    SELECT JobEntryID, ParentJobEntryID, JobRelationshipTypeID, RootJobEntryID
      FROM dbo.tblJobLink
     WHERE ParentJobEntryID = @JobEntryId
    UNION ALL
    -- Recursive member
    SELECT jl.JobEntryID, jl.ParentJobEntryID, jl.JobRelationshipTypeID, jl.RootJobEntryID
      FROM dbo.tblJobLink jl
     INNER JOIN JobLinkHierarchy rjlh
             ON jl.ParentJobEntryID = rjlh.JobEntryID
    )
    SELECT 1
      FROM JobLinkHierarchy jlh
      JOIN dbo.tblJobRelationshipType jrt
        ON jrt.JobRelationshipTypeID = jlh.JobRelationshipTypeID
      JOIN dbo.tblJobEntry je
        ON je.JobEntryID = jlh.JobEntryID
     WHERE jrt.BlockParentCompletion = 1
       AND je.Status < 4

    IF @@ROWCOUNT = 0
        BEGIN
             SET @HasOpenChildJob = 0
        END
    ELSE
        BEGIN
             SET @HasOpenChildJob = 1
        END
END
GO


-- TEST HARNESS
USE MearsData_MK_Dev
GO
BEGIN
    DECLARE @JobEntryId int = 80000003
    DECLARE @HasOpenChildJob bit
    DECLARE @ReturnValue int

    EXEC
        @ReturnValue = dbo.mcm_sp_check_for_open_child_jobs
                       @JobEntryId,
                       @HasOpenChildJob OUTPUT

    SELECT @HasOpenChildJob AS HasOpenChildJob;

    SELECT	'Return Value' = @ReturnValue
END
GO
