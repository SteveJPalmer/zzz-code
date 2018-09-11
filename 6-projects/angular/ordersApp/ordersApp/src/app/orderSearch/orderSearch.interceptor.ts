
import {Injectable} from '@angular/core';

import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent,  HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.info('>>Requestorder interceptor: Search.Interceptor: Request' + JSON.stringify(req,null,2) );

    // simple interceptor - just forwards request through without altering
    //return next.handle(req)

    //implement timing
    const started = Date.now();

    return next.handle(req)
      .do(event => {
        if (event instanceof HttpResponse) {
          const elapsed = Date.now() - started;
          console.info(`>>Response interceptor:  Capture Timing:  >> Request for ${req.urlWithParams} took ${elapsed} ms.`);
        }
      });

  }
}

