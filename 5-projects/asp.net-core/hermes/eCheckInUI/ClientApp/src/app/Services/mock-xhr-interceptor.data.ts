
//VSTs
/* new structure */
export const mockVSTReqA: any = [
  {
    "vehicleInfo": {
      "registrationNumber": "Reg01",
      "registrationTrailorNumber": 'Tr01',
      "driverInfo": {
        "driverFirstName": "Driver1",
        "driverMiddleName": null,
        "driverLastName": null,
        "driverId": 'D1'
      }
    },
    "vctManifestInfo": {
      "looseCargoInfo": [{
        "vctBookings": [{
              "userProvidedAirwayBill": {
                "awbNumber": "177-24050101",
                "origin": "LHR",
                "destination": "SYD",
                "commodityInfo": null,
                "shcs": null,
                "airlineInfo": {"airlineCode":"BA",
                                "airlineNumber":"125"},
                "flightLegs": null,
                "locations": null,
                "consignmentInfo": {
                  "expectedNumberOfPieces": "7",
                  "expectedWeight": "777.7",
                  "expectedVolume": "0.7"
                },
                "deliveryInfo": null,
                "agentInfo": {
                  "code": "",
                  "name": "",
                  "agentIATAAddress": "1330005",
                  "rakcCode": false
                },
                "assignedTo": "",
                "assignedByUser": "",
                "remarks": null,
                "createdTime": null,
                "liveUntil": null
              },
              "pieces": "2",
              "weight": "222.2"
            }
        ]
      }
      ]
    },
    "PreExecutionEvent": {},
    "PostExecutionEvent": null,
    "id": "4b72c74e-15df-4341-9da6-dd8ae7e2c828",
    "vctRequestStatus": 1,
    "customer": "steve123",
    "deliveryMethod": 1,
    "queueName": "q_vctrequests",
    "scheduledEnqueueTimeUtc": null,
    "originator": "43d4cfc8-f3ca-47a9-8152-f25d96d525f5",
    "groundHandlerId": "dev",
    "requestDateTime": 1552918513
  },
  {
    "vehicleInfo": {
      "registrationNumber": "Reg02",
      "registrationTrailorNumber": 'Tr02',
      "driverInfo": {
        "driverFirstName": "Driver2",
        "driverMiddleName": null,
        "driverLastName": null,
        "driverId": 'D2'
      }
    },
    "vctManifestInfo": {
      "looseCargoInfo": [{
        "vctBookings": [{
          "userProvidedAirwayBill": {
            "awbNumber": "177-24050201",
            "origin": "LHR",
            "destination": "SYD",
            "commodityInfo": null,
            "shcs": null,
            "airlineInfo": {"airlineCode":"BA",
                            "airlineNumber":"125"},
            "flightLegs": null,
            "locations": null,
            "consignmentInfo": {
              "expectedNumberOfPieces": "1",
              "expectedWeight": "111",
              "expectedVolume": "10.2"
            },
            "deliveryInfo": null,
            "agentInfo": {
              "code": "",
              "name": "",
              "agentIATAAddress": "1330005",
              "rakcCode": false
            },
            "assignedTo": "",
            "assignedByUser": "",
            "remarks": null,
            "createdTime": null,
            "liveUntil": null
          },
          "pieces": "1",
          "weight": "111"
        }, {
          "userProvidedAirwayBill": {
            "awbNumber": "177-24050202",
            "origin": "LHR",
            "destination": "SYD",
            "commodityInfo": null,
            "shcs": null,
            "airlineInfo": {"airlineCode":"BA",
                            "airlineNumber":"125"},
            "flightLegs": null,
            "locations": null,
            "consignmentInfo": {
              "expectedNumberOfPieces": "3",
              "expectedWeight": "30",
              "expectedVolume": "0.3"
            },
            "deliveryInfo": null,
            "agentInfo": {
              "code": "",
              "name": "",
              "agentIATAAddress": "1330005",
              "rakcCode": false
            },
            "assignedTo": "",
            "assignedByUser": "",
            "remarks": null,
            "createdTime": null,
            "liveUntil": null
          },
          "pieces": "2",
          "weight": "20"
        }
        ]
      }
      ]
    },
    "PreExecutionEvent": {},
    "PostExecutionEvent": null,
    "id": "4b72c74e-15df-4341-9da6-dd8ae7e2c828",
    "vctRequestStatus": 2,
    "customer": "steve123",
    "deliveryMethod": 1,
    "queueName": "q_vctrequests",
    "scheduledEnqueueTimeUtc": null,
    "originator": "43d4cfc8-f3ca-47a9-8152-f25d96d525f5",
    "groundHandlerId": "dev",
    "requestDateTime": 1552924800
  },
  {
    "vehicleInfo": {
      "registrationNumber": "Reg03",
      "registrationTrailorNumber": 'Tr03',
      "driverInfo": {
        "driverFirstName": "Driver3",
        "driverMiddleName": null,
        "driverLastName": null,
        "driverId": 'D3'
      }
    },
    "vctManifestInfo": {
      "looseCargoInfo": [{
        "vctBookings": [{
          "userProvidedAirwayBill": {
            "awbNumber": "177-24050301",
            "origin": "LHR",
            "destination": "SYD",
            "commodityInfo": null,
            "shcs": null,
            "airlineInfo": {"airlineCode":"AA",
                            "airlineNumber":"001"},
            "flightLegs": null,
            "locations": null,
            "consignmentInfo": {
              "expectedNumberOfPieces": "1",
              "expectedWeight": "111",
              "expectedVolume": "10.1"
            },
            "deliveryInfo": null,
            "agentInfo": {
              "code": "",
              "name": "",
              "agentIATAAddress": "1330005",
              "rakcCode": false
            },
            "assignedTo": "",
            "assignedByUser": "",
            "remarks": null,
            "createdTime": null,
            "liveUntil": null
          },
          "pieces": "1",
          "weight": "111"
        }, {
          "userProvidedAirwayBill": {
            "awbNumber": "177-24050302",
            "origin": "LHR",
            "destination": "SYD",
            "commodityInfo": null,
            "shcs": null,
            "airlineInfo": {"airlineCode":"AA",
                             "airlineNumber":"001"},
            "flightLegs": null,
            "locations": null,
            "consignmentInfo": {
              "expectedNumberOfPieces": "3",
              "expectedWeight": "30",
              "expectedVolume": "0.3"
            },
            "deliveryInfo": null,
            "agentInfo": {
              "code": "",
              "name": "",
              "agentIATAAddress": "1330005",
              "rakcCode": false
            },
            "assignedTo": "",
            "assignedByUser": "",
            "remarks": null,
            "createdTime": null,
            "liveUntil": null
          },
          "pieces": "2",
          "weight": "20"
        }, {
          "userProvidedAirwayBill": {
            "awbNumber": "177-24050303",
            "origin": "LHR",
            "destination": "SYD",
            "commodityInfo": null,
            "shcs": null,
            "airlineInfo": {"airlineCode":"AA",
                            "airlineNumber":"001"},
            "flightLegs": null,
            "locations": null,
            "consignmentInfo": {
              "expectedNumberOfPieces": "3",
              "expectedWeight": "30",
              "expectedVolume": "0.3"
            },
            "deliveryInfo": null,
            "agentInfo": {
              "code": "",
              "name": "",
              "agentIATAAddress": "1330005",
              "rakcCode": false
            },
            "assignedTo": "",
            "assignedByUser": "",
            "remarks": null,
            "createdTime": null,
            "liveUntil": null
          },
          "pieces": "1",
          "weight": "10"
        }
        ]
      }
      ]
    },
    "PreExecutionEvent": {},
    "PostExecutionEvent": null,
    "id": "4b72c74e-15df-4341-9da6-dd8ae7e2c828",
    "vctRequestStatus": 3,
    "vctNumber": "30000287010003",
    "customer": "steve123",
    "deliveryMethod": 1,
    "queueName": "q_vctrequests",
    "scheduledEnqueueTimeUtc": null,
    "originator": "43d4cfc8-f3ca-47a9-8152-f25d96d525f5",
    "groundHandlerId": "dev",
    "requestDateTime": 1552984213
  },
  {
    "vehicleInfo": {
      "registrationNumber": "Reg04",
      "registrationTrailorNumber": 'Tr04',
      "driverInfo": {
        "driverFirstName": "Driver4",
        "driverMiddleName": null,
        "driverLastName": null,
        "driverId": 'D4'
      }
    },
    "vctManifestInfo": {
      "looseCargoInfo": [{
        "vctBookings": [{
          "userProvidedAirwayBill": {
            "awbNumber": "177-24050401",
            "origin": "LHR",
            "destination": "SYD",
            "commodityInfo": null,
            "shcs": null,
            "airlineInfo": {"airlineCode":"NZ",
                            "airlineNumber":"86"},
            "flightLegs": null,
            "locations": null,
            "consignmentInfo": {
              "expectedNumberOfPieces": "4",
              "expectedWeight": "1001",
              "expectedVolume": "0.4"
            },
            "deliveryInfo": null,
            "agentInfo": {
              "code": "",
              "name": "",
              "agentIATAAddress": "1330005",
              "rakcCode": false
            },
            "assignedTo": "",
            "assignedByUser": "",
            "remarks": null,
            "createdTime": null,
            "liveUntil": null
          },
          "pieces": "4",
          "weight": "1001"
        }
        ]
      }
      ]
    },
    "PreExecutionEvent": {},
    "PostExecutionEvent": null,
    "id": "4b72c74e-15df-4341-9da6-dd8ae7e2c828",
    "vctRequestStatus": 4,
    "vctNumber": "30000287010004",
    "customer": "steve123",
    "deliveryMethod": 1,
    "queueName": "q_vctrequests",
    "scheduledEnqueueTimeUtc": null,
    "originator": "43d4cfc8-f3ca-47a9-8152-f25d96d525f5",
    "groundHandlerId": "dev",
    "requestDateTime": 1553243413
  },
  {
    "vehicleInfo": {
      "registrationNumber": "Reg05",
      "registrationTrailorNumber": 'Tr05',
      "driverInfo": {
        "driverFirstName": "Driver5",
        "driverMiddleName": null,
        "driverLastName": null,
        "driverId": 'D5'
      }
    },
    "vctManifestInfo": {
      "looseCargoInfo": [{
        "vctBookings": [{
          "userProvidedAirwayBill": {
            "awbNumber": "177-24050501",
            "origin": "LHR",
            "destination": "SYD",
            "commodityInfo": null,
            "shcs": null,
            "airlineInfo": {"airlineCode":"NZ",
                            "airlineNumber":"86"},
            "flightLegs": null,
            "locations": null,
            "consignmentInfo": {
              "expectedNumberOfPieces": "57",
              "expectedWeight": "1005",
              "expectedVolume": "55.5"
            },
            "deliveryInfo": null,
            "agentInfo": {
              "code": "",
              "name": "",
              "agentIATAAddress": "1330005",
              "rakcCode": false
            },
            "assignedTo": "",
            "assignedByUser": "",
            "remarks": null,
            "createdTime": null,
            "liveUntil": null
          },
          "pieces": "4",
          "weight": "44.4"
        }
        ]
      }
      ]
    },
    "PreExecutionEvent": {},
    "PostExecutionEvent": null,
    "id": "4b72c74e-15df-4341-9da6-dd8ae7e2c828",
    "vctRequestStatus": 5,
    "customer": "steve123",
    "deliveryMethod": 1,
    "queueName": "q_vctrequests",
    "scheduledEnqueueTimeUtc": null,
    "originator": "43d4cfc8-f3ca-47a9-8152-f25d96d525f5",
    "groundHandlerId": "dev",
    "requestDateTime": 1553353320
  },
  {
    "vehicleInfo": {
      "registrationNumber": "Reg05",
      "registrationTrailorNumber": 'Tr05',
      "driverInfo": {
        "driverFirstName": "MissingDataTests",
        "driverMiddleName": null,
        "driverLastName": null,
        "driverId": 'D5'
      }
    },
    "vctManifestInfo": {
      "looseCargoInfo": [{
        "vctBookings": [{
          "userProvidedAirwayBill": {
            "awbNumber": "177-24050501",
            "origin": "LHR",
            "destination": "SYD",
            "commodityInfo": null,
            "shcs": null,
            "airlineInfo": null,
            "flightLegs": null,
            "locations": null,
            "consignmentInfo": {
              "expectedNumberOfPieces": "57",
              "expectedWeight": "1005",
              "expectedVolume": "55.5"
            },
            "deliveryInfo": null,
            "agentInfo": {
              "code": "",
              "name": "",
              "agentIATAAddress": "1330005",
              "rakcCode": false
            },
            "assignedTo": "",
            "assignedByUser": "",
            "remarks": null,
            "createdTime": null,
            "liveUntil": null
          },
          "pieces": "4",
          "weight": "44.4"
        }
        ]
      }
      ]
    },
    "PreExecutionEvent": {},
    "PostExecutionEvent": null,
    "id": "4b72c74e-15df-4341-9da6-dd8ae7e2c828",
    "vctRequestStatus": 5,
    "customer": "steve123",
    "deliveryMethod": 1,
    "queueName": "q_vctrequests",
    "scheduledEnqueueTimeUtc": null,
    "originator": "43d4cfc8-f3ca-47a9-8152-f25d96d525f5",
    "groundHandlerId": "dev",
    "requestDateTime": 1553353320
  },
];


/* original structure */
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

//GroundHandlers
export const mockGhA: any = {"dev":"DEV"};
// export const mockGhA: any = {"6":"Eddie Stobart"};
export const mockGhB: any = {"dev":"DEV", "test":"TEST"};
export const mockGhC: any = {"dev":"DEV", "test":"TEST", "zzz":"EXTRA"};
export const mockGhZ: any = {};

//AWBs
/* new structure */
export const mockAWBsA: any[] = [
  {
    "awbNumber": "177-24050001",
    "origin": "LHR",
    "destination": "SYD",
    "commodityInfo": null,
    "shcs": null,
    "airlineInfo": null,
    "flightLegs": null,
    "locations": null,
    "consignmentInfo": {
      "expectedNumberOfPieces": "1",
      "expectedWeight": "1089",
      "expectedVolume": "2.6"
    },
    "deliveryInfo": null,
    "agentInfo": {
      "code": "",
      "name": "",
      "agentIATAAddress": "1330004",
      "rakcCode": false
    },
    "assignedTo": "",
    "assignedByUser": "",
    "remarks": null,
    "createdTime": null,
    "liveUntil": null,
    "id": "8bcefbd2-01f5-497b-b197-d076340612ee",
    "_rid": "fwwvAITMjogjAAAAAAAAAA==",
    "_self": "dbs/fwwvAA==/colls/fwwvAITMjog=/docs/fwwvAITMjogjAAAAAAAAAA==/",
    "_ts": 1553788290,
    "_etag": "\"2b00a418-0000-0000-0000-5c9ced820000\""
  },
  {
    "awbNumber": "177-24050002",
    "origin": "LHR",
    "destination": "SYD",
    "commodityInfo": null,
    "shcs": null,
    "airlineInfo": null,
    "flightLegs": null,
    "locations": null,
    "consignmentInfo": {
      "expectedNumberOfPieces": "3",
      "expectedWeight": "3001",
      "expectedVolume": "0.33"
    },
    "deliveryInfo": null,
    "agentInfo": {
      "code": "",
      "name": "",
      "agentIATAAddress": "1330004",
      "rakcCode": false
    },
    "assignedTo": "",
    "assignedByUser": "",
    "remarks": null,
    "createdTime": null,
    "liveUntil": null,
    "id": "8bcefbd2-01f5-497b-b197-d076340612ee",
    "_rid": "fwwvAITMjogjAAAAAAAAAA==",
    "_self": "dbs/fwwvAA==/colls/fwwvAITMjog=/docs/fwwvAITMjogjAAAAAAAAAA==/",
    "_ts": 1553788290,
    "_etag": "\"2b00a418-0000-0000-0000-5c9ced820000\""
  },
  {
    "awbNumber": "177-24050003",
    "origin": "LHR",
    "destination": "SYD",
    "commodityInfo": null,
    "shcs": null,
    "airlineInfo": null,
    "flightLegs": null,
    "locations": null,
    "consignmentInfo": {
      "expectedNumberOfPieces": "5",
      "expectedWeight": "5432",
      "expectedVolume": "55.5"
    },
    "deliveryInfo": null,
    "agentInfo": {
      "code": "",
      "name": "",
      "agentIATAAddress": "1330004",
      "rakcCode": false
    },
    "assignedTo": "",
    "assignedByUser": "",
    "remarks": null,
    "createdTime": null,
    "liveUntil": null,
    "id": "8bcefbd2-01f5-497b-b197-d076340612ee",
    "_rid": "fwwvAITMjogjAAAAAAAAAA==",
    "_self": "dbs/fwwvAA==/colls/fwwvAITMjog=/docs/fwwvAITMjogjAAAAAAAAAA==/",
    "_ts": 1553788290,
    "_etag": "\"2b00a418-0000-0000-0000-5c9ced820000\""
  }
];

export const mockAWBsB: any = [];

/* original structure */
export const mockAWBsZ: any[] = [
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

//User Profile
export const userProfileA: any = { "name": "Steve",
                                   "email": "spalmer@hermes-cargo.com ",
                                   "defaultGroundHandler": "dev" };

export const userProfileZ: any = { "name": "Steve",
                                   "email": "spalmer@hermes-cargo.com ",
                                    "defaultGroundHandler": null };
