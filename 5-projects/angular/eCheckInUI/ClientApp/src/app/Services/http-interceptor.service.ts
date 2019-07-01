import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/retry';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor( private spinner: NgxSpinnerService ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .catch((err: HttpErrorResponse) => {
        this.spinner.hide();
        var errCode: number,
            errMsg: string;
        if (err.error instanceof Error) {
          // capture error log - js client-side error
          errMsg = err.error.message;
          console.error('Client error occurred:', errMsg);
        } else {
          // capture error log - XHR error (status !200)
          errCode = err.status;
          errMsg = err.message;
          let errTarget = err.url ? err.url : err.error.target.__zone_symbol__xhrURL;
          console.error(`Data Request error occurred - ${errCode} - ${errMsg} - for request: ${errTarget}`);
        }
        // show non-blocking notification
        var errorTitle = 'An error has occurred';
        var errorMsg = `<section class="error-req">
                            <span class="error-req-code">Error code:<span class="ml-1">${errCode}</span></span>
                            <span class="error-req-msg">Please contact the support desk</span>  
                            <span class="error-req-footer">(Click to clear this message)</span>
                          </section>`;
        var errorOptions = {"timeOut": 0, "extendedTimeOut": 0};
        toastr.error( errorMsg, errorTitle, errorOptions)
          .css("width","320px");
        // return Observable so app continues post notification
        return Observable.of(new HttpResponse({body: { name: "ErrorInterceptor", error:true } } ));
      });
  }
}
