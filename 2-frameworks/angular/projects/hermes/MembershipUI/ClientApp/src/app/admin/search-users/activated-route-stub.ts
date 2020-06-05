import { convertToParamMap, ParamMap, Params } from '@angular/router';
import { ReplaySubject } from 'rxjs/ReplaySubject';

/**
 * An ActivateRoute test double with a `paramMap` observable
 * Use `setParamMap()` method to add the next `paramMap` value
 */
export class ActivatedRouteStub {
  // Use a ReplaySubject to share previous values with subscribers
  // and pump new values into the `paramMap` observable
  private subject = new ReplaySubject<ParamMap>();

  constructor(initialParams?: Params) {
    this.setParamMap(initialParams);
  }

  /** mock paramMap observable */
  readonly paramMap = this.subject.asObservable();
  /** set observables next value */
  setParamMap(params?: Params) {
    this.subject.next(convertToParamMap(params));
  }
}
