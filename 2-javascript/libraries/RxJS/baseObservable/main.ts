/* npm start  - http://localhost:8080 */

// import {Observable} from "rxjs";                // full lib
// import {Observable, Observer} from "rxjs";      // TypeScript flavour

import { Observable } from "rxjs/Observable";      // individual classes & operators
// import { Observer } from "rxjs/Observer";       // TypeScript flavour
import "rxjs/add/observable/from";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";

//events
import "rxjs/add/observable/fromEvent";


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




/**********
 * events *
 **********/
let source2 = Observable.fromEvent(document, 'click');    // creates Observable from DOM event (async data delivery)

source2.subscribe(														      // defines our Observer (listens for data)
  value => console.log(value),		              // data arrives via next method (logs out event)
  e => console.log(`error: ${e}`),
  () => console.log("complete")
);


let source3 = Observable.fromEvent(document, 'click')    // creates Observable from DOM event (async data delivery)
                .map((evt: MouseEvent) => {              // TypeScript needs TypeDefined so can ref the event props
                  return {
                    x: evt.clientX,
                    y: evt.clientY
                  };
                });

source3.subscribe(														      // defines our Observer (listens for data)
  value => console.log(value),		               // data arrives via next method (logs out event)
  e => console.log(`error: ${e}`),
  () => console.log("complete")
);