import { Injectable} from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/index';

export const ADD_REQUEST = 'orders/ADD_REQUEST';
export const RESET_REQUEST = 'orders/RESET_REQUEST';


@Injectable()
export class RequestSearchActions {
  constructor(
    private ngRedux: NgRedux<IAppState>
  ) {}

  addRequest(request: any)  {
    this.ngRedux.dispatch({
      type: ADD_REQUEST,
      request,
    });
  }

  resetRequest()  {
    this.ngRedux.dispatch({
      type: RESET_REQUEST
    });
  }

}
