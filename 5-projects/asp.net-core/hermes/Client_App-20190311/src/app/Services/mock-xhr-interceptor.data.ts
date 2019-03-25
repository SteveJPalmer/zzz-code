import { ExportVCTRequest, AirwayBill } from '../models';

//VSTs
export const mockVSTReqA: any = [
  { "customer":"steve123",
    "vehicleInfo":{"deliveryMethod":"FRONT","registrationNumber":"33CC","driver":"Mock A"},
    "manifestInfo":{"looseCargoInfo":[{"userProvidedAWBs":[
          {"prefix":"172","serial":"14051813","bookingInfo":{"pieces":"5","weight":"1471","airline":"172","destination":"LUX","commodityInfo":{"value":"Test value"},"agentInfo":{"code":"12345678","rakc":"AA/BB/00001-01","value":"TestAgent"},"shcs":[]},"deliveryInfo":{"pieces":"1"}}]}]},
    "id":"25de7ac0-1ee5-4ad8-9a3a-a57cf08abbc4","vctRequestStatus":1,"assignedTo":null,"originator":"43d4cfc8-f3ca-47a9-8152-f25d96d525f5", "vctCreatedDate":"01012019"},
  { "customer":"steve123",
    "vehicleInfo":{"deliveryMethod":"FRONT","registrationNumber":"AABBCC","driver":"Mock A"},
    "manifestInfo":{"looseCargoInfo":[{"userProvidedAWBs":[
          {"prefix":"172","serial":"33996686","bookingInfo":{"pieces":"1","weight":"294.2","airline":"172","destination":"BLR","commodityInfo":{"value":"Test value"},"agentInfo":{"code":"12345678","rakc":"AA/BB/00001-01","value":"TestAgent"},"shcs":[]},"deliveryInfo":{"pieces":"1"}}]}]},
    "id":"1dfcc521-56b4-4a72-a747-d94116fbdb7e","vctRequestStatus":2,"assignedTo":null,"originator":"43d4cfc8-f3ca-47a9-8152-f25d96d525f5", "vctCreatedDate":"02012019"},
  { "customer":"steve123",
    "vehicleInfo":{"deliveryMethod":"FRONT","registrationNumber":"ET11","driver":"Mock A"},
    "manifestInfo":{"looseCargoInfo":[{"userProvidedAWBs":[
          {"prefix":"175","serial":"54061916","bookingInfo":{"pieces":"5","weight":"1471","airline":"175","destination":"BLR","commodityInfo":{"value":"Test value"},"agentInfo":{"code":"12345678","rakc":"AA/BB/00001-01","value":"TestAgent"},"shcs":[]},"deliveryInfo":{"pieces":"3"}},
          {"prefix":"175","serial":"54061986","bookingInfo":{"pieces":"4","weight":"1176.8","airline":"175","destination":"BLR","commodityInfo":{"value":"Test value"},"agentInfo":{"code":"12345678","rakc":"AA/BB/00001-01","value":"TestAgent"},"shcs":[]},"deliveryInfo":{"pieces":"3"}},
          {"prefix":"175","serial":"54061816","bookingInfo":{"pieces":"3","weight":"882.5999999999999","airline":"175","destination":"BLR","commodityInfo":{"value":"Test value"},"agentInfo":{"code":"12345678","rakc":"AA/BB/00001-01","value":"TestAgent"},"shcs":[]},"deliveryInfo":{"pieces":"3"}}]}]},
    "id":"7bd039af-c9ee-4b02-af94-5d9c43c12e36","vctRequestStatus":3,"assignedTo":null,"originator":"43d4cfc8-f3ca-47a9-8152-f25d96d525f5", "vctNumber":"30000287010001", "vctCreatedDate":"03012019"}
];


export const mockVSTReqB: any = [
  {"vehicleInfo":{"deliveryMethod":"FRONT","registrationNumber":"33CC","driver":"Mock B"},
    "manifestInfo":{"looseCargoInfo":[{"userProvidedAWBs":[
          {"prefix":"172","serial":"14051813","bookingInfo":{"pieces":"5","weight":"1471","airline":"172","destination":"LUX","commodityInfo":{"value":"Test value"},"agentInfo":{"code":"12345678","rakc":"AA/BB/00001-01","value":"TestAgent"},"shcs":[]},"deliveryInfo":{"pieces":"1"}}]}]},
    "customer":"steve123","id":"25de7ac0-1ee5-4ad8-9a3a-a57cf08abbc4","vctRequestStatus":1,"assignedTo":null,"originator":"43d4cfc8-f3ca-47a9-8152-f25d96d525f5", "vctCreatedDate":"01012019"},
  {"vehicleInfo":{"deliveryMethod":"FRONT","registrationNumber":"AABBCC","driver":"Mock B"},
    "manifestInfo":{"looseCargoInfo":[{"userProvidedAWBs":[
          {"prefix":"172","serial":"33996686","bookingInfo":{"pieces":"1","weight":"294.2","airline":"172","destination":"BLR","commodityInfo":{"value":"Test value"},"agentInfo":{"code":"12345678","rakc":"AA/BB/00001-01","value":"TestAgent"},"shcs":[]},"deliveryInfo":{"pieces":"1"}}]}]},
    "customer":"steve123","id":"1dfcc521-56b4-4a72-a747-d94116fbdb7e","vctRequestStatus":2,"assignedTo":null,"originator":"43d4cfc8-f3ca-47a9-8152-f25d96d525f5", "vctCreatedDate":"02012019"},
  {"vehicleInfo":{"deliveryMethod":"FRONT","registrationNumber":"AABBCC","driver":"Mock B"},
    "manifestInfo":{"looseCargoInfo":[{"userProvidedAWBs":[
          {"prefix":"172","serial":"33996686","bookingInfo":{"pieces":"1","weight":"294.2","airline":"172","destination":"BLR","commodityInfo":{"value":"Test value"},"agentInfo":{"code":"12345678","rakc":"AA/BB/00001-01","value":"TestAgent"},"shcs":[]},"deliveryInfo":{"pieces":"1"}}]}]},
    "customer":"steve123","id":"1dfcc521-56b4-4a72-a747-d94116fbdb7e","vctRequestStatus":3,"assignedTo":null,"originator":"43d4cfc8-f3ca-47a9-8152-f25d96d525f5", "vctNumber":"30000287010002", "vctCreatedDate":"02012019"},
  {"vehicleInfo":{"deliveryMethod":"FRONT","registrationNumber":"ET11","driver":"Mock B"},
    "manifestInfo":{"looseCargoInfo":[{"userProvidedAWBs":[
          {"prefix":"175","serial":"54061916","bookingInfo":{"pieces":"5","weight":"1471","airline":"175","destination":"BLR","commodityInfo":{"value":"Test value"},"agentInfo":{"code":"12345678","rakc":"AA/BB/00001-01","value":"TestAgent"},"shcs":[]},"deliveryInfo":{"pieces":"3"}},
          {"prefix":"175","serial":"54061986","bookingInfo":{"pieces":"4","weight":"1176.8","airline":"175","destination":"BLR","commodityInfo":{"value":"Test value"},"agentInfo":{"code":"12345678","rakc":"AA/BB/00001-01","value":"TestAgent"},"shcs":[]},"deliveryInfo":{"pieces":"3"}},
          {"prefix":"175","serial":"54061816","bookingInfo":{"pieces":"3","weight":"882.5999999999999","airline":"175","destination":"BLR","commodityInfo":{"value":"Test value"},"agentInfo":{"code":"12345678","rakc":"AA/BB/00001-01","value":"TestAgent"},"shcs":[]},"deliveryInfo":{"pieces":"3"}}]}]},
    "customer":"steve123","id":"7bd039af-c9ee-4b02-af94-5d9c43c12e36","vctRequestStatus":4,"assignedTo":null,"originator":"43d4cfc8-f3ca-47a9-8152-f25d96d525f5", "vctNumber":"30000287010003", "vctCreatedDate":"03012019"},
  {"vehicleInfo":{"deliveryMethod":"FRONT","registrationNumber":"AABBCC","driver":"Mock B"},
    "manifestInfo":{"looseCargoInfo":[{"userProvidedAWBs":[
          {"prefix":"172","serial":"33996686","bookingInfo":{"pieces":"1","weight":"294.2","airline":"172","destination":"BLR","commodityInfo":{"value":"Test value"},"agentInfo":{"code":"12345678","rakc":"AA/BB/00001-01","value":"TestAgent"},"shcs":[]},"deliveryInfo":{"pieces":"1"}}]}]},
    "customer":"steve123","id":"1dfcc521-56b4-4a72-a747-d94116fbdb7e","vctRequestStatus":5,"assignedTo":null,"originator":"43d4cfc8-f3ca-47a9-8152-f25d96d525f5", "vctCreatedDate":"02012019"}
];

//GroungHandlers
export const mockGhA: any = {"dev":"DEV"};
// export const mockGhA: any = {"6":"Eddie Stobart"};
export const mockGhB: any = {"dev":"DEV", "6":"Eddie Stobart"};
export const mockGhC: any = {"dev":"DEV", "6":"Eddie Stobart", "2":"FCS"};
export const mockGhZ: any = {};

//AWBs
export const mockAWBsA: any[] = [
  {
    "id": "36542feb-23e9-402d-ab2b-a001c747b405",
    "awbNumber": "172-34051814", "origin": "LHR", "destination": "DEL", "numberOfPieces": "5", "weight": "1471", "volume": "0.6",
    "assignedTo": "", "assignedByUser": "", "vctRequestRefId": ""
  },
  {
    "id": "a8e8d5f6-c70e-4be3-9787-0131bb30c572",
    "awbNumber": "172-14051814", "origin": "LHR", "destination": "DEL", "numberOfPieces": "5", "weight": "1471", "volume": "0.6",
    "assignedTo": "", "assignedByUser": "", "vctRequestRefId": ""
  },
  {
    "id": "03b0ca1c-c1b5-40d2-87c3-956ea6304634",
    "awbNumber": "172-24051814", "origin": "LHR", "destination": "DEL", "numberOfPieces": "5", "weight": "1471", "volume": "0.6",
    "assignedTo": "", "assignedByUser": "", "vctRequestRefId": ""
  }
];

export const mockAWBsB: any = [];
