# Viability - MongoDB 8.0 install  
  
_<span style="color:DarkGreen;">Note: Mongo Shell (CLI) & Databsse Utility tools, now separate downloads & installs</span>_  
  
Install files location: <span style="color:DarkSlateBlue; font-weight: bold;">(S:)Software\Development\Mongo 8</span>  

MongoDB manual: https://www.mongodb.com/docs/manual/  

<br>

## Installing MongoDB 8 Server  
install file:   <span style="color:Purple;font-weight: bold;">mongodb-windows-x86_64-8.0.10-signed.msi</span>  
  
- create folder `C:\Mongo-8-0-10`  
  
- run install file  
  - choose "**Custom Install**" & select above location  
  - choose "**Install MongoDB as a Service**"  
  - select checkbox ✅ install Compass tool  
  
<br>  
update config file settings: <span style="color:Purple;">C:\Mongo-8-0-10\bin\mongod.cfg</span>  
  
```  
# Where and how to store data.  
storage:  
dbPath: C:\Mongo-8-0-10\data  
  
# where to write logging data.  
systemLog:  
destination: file  
logAppend: true  
path: C:\Mongo-8-0-10\log\mongod.log  
  
# network interfaces  
net:  
port: 27017  
bindIp: 127.0.0.1  
```  
 
create admin user 

```
use admin
db.createUser(
   {
     user: "admin",
     pwd: "password",
     roles:
       [
         { role: "root", db: "admin" }
       ]
   }
)
show users
```



  
### Startup - _via_ MongoDB Service  
  
_<span style="color:grey;">Windows Services - to Start/Stop...</span>_  
&emsp;&emsp;&ensp;![image.png](/.attachments/image-3c05a164-6364-4fe2-aa26-e467ecbfabae.png)  
### _or_ Startup manually _(powershell)_  
can stop above service & just startup MongoDB in a command window  
```  
cd C:\Mongo-8-0-10\  
bin\mongod.exe --config="bin\mongod.cfg"  
```  
  
  
### Running multiple MongoDB instances locally  
To startup both the original MongoDB 3.4.x version alongside the MongoDB 8.0.x, can simply change one of them to use a difference port number, within the <span style="color:Purple;font-weight: bold;">mongod.cfg</span>  
  
  
The version you want your local application to connect to, keep on port **27017**  
  
  
## Install Mongo Shell (mongosh)  
  
Install file: <span style="color:Purple;font-weight: bold;">mongosh-2.5.2-x64.msi</span>  
  
run `mongosh` command to start the CLI.  _<span style="color:DarkGreen;">&emsp;Note: installs adds to PATH env var</span>_  
_<span style="color:grey;"></span>_  
&emsp;&emsp;&ensp;![image.png](/.attachments/image-1ce60cb6-71c0-4838-8403-5a7b9a9366f3.png)  
  
  
  
  
## Install MongoDB Database Utility Tools  
<span style="color:grey; font-style:italic;">link to MongoDB install documentation</span>  
https://www.mongodb.com/docs/database-tools/installation/installation-windows/  
  
  
  
  
Install file: <span style="color:Purple;font-weight: bold;">mongodb-database-tools-windows-x86_64-100.12.2.msi</span>  
  
Install to `C:\Mongo-8-0-10\tools`  
  
_<span style="color:grey;"></span>_  
&emsp;&emsp;&ensp;![image.png](/.attachments/image-704660cd-723f-4454-be0f-048c3531cffd.png)