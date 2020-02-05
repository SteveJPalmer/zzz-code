/* tslint:disable:prefer-const */
import {Injectable} from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { mockAWBsA as awbs, mockAWBsZ } from './mock-xhr-interceptor.data';
import { mockDropoffVSTReqA as dvcts, mockDropoffVSTReqZ } from './mock-xhr-interceptor.data';
import { mockPickupVSTReqA as pvcts, mockPickupVSTReqZ } from './mock-xhr-interceptor.data';

import { userProfileHL, userProfileHG as user, userProfileSU , userProfileErrA } from './mock-xhr-interceptor-org.data';
import { mockGhA, mockGhB as ghs, mockGhC, mockGhZ } from './mock-xhr-interceptor-org.data';
import { userOrgsA, userOrgsSU, userOrgsZ as userOrg} from './mock-xhr-interceptor-org.data';
import { userInvitesA as userInvites , userInvitesZ  } from './mock-xhr-interceptor-org.data';
import { invitedUsersA, invitedUsersB as invitedUsers, invitedUsersZ } from './mock-xhr-interceptor-org.data';
import { searchA, searchB as search, searchZ  } from './mock-xhr-interceptor-org.data';
import { error } from './mock-xhr-interceptor-org.data';

@Injectable()
export class MockXHRInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    //console.info('>>Request' + JSON.stringify(req,null,2) );   //write out full request

    /* ***************
     ** AWB Service **
     *****************/
    //new endpoints
    if (req.url.indexOf('api/airwaybills/getdropoffairwaybills/dev/99') != -1  && req.method === 'GET') {     //dropoffAWB with pagingation
      console.log('>>intercepted api/airwaybills/getdropoffairwaybills/99 request (with pagination)');
      let body: any[] = awbs;
      let status: number = 200;
      let headers: HttpHeaders = new HttpHeaders({
          'Content-Type' : 'application/json',
          'Access-Control-Expose-Headers' : 'ContinuationToken',
          'ContinuationToken' : '{"token":"mock-token"}'
        });
      let response: HttpResponse<Array<any>> = new HttpResponse({ "body" : body, "headers" : headers, "status" : status });
      //console.info('>>intercepted api/airwaybills/getdropoffairwaybills.. response: >>' + JSON.stringify( response, null, 2 ));
      return Observable.of(response);
    }
    if (req.url.indexOf('api/airwaybills/getdropoffairwaybills') != -1  && req.method === 'GET') {
      console.log('>>intercepted api/airwaybills/getdropoffairwaybills.. request');
      let body = awbs;
      let status = 200;
      return Observable.of(new HttpResponse({ status, body }));
    }
    if (req.url.indexOf('api/airwaybills/getpickupairwaybills') != -1  && req.method === 'GET') {
      console.log('>>intercepted api/airwaybills/getpickupairwaybills.. request');
      let body = awbs;
      let status = 200;
      return Observable.of(new HttpResponse({ status, body }));
    }
    //original endpoint
    if (req.url.indexOf('api/airwaybills/dev') != -1  && req.method === 'GET') {
      console.log('>>intercepted api/airwaybills/.. request');
      let body = awbs;
      let status = 200;
      return Observable.of(new HttpResponse({ status, body }));
    }


    /* ***************
     ** VCT Service **
     *****************/
    // with pagination mock
    // /*
    if (req.url.indexOf('/api/vct/getexportvctrequests') !== -1  && req.method === 'GET') {     //dropoffAWB with pagingation
      console.log('>>intercepted /api/vct/getexportvctrequests request (with pagination)');
      let body: any[] = dvcts;
      let status: number = 200;
      let headers: HttpHeaders = new HttpHeaders({
        'Content-Type' : 'application/json',
        'Access-Control-Expose-Headers' : 'ContinuationToken',
        'ContinuationToken' : '{"token":"mock-vct-dropoff-token"}'
      });
      let response: HttpResponse<Array<any>> = new HttpResponse({ 'body' : body, 'headers' : headers, 'status' : status });
      //console.info('>>intercepted /api/vct/getexportvctrequests.. response (with pagination): >>' + JSON.stringify( response, null, 2 ));
      return Observable.of(response);
    }

    // import pagination mock - switch to test gh
    if (req.url.indexOf('/api/vct/getimportvctrequests') !== -1  && req.method === 'GET') {     //dropoffAWB with pagingation
      console.log('>>intercepted /api/vct/getimportvctrequests request (with pagination)');
      let body: any[] = pvcts;
      let status: number = 200;
      let headers: HttpHeaders = new HttpHeaders({
        'Content-Type' : 'application/json',
        'Access-Control-Expose-Headers' : 'ContinuationToken',
        'ContinuationToken' : '{"token":"mock-vct-pickup-token"}'
      });
      let response: HttpResponse<Array<any>> = new HttpResponse({ 'body' : body, 'headers' : headers, 'status' : status });
      //console.info('>>intercepted /api/vct/getimportvctrequests/test.. response (with pagination): >>' + JSON.stringify( response, null, 2 ));
      return Observable.of(response);
    }
    // */

    // original no pagination
    /*
    //DropOff - GetExportVCTRequests
    if (req.url.indexOf('/api/vct/getexportvctrequests') != -1 && req.method === 'GET') {
      console.log('>>intercepted /api/vct/getexportvctrequests/dev.. request');
      let body = dvcts;
      let status = 200;
      return Observable.of(new HttpResponse({ status, body }));
    }
    //Pickup - GetImportVCTRequests
    if (req.url.indexOf('/api/vct/getimportvctrequests') != -1 && req.method === 'GET') {
      console.log('>>intercepted /api/vct/getimportvctrequests/dev.. request');
      let body = pvcts;
      let status = 200;
      return Observable.of(new HttpResponse({ status, body }));
    }
    */


    //new endpoints
    if (req.url.indexOf('api/vct/requestexportvct') != -1  && req.method === 'POST') {
      console.log('>>intercepted api/vct/requestexportvct/.. request');
      let body = "";
      let status = 200;
      return Observable.of(new HttpResponse({ status, body }));
    }
    if (req.url.indexOf('api/vct/requestimportvct') != -1  && req.method === 'POST') {
      console.log('>>intercepted api/vct/requestimportvct/.. request');
      let body = "";
      let status = 200;
      return Observable.of(new HttpResponse({ status, body }));
    }


    /* ***************
     ** ORG Service **
     *****************/
    // user profile
    if (req.url.endsWith('api/orgsgraph/getthisuserprofile') && req.method === 'GET') {
      console.log('>>intercepted api/orgsgraph/GetThisUserProfile request');
      let body = user;
      let status = 200;
      return Observable.of(new HttpResponse({ status, body }));
    }

    //  user GHs
    if (req.url.endsWith('api/orgsgraph/getthisusergroundhandlers') && req.method === 'GET') {
      console.log('>>intercepted api/orgsgraph/getthisusergroundhandlers request');
      let body = ghs;
      let status = 200;
      return Observable.of(new HttpResponse({ status, body }));
    }

    // user default GH
    if (req.url.indexOf('api/orgsgraph/updatethisuserdefaultgroundhandler') != -1  && req.method === 'POST') {
      console.log('>>intercepted api/orgsgraph/UpdateThisUserDefaultGroundHandler/.. request');
      let body = "";
      let status = 200;
      return Observable.of(new HttpResponse({ status, body }));
    }

    // get user orgs
    if (req.url.endsWith('api/orgsgraph/getuserorgs') && req.method === 'GET') {
      console.log('>>intercepted api/orgsgraph/getuserorgs request');
      let body = userOrg;
      let status = 200;
      return Observable.of(new HttpResponse({ status, body }));
    }

    // create organization
    if (req.url.indexOf('api/orgsgraph/createorganization') !== -1  && req.method === 'POST') {
      console.log('>>intercepted api/orgsgraph/createorganization.. request');
      let body = null;
      let status = 200;
      return Observable.of(new HttpResponse({ status, body }));
    }

    // get incoming Invites
    if (req.url.endsWith('api/orgsgraph/getincominginvites') && req.method === 'GET') {
      console.log('>>intercepted api/orgsgraph/getincominginvites request');
      let body = userInvites;
      // let body = error;
      let status = 200;
      return Observable.of(new HttpResponse({ status, body }));
    }

    // send Invite
    if (req.url.indexOf('api/orgsgraph/inviteuser') !== -1  && req.method === 'POST') {
      console.log('>>intercepted api/orgsgraph/inviteuser/ .. request');
      let body = '';
      let status = 200;
      return Observable.of(new HttpResponse({ status, body }));
    }

    // accept Invite
    if (req.url.indexOf('api/orgsgraph/acceptinvite') !== -1  && req.method === 'POST') {
      console.log('>>intercepted api/orgsgraph/acceptinvite/.. request');
      let body = null;
      // let body = error;
      let status = 200;
      return Observable.of(new HttpResponse({ status, body }));
    }

    // get Invited users
    if (req.url.endsWith('api/orgsgraph/getinvitedusers') && req.method === 'GET') {
      console.log('>>intercepted api/orgsgraph/getInvitedUsers request');
      let body = invitedUsers;
      // let body = error;
      let status = 200;
      return Observable.of(new HttpResponse({ status, body }));
    }

    // get Search
    if (req.url.indexOf('api/orgsgraph/searchusers/') !== -1 && req.method === 'GET') {
      console.log('>>intercepted api/orgsgraph/searchusers request');
      let body = search;
      // let body = error;
      let status = 200;
      return Observable.of(new HttpResponse({ status, body }));
    }

    return next.handle(req);
  }
}
