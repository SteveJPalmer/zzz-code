"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
exports.ADD_REQUEST = 'orders/ADD_REQUEST';
exports.RESET_REQUEST = 'orders/RESET_REQUEST';
var RequestSearchActions = /** @class */ (function () {
    function RequestSearchActions(ngRedux) {
        this.ngRedux = ngRedux;
    }
    RequestSearchActions.prototype.addRequest = function (request) {
        this.ngRedux.dispatch({
            type: exports.ADD_REQUEST,
            request: request,
        });
    };
    RequestSearchActions.prototype.resetRequest = function () {
        this.ngRedux.dispatch({
            type: exports.RESET_REQUEST
        });
    };
    RequestSearchActions = __decorate([
        core_1.Injectable()
    ], RequestSearchActions);
    return RequestSearchActions;
}());
exports.RequestSearchActions = RequestSearchActions;
