import { Injectable} from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/index';

export const ADD_ORDER = 'orders/ADD_ORDER';
export const RESET_ORDER = 'orders/RESET_ORDER';


@Injectable()
export class OrderSearchActions {
  constructor(
    private ngRedux: NgRedux<IAppState>
  ) {}

  addOrder(order: any)  {
    this.ngRedux.dispatch({
      type: ADD_ORDER,
      order,
    });
  }

  resetOrder()  {
    this.ngRedux.dispatch({
      type: RESET_ORDER
    });
  }

}
