import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpParams, HttpParameterCodec } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EncodeHttpParamsInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (  (req.url.indexOf('/api/airwaybills/getdropoffairwaybills') !== -1 ||
           req.url.indexOf('/api/airwaybills/getpickupairwaybills') !== -1 ||
           req.url.indexOf('/api/vct/getimportvctrequests') !== -1 ||
           req.url.indexOf('/api/vct/getexportvctrequests') !== -1 )
        && req.method === 'GET') {
      var params = new HttpParams({ encoder: new CustomEncoder(),
                                            fromString: req.params.toString()
      });
      return next.handle(req.clone({params}));
    }
    else {
      return next.handle(req);
    }
  }

}

class CustomEncoder implements HttpParameterCodec {
  encodeKey(key: string): string {
    //console.info('>>CustomEncoder: encodeKey:' + key);
    return encodeURIComponent(key);
  }

  encodeValue(value: string): string {
    value = encodeURIComponent(value);
    //console.info('>>CustomEncoder: encodeValue:' + value);
    return value;
  }

  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }

  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}
