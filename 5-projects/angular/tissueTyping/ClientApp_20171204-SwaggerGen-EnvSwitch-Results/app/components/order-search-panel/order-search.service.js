"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*********************************************************
 * Note: This is a temp service for development purposes *
 *********************************************************/
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/finally");
var OrderSearchService = /** @class */ (function () {
    function OrderSearchService(http) {
        this.http = http;
    }
    OrderSearchService.prototype.getOrderByOrderNumber = function (orderNumber) {
        return this.http
            .get("http://localhost:8261/api/orders?orderNumber=" + orderNumber)
            .map(function (res) {
            //console.log('>>orderService - res: ' + JSON.stringify(res,null, 2));
            //return res.json().data;              //mock in-memory-web-api
            return res.json(); //live endpoint
        })
            .do(function (data) {
            // console.log('>>orderService - data: ' + JSON.stringify(data,null, 2));
        })
            .catch(this.handleError);
        // .finally( () => console.log('>>finally called'));
    };
    OrderSearchService.prototype.handleError = function (resp) {
        // let msg = `Error status code: ${resp.status} at url: ${resp.url}`;
        return Observable_1.Observable.throw(resp);
    };
    OrderSearchService = __decorate([
        core_1.Injectable()
    ], OrderSearchService);
    return OrderSearchService;
}());
exports.OrderSearchService = OrderSearchService;
