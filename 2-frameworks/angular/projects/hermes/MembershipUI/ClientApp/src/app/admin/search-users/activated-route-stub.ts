import { convertToParamMap, ParamMap, Params } from '@angular/router';
import { ReplaySubject } from 'rxjs/ReplaySubject';

export class ActivatedRouteStub {
  private subject = new ReplaySubject<ParamMap>();

  constructor(initialParams?: Params) {
    this.setParamMap(initialParams);
  }

  /** mock paramMap observable */
  readonly paramMap = this.subject.asObservable();
  /** observables next value */
  setParamMap(params?: Params) {
    this.subject.next(convertToParamMap(params));
  }
}
