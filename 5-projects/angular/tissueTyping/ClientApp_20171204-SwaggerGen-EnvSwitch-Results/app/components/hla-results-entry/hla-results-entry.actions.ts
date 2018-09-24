import { Injectable} from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/index';

export const ADD_RESULTS = 'orders/ADD_RESULTS';


@Injectable()
export class HlaResultsEntryActions {
  constructor(
    private ngRedux: NgRedux<IAppState>
  ) {}

  addResults(results: any)  {
    this.ngRedux.dispatch({
      type: ADD_RESULTS,
      results,
    });
  }


}
