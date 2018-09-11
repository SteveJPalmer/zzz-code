import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';   //Note: new v4.3 HttpClient
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';				// http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html

// import { store } from '../store/store';
import { IOrder } from './IOrder';



@Injectable()
export class OrderSearchService {

  result: IOrder;

  // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {}

  getOrderByOrderNumber(orderNumber): Observable<IOrder> {


    /* - use map() so cb fn executes on each returned item  */
    /* Remember: HttpClient response is now JSON by default */
    return this.http																	        //http returns an observable (JSON by default)
      .get<IOrder>('http://localhost:31272/api/ordersnew/111', {observe: 'response'})      //specify just JSON data or full response
      // .get<IOrder>('http://www.google.com/mapt', {observe: 'response'})                 //force a 404
      // .map((res: Response) => <Vehicle[]>res.json().data) 	                             //shape response to our needs -RxJS map()
      .do(data => {
        console.log('>>Temp code to examine data');
        console.log(data);
       })														                      //Response obj, not just data, contains useful methods like json()
      .catch(this.handleError)										        //catch any exceptions – takes cb fn with error arg -RxJS catch()
      .finally( () => console.log('>>finally method'));
  }


   //always, always, have error handler on http calls
  private handleError(resp: Response) {
    console.warn('>>orderSearch.service' + JSON.stringify(resp.headers,null, 2));
    console.warn('>>orderSearch.service' + JSON.stringify(resp,null, 2));
    let msg = `Error status code: ${resp.status} at url: ${resp.url}`;
    console.warn('>>orderSearch.service' + msg)
    return Observable.throw(resp);									//ensures something is sent back to calling fn
    // return Observable.throw(msg);
  }																											// import {observable}  &  import 'rxjs/add/observable/throw'




  findOrderByOrderNumber_Original() {
    let ordersFetchedData: IOrder[] = [
      {
        orderNo: 1001,
        patientId: 701,
        clinician: 'test clinician 1',
        source: 'test source 1',
        requestedDate: '2017-09-18' ,
        receivedDate: '2017-09-18'
      }
    ];

    return ordersFetchedData;

    /*
    store.dispatch({
      type: 'GET_COURSES_SUCCESS',
      coursesFetchedData
    });
    */
  };

}




