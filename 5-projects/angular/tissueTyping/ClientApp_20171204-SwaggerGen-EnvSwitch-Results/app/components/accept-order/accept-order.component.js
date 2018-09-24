"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var store_1 = require("@angular-redux/store");
var models_1 = require("../../services/orders/model/models");
// import { AcceptOrderService } from './accept-order.service';
var api_1 = require("../../services/orders/api/api");
var AcceptOrderComponent = /** @class */ (function () {
    function AcceptOrderComponent(ngRedux, acceptOrderService) {
        var _this = this;
        this.ngRedux = ngRedux;
        this.acceptOrderService = acceptOrderService;
        this.isAccepted = false;
        this.isError = false;
        this.order = {};
        this.subscription = ngRedux.select(['order', 'orderNumber'])
            .subscribe(function (orderNumber) { return _this.orderNumber = orderNumber; });
    }
    AcceptOrderComponent.prototype.acceptOrder = function () {
        var _this = this;
        console.log('>>acceptOrderComp - orderNumber: ' + this.orderNumber);
        this.isAccepted = false;
        this.isError = false;
        // let order: UpdateOrderDto = {"orderNumber" : this.orderNumber,
        //                               "status" : UpdateOrderDto.StatusEnum.Accepted};
        var order = { "status": models_1.UpdateOrderDto.StatusEnum.Accepted };
        //console.log('>>accept-order-services - order: ' + order);
        // this.acceptOrderService.acceptOrder(this.orderNumber)
        this.acceptOrderService.apiOrdersByOrderNumberPut(this.orderNumber, order)
            .subscribe(function (next) {
            _this.isAccepted = true;
            _this.isError = false;
            // console.log('>>accept - order: ' + JSON.stringify(next));
            _this.labNumber = next.labNumber;
        }, function (err) {
            _this.isAccepted = false;
            _this.isError = true;
        });
    };
    ;
    AcceptOrderComponent.prototype.ngOnInit = function () {
        var _this = this;
        // console.log('>>accept order - ngOnInit');
        this.ngRedux.select('order')
            .subscribe(function (orderObj) { return _this.order = orderObj; });
    };
    __decorate([
        store_1.select(['order', 'orderNumber'])
    ], AcceptOrderComponent.prototype, "orderNumber$", void 0);
    __decorate([
        store_1.select(['order', 'orderables'])
    ], AcceptOrderComponent.prototype, "orderables$", void 0);
    AcceptOrderComponent = __decorate([
        core_1.Component({
            selector: 'accept-order',
            templateUrl: 'accept-order.component.html',
            styleUrls: ['accept-order.component.scss'],
            providers: [api_1.OrdersService]
        })
    ], AcceptOrderComponent);
    return AcceptOrderComponent;
}());
exports.AcceptOrderComponent = AcceptOrderComponent;
