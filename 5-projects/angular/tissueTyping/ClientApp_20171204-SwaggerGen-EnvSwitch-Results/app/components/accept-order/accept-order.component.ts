import {Component, OnInit} from '@angular/core';

import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/observable';
import { IAppState } from '../../store/IAppState';
import { OrderableDto, UpdateOrderDto } from '../../services/orders/model/models';

// import { AcceptOrderService } from './accept-order.service';
import { OrdersService as AcceptOrderService } from '../../services/orders/api/api';

@Component({
  selector: 'accept-order',
  templateUrl: 'accept-order.component.html',
  styleUrls: ['accept-order.component.scss'],
  providers: [ AcceptOrderService ]
})


export class AcceptOrderComponent implements OnInit {

  orderNumber: string;
  labNumber: string;
  subscription: any;
  isAccepted: boolean = false;
  isError: boolean = false;

  order: any = {};

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private acceptOrderService: AcceptOrderService ) {
      this.subscription = ngRedux.select<string>(['order','orderNumber'])
        .subscribe(orderNumber => this.orderNumber = orderNumber);
  }

  @select(['order','orderNumber']) readonly orderNumber$: Observable<string>;
  @select(['order','orderables']) readonly orderables$: Observable<OrderableDto[]>;

  acceptOrder() {
    console.log('>>acceptOrderComp - orderNumber: ' + this.orderNumber);
    this.isAccepted = false;
    this.isError = false;
    
    // let order: UpdateOrderDto = {"orderNumber" : this.orderNumber,
    //                               "status" : UpdateOrderDto.StatusEnum.Accepted};
    let order: UpdateOrderDto = {"status" : UpdateOrderDto.StatusEnum.Accepted};
    //console.log('>>accept-order-services - order: ' + order);

    // this.acceptOrderService.acceptOrder(this.orderNumber)
    this.acceptOrderService.apiOrdersByOrderNumberPut(this.orderNumber, order)
      .subscribe(
        (next:any) => {
          this.isAccepted = true;
          this.isError = false;
          // console.log('>>accept - order: ' + JSON.stringify(next));
          this.labNumber = next.labNumber;
        },
        err => {
          this.isAccepted = false;
          this.isError = true;
        }
      );
  };

  ngOnInit() {
    // console.log('>>accept order - ngOnInit');
    this.ngRedux.select<string>('order')
      .subscribe(orderObj => this.order = orderObj);
  }
}