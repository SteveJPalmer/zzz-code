/*
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';
import { Injectable} from '@angular/core';

export const ADD_ORDER = 'addOrder';

@Injectable()
export class OrderSearchActions {
  constructor(
    private ngRedux: NgRedux<IAppState>
  ) {}

  getOrderByOrderNumber(order: any)  {
    this.ngRedux.dispatch({
      type: ADD_ORDER,
      order,
    });
  }

}
*/