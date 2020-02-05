import { Component, OnInit } from '@angular/core';

//interfaces
import { IOrder } from './IOrder';

//components
import { OrderSearchService } from './orderSearch.service';

//native Redux solution
// import { store, IAppState } from '../store/index';

//Angular ng2-redux solution (ng2 bindings)
// import { NgRedux, select } from '@angular-redux/store';

/*  HttpClient  */
// import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';   //Note: new v4.3 HttpClient
import { Observable } from 'rxjs/Observable';				// http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html




@Component({
  selector: 'order-search',
  templateUrl: './orderSearch.html',
  styleUrls: ['./orderSearch.css'],
  providers: [ OrderSearchService ]
})
export class OrderSearchComponent implements OnInit {

  search: any = {};

  // Inject HttpClient into your component or service.
  constructor(private orderSearchService: OrderSearchService,
              private http: HttpClient) { }

  title: string = 'page loads...';
  public orders: IOrder[];            //array of IOrders Interface
  public order: IOrder;               //array of IOrders Interface

  activity: boolean = false;

  isData: boolean = false;


  /* populate from local component */
  public ordersOriginal: IOrder[] = [
    {
      orderNo: 1001,
      patientId: 201,
      clinician: 'test clinician 1',
      source: 'test source 1',
      requestedDate: '2017-09-18' ,
      receivedDate: '2017-09-18'
    }
  ];



  findOrderByOrderNumber(orderNumber): void {
    this.activity = true;

    //dont need pass onum as have access to in within comp
    console.log('>>model: search.onum: ' + this.search.onum);
    console.log('>>param: orderNumber: ' + orderNumber);

    var that = this;

    //stub  - timeout to show effect of XHR call
    let timeoutId = setTimeout(() => {

      //call the service - & subscribe to observable
      that.orderSearchService.getOrderByOrderNumber(orderNumber) 																					//cf baseServices example, where we returned hardcoded array
        .subscribe(																					// subscribes/listens to the observable exposed by the service
          results => { // fn to handle success

            // Successful responses call the first callback.
            console.log('>>OrderService: Data' + results);

            let ordersFetchedDataTemp: IOrder =
              {
                orderNo: 9001,
                patientId: 9005,
                clinician: 'test clinician 99',
                source: 'test source 99',
                requestedDate: '2017-10-10' ,
                receivedDate: '2017-10-10'
              }
            ;

            console.log('>> findOrderByOrderNumber: ' + JSON.stringify(results, undefined, 2));
            //observable returned may just have JSON data obj, or may be the full response obj
            this.order = results['body'];
            this.isData = true;
            this.activity = false;
          },
          err => {
            // Errors will call this callback instead:
            console.log('>>orderSearch.component - handle error:')
            console.warn('>>orderSearch.component - ooops.. something went wrong!  status:  ' + err.status);
            console.warn('>>orderSearch.component - ooops.. Something went wrong!: err obj: ' + JSON.stringify(err));
            this.isData = false;
            this.activity = false;
          }
        );
        /* either: subscribe(successFn, failFn)
             or: subscribe(successFn).catch(error)  */ 		//cf vehicle.service.js below


    }, 3000);

  };



  /* http call nested within component  - need to split out into a service */
  findOrderByOrderNumber_CompLevel(orderNumber): void {
    this.activity = true;

    //dont need pass onum as have access to in within comp
    console.log('>>model: search.onum: ' + this.search.onum);

    console.log('>>param: orderNumber: ' + orderNumber);


    //stub  - timeout to show effect of XHR call
    let timeoutId = setTimeout(() => {

      // Make the HTTP request:
      this.http.get<IOrder>('http://localhost:31272/api/orders/1234')
        .subscribe(data => {
            // Read the result field from the JSON response.
            // this.result = data['results'];
            // return this.result;

            // Successful responses call the first callback.
            console.log('>>OrderService: Data' + data['results']);

            let ordersFetchedDataTemp: IOrder =
              {
                orderNo: 1234,
                patientId: 705,
                clinician: 'test clinician 5',
                source: 'test source 5',
                requestedDate: '2017-09-18' ,
                receivedDate: '2017-09-18'
              }
            ;

            console.log('>> findOrderByOrderNumber: ' + JSON.stringify(ordersFetchedDataTemp, undefined, 2));
            this.order = ordersFetchedDataTemp;
            this.isData = true;
            this.activity = false;

          },
          // Errors will call this callback instead:
          error => {                          // fn to handle fail
            // Errors will call this callback instead:
            console.log('Something went wrong!');
            console.log('error' + error);
          });


    }, 3000);

  };




  /* works for a base stub - BUT completely by passes the Ng2 httpClient service  - need better Mock*/
  findOrderByOrderNumber_Original() {
    this.activity = true;

    console.log('>>order number: ' + this.search.onum);

    //stub  - timeout to show effect of XHR call
    let timeoutId = setTimeout(() => {

      let result: IOrder[] = this.orderSearchService.findOrderByOrderNumber_Original()
      console.log('>> findOrderByOrderNumber_Original: ' + JSON.stringify(result, undefined, 2));
      this.orders = result;
      this.isData = true;
      this.activity = false;

    }, 3000);

  };


  resetOrderSearch() {
    this.activity = false;
    this.isData = false;
    this.orders = null;
    this.search.onum = '';
  };



  ngOnInit() {
    console.log('>> order-search - ngOnInit');
  };
}
