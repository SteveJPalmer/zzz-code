Document to detail technical aspects of **ADP** _(Automated Data Processing)_ project.

# **Architecture**
A reference architecture is available from Microsoft which outlines a scalable & secure solution for building automated document processing pipelines.
As is close match for ADP project requirements, it will serve as the project baseline architecture.

_<span style="color:grey;">Extract from Microsoft's Reference Architecture - “Extraction” phase</span>_
&emsp;&emsp;&ensp;![image.png](/.attachments/image-3c6205c7-4272-4d8a-9157-dd779497c8f5.png)

<span style="color:grey; font-style:italic;">link to Reference Architecture</span>
https://learn.microsoft.com/en-us/azure/architecture/example-scenario/ai/automate-document-processing-azure-form-recognizer

_<span style="color:DarkGreen;">ADP Specific Notes:</span>_
File ingestion flow <span style="color:grey;">_(extraction steps 2 & 3)_</span> will push files directly to Azure Blob Storage service, rather than the Back-End application directly calling Azure Form Recognizer. &nbsp;_(this will allow a single consistent document processing workflow via Azure functions)_

<br>

# **Source Code**

Source Code _(git)_: https://dev.azure.com/pimssdatasystems/_git/Clarity?path=/Clarity.ADP.Func

Monorepo contains a separate project for the Azure ADP Service, namely: `Clarity.ADP.Func` 

<br>

# **Azure Document Analysis Service**
Project will use **Azure Form Recognizer** Service to extract document data.  The service is part of Azures Applied AI Services for 'task' specific scenarios, which build upon the more familiar suite of Azure Cognitive services.

<span style="color:grey; font-style:italic;">link to Form Recognizer documentation</span>
 https://learn.microsoft.com/en-us/azure/applied-ai-services/form-recognizer/?view=form-recog-3.0.0

**Custom Models** must be created for each specific business document that ADP project will support.
These custom Models are initially manually 'trained' by providing the service with 5+ sample documents.
_(The individual Models will be grouped into composite groups for deployment across environments)_

<span style="color:grey; font-style:italic;">link to Building & Training Custom Models documentation</span>
https://learn.microsoft.com/en-us/azure/applied-ai-services/form-recognizer/how-to-guides/build-a-custom-model?view=form-recog-3.0.0


<br>

## Azure Function App
`func-pimss-adp-[dev]`    - Function App containing all Azure functions required for ADP Document analysis workflow

## Azure Functions

`DocumentDetected`  - trigger on Blob Storage Container (`adp-document-uploads-[dev]`)

`DocumentAnalyze`   - trigger on Storage Queue (`adp-document-analysis-[dev]`)

<br>

## Function App Config properties
config properties will enable deployment of the Function App across environments

| Property | Value _(Development)_ |
|--|--|
| ADPAnalyzeFieldTable | `ADPAnalyzeFieldDev` |
| ADPAnalyzeInstanceTable | `ADPAnalyzeInstanceDev` |
| ADPDocumentAnalysisQueue | `adp-document-analysis-dev` |
| ADPDocumentProcessedBlobContainer | `adp-document-processed-dev` |
| ADPDocumentUploadBlobContainer | `adp-document-upload-dev` |
| ADPFormRecognizerEndpoint | `https://uksouth.api.cognitive.microsoft.com/` |
| ADPFormRecognizerKey | `...` |
| ADPServiceCustomModel | `Composite_SuperSet` |
| ADPServiceUsageTable | `ADPServiceUsageDev` |
| AzureWebJobsStorage | `DefaultEndpointsProtocol=https;AccountName=compliancedevforms;AccountKey=...` |

<br>
<span style="color:Purple;">./hosts.json</span>  
   
```
"queues": {
            "maxDequeueCount": 1,
            "messageEncoding": "base64"
          }
```

## Extracted Data tables

`ADPAnalyzeInstance[Dev]`  - instance record for Analysis request  
_(includes the requestId, matched document type & confidence score)_

`ADPAnalyzeField[Dev]`   - detail table - contains a row for each extracted data item


<br>

# **Document Uploading**

## Azure App Service
`api-pimss-adp-[dev]`    - Web API App containing ADP endpoints

## Swagger API Endpoints
local: https://localhost:44400/swagger/index.html  
Development: https://api-pimss-adp-dev.azurewebsites.net/swagger/index.html


## App Config properties
config properties will enable deployment of the Function App across environments

| Property | Value _(Development)_ |
|--|--|
| AnalyzeFieldTable| `ADPAnalyzeFieldDev` |
| AnalyzeInstanceTable | `ADPAnalyzeInstanceDev` |
| BlobContainerName | `adp-document-upload-dev` |
| BlobProcessedContainer | `adp-document-processed-dev` |
| ServiceUsageTable | `ADPServiceUsageDev` |



## Blob Storage Container
`adp-document-uploads-[dev]`    - stores uploaded documents pending analysis


## Blob Storage Metadata
_<span style="color:DarkGreen;">Note: documents uploaded without associated metadata will not be processed</span>_

- `customerName`
- `userName`
- `requestId`  _(application generated GUID)_

_<span style="color:grey;">Example  screenshot from Azure Storage Explorer</span>_
&emsp;&emsp;&ensp;![image.png](/.attachments/image-ba02e5f2-2135-4a51-ae29-f143ce5bbbba.png)

## Storage Queues
Communication channels for decoupled ADP components & services.

- `adp-document-analysis-[dev]`      &emsp;&emsp;&emsp; - queue request to Form Recognizer service
- `adp-document-analysis-[dev]-poison`  &nbsp;- failed dequeue attempts _(after configured retries)_

## Queue Message Structures
type: `AnalyzeMessage`     &emsp;&emsp; - Form Recognizer request for given Document

```
{
  "DocumentName": "Test_Document1.pdf",
  "CustomerName": "Test_CustomerA",
  "UserName": "UserX",
  "RequestId": "[GUID]",
  "UsageRowKey": "[GUID]"
}
```

<br><br>

# **Service Usage Tracking**
Service enables billing on a per customer basis.

Table Storage: `ADPServiceUsage[Dev]`  

_<span style="color:grey;">Example  screenshot from Azure Storage Explorer</span>_
&emsp;&emsp;&ensp;![image.png](/.attachments/image-84758286-f2ec-4236-b35f-463aa0805e77.png)

## Analysed Status
| Status | Value |
|--|--|
| 'Pending' | 0 |
| 'Completed' | 1 |
| 'Failed' | 2 |

<br><br>


# Azure Environments
## "Development" 
- `RG-DEV-FORM-REC`     &emsp;&emsp;&nbsp;- Resource Group for all development artifacts
- `compliancedevforms`  &emsp;- Storage Account
- `FORM-RECOG-TEST1`    &emsp;&ensp;&nbsp;- Form Recognizer Service

<br><br>


# **Compliance Integration**

## Request Tracking table 
`[Asset].AnalysedDocument`    - Table containing a history each Analysis request made from Compliance
_<span style="color:DarkGreen;">Note: stored RequestId gives reference to Azure Document Analysis Service instance</span>_

## Request Status  

| Status | Value |
|--|--|
| 'Pending' | 0 |
| 'Analysed' | 1 |
| 'OnHold' | 2 |
| 'Completed' | 3 |
| 'Error' | 4 |





    
