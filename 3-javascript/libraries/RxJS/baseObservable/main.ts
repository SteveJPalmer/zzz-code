/* npm start  - http://localhost:8080 */

// import {Observable} from "rxjs";                // full lib
// import {Observable, Observer} from "rxjs";      // TypeScript flavour

import { Observable } from "rxjs/Observable";      // individual classes & operators
// import { Observer } from "rxjs/Observer";       // TypeScript flavour
import "rxjs/add/observable/from";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";


/**************
 * Observable *
 **************/
let numbers = [1, 5, 10, 51];
let source = Observable.from(numbers)      	      // creates our Observable data source/stream
               .map(n => n * 2)                   // map transforms data
               .filter(n => n < 50);              // filter data


/**************
 * Observers  *
 **************/
// can have multiple Observers for an Observable
//A) basic Observer
source.subscribe(														      // defines our Observer (listens for data)
  value => console.log(`value: ${value}`),		// data arrives via next method
  e => console.log(`error: ${e}`),
  () => console.log("complete")
);


//B) formal Observer
class MyObserver {	                                // defines our Observer (waiting for data)
// class MyObserver implements Observer<number> {	  // TypeScript flavour

  next(value) {																	    // data arrives via next method
    console.log(`value: ${value}`)
  }

  error(e) {
    console.log(`error: ${e}`)
  }

  complete() {
    console.log("complete")
  }
}

source.subscribe(new MyObserver);
