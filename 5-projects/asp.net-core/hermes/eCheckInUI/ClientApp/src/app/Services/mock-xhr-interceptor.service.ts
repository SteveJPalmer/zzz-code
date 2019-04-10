import {Injectable} from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent,  HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { mockGhA, mockGhB, mockGhC  as ghs, mockGhZ } from './mock-xhr-interceptor.data';
import { mockVSTReqA as vcts, mockVSTReqB } from './mock-xhr-interceptor.data';
import { mockAWBsA as awbs, mockAWBsB } from './mock-xhr-interceptor.data';
import { userProfileA as user, userProfileZ} from './mock-xhr-interceptor.data';

@Injectable()
export class MockXHRInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    //console.info('>>Request' + JSON.stringify(req,null,2) );   //write out full request

     //VCT service
    // if (req.url.indexOf('/api/vct/2') != -1 && req.method === 'GET') {
    //   console.log('>>intercepted /api/vct/.. request');
    //   let body = "";
    //   let status = 200;
    //   return Observable.of(new HttpResponse({ status, body }));
    // }

    if (req.url.indexOf('/api/vct') != -1 && req.method === 'GET') {
      console.log('>>intercepted /api/vct/.. request');
      let body = vcts;
      let status = 200;
      return Observable.of(new HttpResponse({ status, body }));
    }

    if (req.url.indexOf('api/vct/requestexportvct') != -1  && req.method === 'POST') {
      console.log('>>intercepted api/vct/requestexportvct/.. request');
      let body = "";
      let status = 200;
      return Observable.of(new HttpResponse({ status, body }));
    }


    //awb service
    //original endpoint
    if (req.url.indexOf('api/airwaybills/dev') != -1  && req.method === 'GET') {
      console.log('>>intercepted api/airwaybills/.. request');
      let body = awbs;
      let status = 200;
      return Observable.of(new HttpResponse({ status, body }));
    }
    //new endpoint
    if (req.url.indexOf('api/airwaybills/getdropoffairwaybills') != -1  && req.method === 'GET') {
      console.log('>>intercepted api/airwaybills/.. request');
      let body = awbs;
      let status = 200;
      return Observable.of(new HttpResponse({ status, body }));
    }

    //orgs service
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
    if (req.url.indexOf('api/orgsgraph/UpdateThisUserDefaultGroundHandler') != -1  && req.method === 'POST') {
      console.log('>>intercepted api/orgsgraph/UpdateThisUserDefaultGroundHandler/.. request');
      let body = "";
      let status = 200;
      return Observable.of(new HttpResponse({ status, body }));
    }

    return next.handle(req);
  }
}
