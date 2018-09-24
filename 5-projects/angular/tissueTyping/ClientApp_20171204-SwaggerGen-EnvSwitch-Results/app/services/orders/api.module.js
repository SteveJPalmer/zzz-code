"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var http_1 = require("@angular/http");
var configuration_1 = require("./configuration");
var orderables_service_1 = require("./api/orderables.service");
var orders_service_1 = require("./api/orders.service");
var requestOrderables_service_1 = require("./api/requestOrderables.service");
var ApiModule = /** @class */ (function () {
    function ApiModule() {
    }
    ApiModule_1 = ApiModule;
    ApiModule.forConfig = function (configurationFactory) {
        return {
            ngModule: ApiModule_1,
            providers: [{ provide: configuration_1.Configuration, useFactory: configurationFactory }]
        };
    };
    ApiModule = ApiModule_1 = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, http_1.HttpModule],
            declarations: [],
            exports: [],
            providers: [orderables_service_1.OrderablesService, orders_service_1.OrdersService, requestOrderables_service_1.RequestOrderablesService]
        })
    ], ApiModule);
    return ApiModule;
    var ApiModule_1;
}());
exports.ApiModule = ApiModule;
