import { Component } from '@angular/core';
// import { OrderSearchService } from './order-search.service';
import { OrdersService as OrderSearchService } from '../../services/orders/api/api';
import { OrderSearchActions } from './order-search.actions';

import { OrderDto } from '../../services/orders/model/models';

@Component({
    selector: 'order-search-panel',
    templateUrl: 'order-search-panel.component.html',
    styleUrls: ['order-search-panel.component.scss'],
    providers: [ OrderSearchService,
                 OrderSearchActions
    ]
})
export class OrderSearchPanelComponent {

  constructor(
    private orderSearchService: OrderSearchService,
    private orderSearchActions: OrderSearchActions) {
  }

  search: any = { orderNumber: '' };
  isData: boolean = false;
  order: OrderDto = {};
  searchResults: OrderDto[] = [];
  noOrderFound: boolean = false;
  lastSearch: number;

  findOrderByOrderNumber(): void {
    this.noOrderFound = false;
    // this.orderSearchService.getOrderByOrderNumber(this.search.orderNumber)
    this.orderSearchService.apiOrdersGet(this.search.orderNumber)
      .subscribe(
        next => {
          this.isData = true;
          this.searchResults = next;

          if (this.searchResults.length == 0) {
            //ToDo: replace with a non-blocking notification
            this.isData = false;
            this.order = {};
            this.noOrderFound = true;
            this.lastSearch = this.search.orderNumber;
          }
          else {
            //ToDo: next iteration will grab the selected index from search results array
            this.order = this.searchResults[0];
            // console.info('>>find method... success - model: searchResults: ' + JSON.stringify(this.searchResults,null, 2));
            // console.info('>>find method... success - model: order: ' + JSON.stringify(this.order,null, 2));
            this.orderSearchActions.addOrder(this.order);

          }
        },
        err => {
          //ToDo: replace with a non-blocking notification
          this.isData = false;
          this.order = {};
          this.noOrderFound = true;
        }
      );
  };

  resetOrderSearch() {
    this.isData = false;
    this.noOrderFound = false;
    this.order = {};
    this.search.orderNumber = '';
    this.searchResults = [];
    this.orderSearchActions.resetOrder();
  };

}