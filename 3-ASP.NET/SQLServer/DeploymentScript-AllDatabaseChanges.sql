/**************/
/* New tables */
/**************/

/* Example script for you to use ....

IF NOT EXISTS(
    SELECT 1
    FROM INFORMATION_SCHEMA.TABLES 
    WHERE
	 [TABLE_SCHEMA] = 'SCHEMA' 
     AND [TABLE_NAME]   = 'TABLE')
BEGIN
    CREATE TABLE
    (

    )
    CREATE UNIQUE NONCLUSTERED INDEX 
END
GO
*/

/*** 5489 ***/
IF NOT EXISTS(
    SELECT 1
    FROM INFORMATION_SCHEMA.TABLES 
    WHERE
	 [TABLE_SCHEMA] = 'PROCESS' 
     AND [TABLE_NAME]   = 'CATEGORY')
BEGIN
CREATE TABLE [Process].[Category]
(
	[Id] INT NOT NULL IDENTITY (1,1),
	[Description] NVARCHAR(256) NOT NULL,
	[Active] BIT DEFAULT 1 NOT NULL,
	[Rowversion] ROWVERSION NOT NULL,
	CONSTRAINT [PK_Category_Id] PRIMARY KEY CLUSTERED ([Id] ASC)
)

CREATE UNIQUE NONCLUSTERED INDEX [UQ_CategoryType_Description] ON [Process].[Category] ([Description] ASC)
END
GO

/*** 5075 ***/
IF NOT EXISTS(
    SELECT 1
    FROM INFORMATION_SCHEMA.TABLES 
    WHERE
	 [TABLE_SCHEMA] = 'Process' 
     AND [TABLE_NAME]   = 'ProcessGroupHeader')
BEGIN
CREATE TABLE [Process].[ProcessGroupHeader]
(
	[Id] INT NOT NULL IDENTITY (1, 1),
	[Name] NVARCHAR(100) NOT NULL,
	Description NVARCHAR(100),
	IsDeleted INT NOT NULL,
	ParentProcessId INT NULL,
	CONSTRAINT [PK_[ProcessGroup_Id] PRIMARY KEY CLUSTERED ([Id] ASC) 
)

CREATE UNIQUE NONCLUSTERED INDEX [UQ_ProcessGroup_Name]
	ON [Process].[ProcessGroupHeader] ([Name] ASC)
END
GO

IF NOT EXISTS(
    SELECT 1
    FROM INFORMATION_SCHEMA.TABLES 
    WHERE
	 [TABLE_SCHEMA] = 'Process' 
     AND [TABLE_NAME]   = 'ProcessGroupDetails')
BEGIN
CREATE TABLE [Process].[ProcessGroupDetails]
(
	[Id] INT NOT NULL IDENTITY (1, 1),
	 ProcessGroupHeaderId INT NULL,
	 ProcessDefinitionHeaderId INT NULL,
	CONSTRAINT [PK_[ProcessGroupDetails_Id] PRIMARY KEY CLUSTERED ([Id] ASC),
	CONSTRAINT [FK_ProcessGroupHeader_Id] FOREIGN KEY ([ProcessGroupHeaderId]) REFERENCES [Process].[ProcessGroupHeader] ([Id]),
	CONSTRAINT [FK_ProcessDefinitionHeader_Id] FOREIGN KEY (ProcessDefinitionHeaderId) REFERENCES [Process].[ProcessDefinitionHeader] ([Id])
)

CREATE UNIQUE NONCLUSTERED INDEX [UQ_ProcessGroup_Id]
	ON [Process].[ProcessGroupDetails] ([Id] ASC)
END
GO

/*** 5501 ***/
IF EXISTS(SELECT * FROM sys.tables WHERE SCHEMA_NAME(schema_id) LIKE 'Process' AND name like 'CategoryType')  
   DROP TABLE [Process].[CategoryType];  
GO

IF NOT EXISTS(SELECT * FROM sys.tables WHERE SCHEMA_NAME(schema_id) LIKE 'Process' AND name like 'CategoryValue')  
BEGIN
CREATE TABLE [Process].[CategoryValue]
(
	[Id] INT NOT NULL IDENTITY (1,1),
	[CategoryId] INT NOT NULL,
	[Value] NVARCHAR(256) NOT NULL,
	[Active] BIT DEFAULT 1 NOT NULL,
	[Rowversion] ROWVERSION NOT NULL,
	CONSTRAINT [PK_CategoryValue_Id] PRIMARY KEY CLUSTERED ([Id] ASC),
	CONSTRAINT [FK_CategoryValue_Category_CategoryId] FOREIGN KEY ([CategoryId]) REFERENCES [Process].[Category] ([Id])
)

CREATE UNIQUE NONCLUSTERED INDEX [UQ_CategoryValue_Value_CategoryId] ON [Process].[CategoryValue] ([Value] ASC, [CategoryId] ASC);
END
GO

/*** 5602 ***/
IF NOT EXISTS(SELECT * FROM sys.tables WHERE SCHEMA_NAME(schema_id) LIKE 'Process' AND name like 'WorkCategoryValue')  
	BEGIN
	CREATE TABLE [Process].[WorkCategoryValue]
	(
		[Id] INT NOT NULL IDENTITY (1,1),
		[WorksId] INT NOT NULL,
		[CategoryValueId] INT NOT NULL,
		CONSTRAINT [PK_WorkCategoryValue_Id] PRIMARY KEY CLUSTERED ([Id] ASC),
		CONSTRAINT [FK_WorkCategoryValue_Work_WorksId] FOREIGN KEY ([WorksId]) REFERENCES [Process].[Work] ([Id]),
		CONSTRAINT [FK_WorkCategoryValue_CategoryValue_CategoryValueId] FOREIGN KEY ([CategoryValueId]) REFERENCES [Process].[CategoryValue] ([Id])
	)
	END
GO

/***************/
/* New Columns */
/***************/

/* Example script for you to use ....

IF NOT EXISTS(
  SELECT 1
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE 
	[TABLE_SCHEMA] = 'SCHEMA'
    AND [TABLE_NAME]   = 'TABLE'
    AND [COLUMN_NAME]  = 'COLUMN')
BEGIN
    ALTER TABLE 
    ADD 
END
GO
*/

/*** 4908 ***/
IF NOT EXISTS(
  SELECT 1
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE 
	[TABLE_SCHEMA] = 'Authorisation'
    AND [TABLE_NAME]   = 'Membership'
    AND [COLUMN_NAME]  = 'IsDefaultTeam')
BEGIN
    ALTER TABLE [Authorisation].[Membership]
    ADD [IsDefaultTeam] BIT NULL
END
GO

/*** 4912 ***/
IF NOT EXISTS(
  SELECT 1
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE 
	[TABLE_SCHEMA] = 'Authorisation'
    AND [TABLE_NAME]   = 'TeamCluster'
    AND [COLUMN_NAME]  = 'IsdefaultTeam')
BEGIN
    ALTER TABLE [Authorisation].[TeamCluster]
    ADD [IsDefaultTeam] BIT NULL
END
GO

/*** 4916 ***/
IF NOT EXISTS(
  SELECT 1
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE 
	[TABLE_SCHEMA] = 'Process'
    AND [TABLE_NAME]   = 'ProcessDefinitionHeader'
    AND [COLUMN_NAME]  = 'KPI')
BEGIN
    ALTER TABLE [Process].[ProcessDefinitionHeader]
    ADD [KPI] BIT NOT NULL DEFAULT (0)
END
GO

/*** 5096 ***/
IF NOT EXISTS(
  SELECT 1
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE 
	[TABLE_SCHEMA] = 'Process'
    AND [TABLE_NAME]   = 'ProcessDefinitionHeader'
    AND [COLUMN_NAME]  = 'RetentionPeriod')
BEGIN
    ALTER TABLE [Process].[ProcessDefinitionHeader]
    ADD RetentionPeriod INT NOT NULL DEFAULT 0
END
GO

IF NOT EXISTS(
  SELECT 1
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE 
	[TABLE_SCHEMA] = 'Process'
    AND [TABLE_NAME]   = 'ProcessDefinitionHeader'
    AND [COLUMN_NAME]  = 'ArchivePeriod')
BEGIN
    ALTER TABLE [Process].[ProcessDefinitionHeader]
    ADD ArchivePeriod INT NOT NULL DEFAULT 0
END
GO

/*** 5100 ***/
IF NOT EXISTS(
  SELECT 1
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE 
	[TABLE_SCHEMA] = 'Asset'
    AND [TABLE_NAME]   = 'File'
    AND [COLUMN_NAME]  = 'RetentionExpiryDate')
BEGIN
    ALTER TABLE [Asset].[File]
    ADD [RetentionExpiryDate] DateTime DEFAULT null
END
GO

IF NOT EXISTS(
  SELECT 1
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE 
	[TABLE_SCHEMA] = 'Asset'
    AND [TABLE_NAME]   = 'File'
    AND [COLUMN_NAME]  = 'ArchiveExpiryDate')
BEGIN
    ALTER TABLE [Asset].[File]
    ADD [ArchiveExpiryDate] DateTime DEFAULT null
END
GO

/*** 5602 ***/
IF NOT EXISTS(
  SELECT 1
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE 
	[TABLE_SCHEMA] = 'Process'
    AND [TABLE_NAME]   = 'Category'
    AND [COLUMN_NAME]  = 'IsWorkId')
BEGIN
    ALTER TABLE [Process].[Category]
    ADD IsWorkId BIT NOT NULL DEFAULT (1)
END
GO

GO
 
/****5154****/
IF NOT EXISTS(SELECT * FROM sys.tables WHERE SCHEMA_NAME(schema_id) LIKE 'Process' AND name like 'WorkComment')  
	BEGIN
CREATE TABLE [Process].[WorkComment](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[WorkId] [int] NOT NULL,
	[Comment] [nvarchar](2048) NULL,
	[DateCreated] [datetime2](0) NOT NULL,
	[UserId] [nvarchar](256) NULL,
	CONSTRAINT [PK_WorkComment_Id] PRIMARY KEY CLUSTERED ([Id] ASC),
	CONSTRAINT [FK_WorkComment_Work_WorkId] FOREIGN KEY ([WorkId]) REFERENCES [Process].[Work] ([Id])
)
End
GO
/*** 5086 ***/
IF NOT EXISTS(
  SELECT 1
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE 
	[TABLE_SCHEMA] = 'Process'
    AND [TABLE_NAME]   = 'ProcessDefinitionHeader'
    AND [COLUMN_NAME]  = 'WorkflowStopDate')
BEGIN
    ALTER TABLE [Process].[ProcessDefinitionHeader]
    ADD [WorkflowStopDate] datetime
END
GO

  /*** 4873 ***/
IF EXISTS ( SELECT * FROM sysobjects WHERE id = object_id(N'[dbo].[WorksDueDate]') AND xtype IN (N'FN', N'TF'))
	 DROP FUNCTION [dbo].[WorksDueDate]
	GO
CREATE FUNCTION [dbo].[WorksDueDate]
(@workID INT)
RETURNS Date AS 
BEGIN
    DECLARE @deadLineDate Date;
   
 SET @deadLineDate = (SELECT (CASE WHEN WK.DateCreated IS NOT NULL AND 
	                                    (WD.DeadlineDays > 0 OR WD.DeadlineWeeks > 0 OR WD.DeadlineMonths > 0 OR WD.DeadlineYears > 0) 
	                                     THEN DATEADD(DAY,WD.DeadlineDays,DATEADD(WEEK,WD.DeadlineWeeks,
		                                 DATEADD(MONTH,WD.DeadlineMonths,DATEADD(YEAR,WD.DeadlineYears,WK.DateCreated))))
                                         ELSE NULL
                      END) AS DEADLINE 
                    FROM [Process].[Work] AS WK INNER JOIN [Process].[WorkDeadline] AS WD ON WK.WorkDeadlineId = WD.Id AND
                    WK.WorkTypeId = WD.WorkTypeId AND WK.Id = @workID)

    RETURN @deadLineDate;

END;
GO











