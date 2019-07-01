import {Injectable} from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { mockGhA, mockGhB as ghs, mockGhC, mockGhZ } from './mock-xhr-interceptor.data';
import { mockAWBsA as awbs, mockAWBsZ } from './mock-xhr-interceptor.data';
import { mockDropoffVSTReqA as dvcts, mockDropoffVSTReqZ } from './mock-xhr-interceptor.data';
import { mockPickupVSTReqA as pvcts, mockPickupVSTReqZ } from './mock-xhr-interceptor.data';
import { userProfileA as user, userProfileZ} from './mock-xhr-interceptor.data';
import {Http} from "@angular/http";

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
    if (req.url.endsWith('api/orgsgraph/getthisusergroundhandlers') && req.method === 'GET') {
      console.log('>>intercepted api/orgsgraph/getthisusergroundhandlers request');
      let body = ghs;
      let status = 200;
      return Observable.of(new HttpResponse({ status, body }));
    }

    //orgs service - user profile
    if (req.url.endsWith('api/orgsgraph/getthisuserprofile') && req.method === 'GET') {
      console.log('>>intercepted api/orgsgraph/GetThisUserProfile request');
      let body = user;
      let status = 200;
      return Observable.of(new HttpResponse({ status, body }));
    }

    //orgs service - user default GH
    if (req.url.indexOf('api/orgsgraph/updatethisuserdefaultgroundhandler') != -1  && req.method === 'POST') {
      console.log('>>intercepted api/orgsgraph/UpdateThisUserDefaultGroundHandler/.. request');
      let body = "";
      let status = 200;
      return Observable.of(new HttpResponse({ status, body }));
    }

    return next.handle(req);
  }
}
