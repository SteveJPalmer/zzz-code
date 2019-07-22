/* tslint:disable:quotemark */

/* Mock Org service Requests */
/* unhappy path */
export const error: any =  { name: "ErrorInterceptor - Mock error...", error: true };

/* GroundHandlers */
export const mockGhA: any = {"dev": "DEV"};
// export const mockGhA: any = {"6":"Eddie Stobart"};
export const mockGhB: any = {"dev": "DEV", "test": "TEST"};
export const mockGhC: any = {"dev": "DEV", "test": "TEST", "zzz": "EXTRA"};
export const mockGhZ: any = {};


/* User Profile */
export const userProfileHL: any = { "name": "Steve Palmer",
                                    "email": "spalmer@hermes-cargo.com",
                                    "defaultGroundHandler": null };
export const userProfileHG: any = { "name": "Steve Palmer",
                                    "email": "ao.stevepalmer@gmail.com",
                                    "defaultGroundHandler": null };
export const userProfileSU: any = { "name": "Hermes Super",
                                    "email": "ngb2cuser1@gmail.com",
                                    "defaultGroundHandler": "HERMES" };
export const userProfileErrA: any = null;

/* User Organizations */
export const userOrgsA: any = { "orgs": [
    {
      "organizationId": "5dba9859-f058-44e6---Mock",
      "organizationName": "Steve_HG_Mock",
      "isGroundHandler": "true",
      "isAgent": "1330014",
      "isHaulier": "",
      "location": "LHR"
    }
  ]
};
export const userOrgsSU: any = { "orgs": [
    {
      "organizationId": "1",
      "organizationName": "Hermes",
      "isGroundHandler": "1",
      "isAgent": "1",
      "isHaulier": "1",
      "location": "LHR"
    }
  ]
};
export const userOrgsZ: any = { "orgs": null };

/* User Invites  */
export const userInvitesA: any = [
  {
    "invitedBy": "ngb2cuser1@gmail.com",
    "inviteStatus": 1,
    "invitedAs": 2
  }
];
export const userInvitesZ: any = [];

/* User Invites  */
export const invitedUsersA: any = [
  {
    "inviteStatus": 1,
    "invitedAs": "GROUNDHANDLER",
    "user": {
      "name": "Steve Palmer",
      "email": "ao.stevepalmer@gmail.com",
      "defaultGroundHandler": null
    },
    "userOrganization": null
  },
  {
    "inviteStatus": 2,
    "invitedAs": "GROUNDHANDLER",
    "user": {
      "name": "Mock User 1",
      "email": "mock1@gmail.com",
      "defaultGroundHandler": null
    },
    "userOrganization": null
  },
  {
    "inviteStatus": 2,
    "invitedAs": "GROUNDHANDLER",
    "user": {
      "name": "Mock User 2",
      "email": "mock2@gmail.com",
      "defaultGroundHandler": null
    },
    "userOrganization": null
  }
];

export const invitedUsersB: any = [
  {
    "inviteStatus": 1,
    "invitedAs": "AGENT",
    "user": {
      "name": "Test Agent 1",
      "email": "test-agent1@gmail.com",
      "defaultGroundHandler": null
    },
    "userOrganization": null
  },
  {
    "inviteStatus": 2,
    "invitedAs": "AGENT",
    "user": {
      "name": "Test Agent 2",
      "email": "test-agent2@gmail.com",
      "defaultGroundHandler": null
    },
    "userOrganization": null
  },
  {
    "inviteStatus": 1,
    "invitedAs": "HAULIER",
    "user": {
      "name": "Test Haulier 1",
      "email": "test-haulier1@gmail.com",
      "defaultGroundHandler": null
    },
    "userOrganization": null
  },
  {
    "inviteStatus": 2,
    "invitedAs": "HAULIER",
    "user": {
      "name": "Test Haulier 2",
      "email": "test-haulier2@gmail.com",
      "defaultGroundHandler": null
    },
    "userOrganization": null
  },
  {
    "inviteStatus": 1,
    "invitedAs": "DRIVER",
    "user": {
      "name": "Test Driver 1",
      "email": "test-driver1@gmail.com",
      "defaultGroundHandler": null
    },
    "userOrganization": null
  }
];

export const invitedUsersZ: any = [];


/* Search Users */
export const searchA: any = [
    {
      "inviteStatus": 0,
      "invitedAs": null,
      "user": {
        "name": "Hermes Super",
        "email": "ngb2cuser1@gmail.com",
        "defaultGroundHandler": null
      },
      "userOrganization": {
        "organizationId": "1",
        "organizationName": "Hermes",
        "isGroundHandler": "1",
        "isAgent": "1",
        "isHaulier": "1",
        "location": "LHR"
      }
    },
    {
      "inviteStatus": 0,
      "invitedAs": null,
      "user": {
        "name": "Steve Palmer",
        "email": "ao.stevepalmer@gmail.com",
        "defaultGroundHandler": null
      },
      "userOrganization": {
        "organizationId": "37e79884-4584-44e0-80ca-c4aef85f14af",
        "organizationName": "Steve_HG",
        "isGroundHandler": "1",
        "isAgent": "",
        "isHaulier": "",
        "location": "LHR"
      }
    }
];
export const searchB: any = [
  {
    "inviteStatus": 0,
    "invitedAs": 'AGENT',
    "user": {
      "name": "Test Agent 1",
      "email": "test1@gmail.com",
      "defaultGroundHandler": null
    },
    "userOrganization": {
      "organizationId": "37e79884-4584-44e0-80ca-c4aef85f14af",
      "organizationName": "TestOrg1",
      "isGroundHandler": "",
      "isAgent": "111",
      "isHaulier": "",
      "location": "LHR"
    }
  },
  {
    "inviteStatus": 0,
    "invitedAs": 'AGENT',
    "user": {
      "name": "Test Agent 2222",
      "email": "test2222@gmail.com",
      "defaultGroundHandler": null
    },
    "userOrganization": {
      "organizationId": "37e79884-4584-44e0-80ca-c4aef85f14af",
      "organizationName": "TestOrg22",
      "isGroundHandler": "",
      "isAgent": "222",
      "isHaulier": "",
      "location": "LHR"
    }
  },
  {
    "inviteStatus": 0,
    "invitedAs": 'AGENT',
    "user": {
      "name": "Test Agent 3",
      "email": "test33@gmail.com",
      "defaultGroundHandler": null
    },
    "userOrganization": {
      "organizationId": "37e79884-4584-44e0-80ca-c4aef85f14af",
      "organizationName": "TestOrg333",
      "isGroundHandler": "",
      "isAgent": "333",
      "isHaulier": "",
      "location": "LHR"
    }
  }
];
export const searchZ: any = [];
