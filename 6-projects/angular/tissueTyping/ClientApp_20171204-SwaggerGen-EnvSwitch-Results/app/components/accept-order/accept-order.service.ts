/*********************************************************
 * Note: This is a temp service for development purposes *
 *********************************************************/
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import {jsonpFactory} from "@angular/http/src/http_module";

@Injectable()
export class AcceptOrderService {

  constructor(private http: Http) {}

  private headers = new Headers({ "Content-Type": "application/json", "Accept": "application/json" });

  acceptOrder(orderNumber: number): Observable<any> {
    let data = `{\"orderNumber\":"${orderNumber}",\"status\": 1}`;
    //console.log('>>accept-order-services - data: ' + data);

    return this.http
      .put('http://localhost:8261/api/orders', data, { headers: this.headers} )
      .map((res: Response) => {
        //console.log('>>orderService - res: ' + JSON.stringify(res,null, 2));
        //return res.json().data;              //mock in-memory-web-api
        return res.json();                      //live endpoint
      })
      .do(data => {
        //console.log('>>acceptOrder - data: ' + JSON.stringify(data,null, 2));
      })
      .catch(this.handleError);
      // .finally( () => console.log('>>finally called'));
  }

  private handleError(resp: Response) {
    // let msg = `Error status code: ${resp.status} at url: ${resp.url}`;
    return Observable.throw(resp);
  }

}




