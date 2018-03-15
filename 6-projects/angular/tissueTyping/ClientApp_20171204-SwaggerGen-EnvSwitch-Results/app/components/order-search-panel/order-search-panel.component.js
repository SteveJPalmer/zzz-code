"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// import { OrderSearchService } from './order-search.service';
var api_1 = require("../../services/orders/api/api");
var order_search_actions_1 = require("./order-search.actions");
var OrderSearchPanelComponent = /** @class */ (function () {
    function OrderSearchPanelComponent(orderSearchService, orderSearchActions) {
        this.orderSearchService = orderSearchService;
        this.orderSearchActions = orderSearchActions;
        this.search = { orderNumber: '' };
        this.isData = false;
        this.order = {};
        this.searchResults = [];
        this.noOrderFound = false;
    }
    OrderSearchPanelComponent.prototype.findOrderByOrderNumber = function () {
        var _this = this;
        this.noOrderFound = false;
        // this.orderSearchService.getOrderByOrderNumber(this.search.orderNumber)
        this.orderSearchService.apiOrdersGet(this.search.orderNumber)
            .subscribe(function (next) {
            _this.isData = true;
            _this.searchResults = next;
            if (_this.searchResults.length == 0) {
                //ToDo: replace with a non-blocking notification
                _this.isData = false;
                _this.order = {};
                _this.noOrderFound = true;
                _this.lastSearch = _this.search.orderNumber;
            }
            else {
                //ToDo: next iteration will grab the selected index from search results array
                _this.order = _this.searchResults[0];
                // console.info('>>find method... success - model: searchResults: ' + JSON.stringify(this.searchResults,null, 2));
                // console.info('>>find method... success - model: order: ' + JSON.stringify(this.order,null, 2));
                _this.orderSearchActions.addOrder(_this.order);
            }
        }, function (err) {
            //ToDo: replace with a non-blocking notification
            _this.isData = false;
            _this.order = {};
            _this.noOrderFound = true;
        });
    };
    ;
    OrderSearchPanelComponent.prototype.resetOrderSearch = function () {
        this.isData = false;
        this.noOrderFound = false;
        this.order = {};
        this.search.orderNumber = '';
        this.searchResults = [];
        this.orderSearchActions.resetOrder();
    };
    ;
    OrderSearchPanelComponent = __decorate([
        core_1.Component({
            selector: 'order-search-panel',
            templateUrl: 'order-search-panel.component.html',
            styleUrls: ['order-search-panel.component.scss'],
            providers: [api_1.OrdersService,
                order_search_actions_1.OrderSearchActions
            ]
        })
    ], OrderSearchPanelComponent);
    return OrderSearchPanelComponent;
}());
exports.OrderSearchPanelComponent = OrderSearchPanelComponent;
