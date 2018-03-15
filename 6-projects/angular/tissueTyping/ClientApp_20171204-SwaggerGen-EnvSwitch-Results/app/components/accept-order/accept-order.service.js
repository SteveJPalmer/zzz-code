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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/finally");
var AcceptOrderService = /** @class */ (function () {
    function AcceptOrderService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ "Content-Type": "application/json", "Accept": "application/json" });
    }
    AcceptOrderService.prototype.acceptOrder = function (orderNumber) {
        var data = "{\"orderNumber\":\"" + orderNumber + "\",\"status\": 1}";
        //console.log('>>accept-order-services - data: ' + data);
        return this.http
            .put('http://localhost:8261/api/orders', data, { headers: this.headers })
            .map(function (res) {
            //console.log('>>orderService - res: ' + JSON.stringify(res,null, 2));
            //return res.json().data;              //mock in-memory-web-api
            return res.json(); //live endpoint
        })
            .do(function (data) {
            //console.log('>>acceptOrder - data: ' + JSON.stringify(data,null, 2));
        })
            .catch(this.handleError);
        // .finally( () => console.log('>>finally called'));
    };
    AcceptOrderService.prototype.handleError = function (resp) {
        // let msg = `Error status code: ${resp.status} at url: ${resp.url}`;
        return Observable_1.Observable.throw(resp);
    };
    AcceptOrderService = __decorate([
        core_1.Injectable()
    ], AcceptOrderService);
    return AcceptOrderService;
}());
exports.AcceptOrderService = AcceptOrderService;
