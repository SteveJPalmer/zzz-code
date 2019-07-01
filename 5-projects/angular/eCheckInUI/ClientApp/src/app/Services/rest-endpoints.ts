export let RestEndpoints = {
  awb: {
    getdropoffairwaybills: 'api/airwaybills/getdropoffairwaybills/',
    getpickupairwaybills: 'api/airwaybills/getpickupairwaybills/'
  },
  vct: {
    getimportvctrequests: 'api/vct/getimportvctrequests/',
    getexportvctrequests: 'api/vct/getexportvctrequests/',
    requestimportvct: 'api/vct/requestimportvct/',
    requestexportvct: 'api/vct/requestexportvct/'
  },
  orgs: {
    getthisuserprofile: 'api/orgsgraph/getthisuserprofile',
    getthisusergroundhandlers: 'api/orgsgraph/getthisusergroundhandlers',
    updatethisuserdefaultgroundhandler: 'api/orgsgraph/updatethisuserdefaultgroundhandler/'
  }
};
