/*********************************************************
 * Note: This is a temp service for development purposes *
 *********************************************************/
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import { OrderDto } from '../../services/orders/model/models';
import { IOrder } from './IOrder';

@Injectable()
export class OrderSearchService {

  constructor(private http: Http) {}

  getOrderByOrderNumber(orderNumber: number): Observable<any> {
    return this.http
      // .get(`http://localhost:8253/api/orders/${orderNumber}`)
      .get(`http://localhost:8261/api/orders?orderNumber=${orderNumber}`)
      // .get('http://localhost:8261/api/orders?orderNumber=999')
      .map((res: Response) => {
        //console.log('>>orderService - res: ' + JSON.stringify(res,null, 2));
        //return res.json().data;              //mock in-memory-web-api
        return res.json();                      //live endpoint
      })
      .do(data => {
        // console.log('>>orderService - data: ' + JSON.stringify(data,null, 2));
      })
      .catch(this.handleError);
      // .finally( () => console.log('>>finally called'));
  }

  private handleError(resp: Response) {
    // let msg = `Error status code: ${resp.status} at url: ${resp.url}`;
    return Observable.throw(resp);
  }

}




