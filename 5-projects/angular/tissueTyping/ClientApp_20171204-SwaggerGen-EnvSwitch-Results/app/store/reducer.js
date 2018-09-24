"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var order_search_actions_1 = require("../components/order-search-panel/order-search.actions");
var request_search_actions_1 = require("../components/request-search-panel/request-search.actions");
var order = {};
var request = {};
var initialState = {
    order: order, request: request
};
function storeOrder(state, action) {
    return __assign({}, state, { order: action.order });
}
;
function clearOrder(state) {
    return __assign({}, state, { order: {} });
}
;
function storeRequest(state, action) {
    return Object.assign({}, state, {
        request: action.request
    });
}
;
function clearRequest(state) {
    return __assign({}, state, { request: {} });
}
;
//use default parameter to initialise initial state
function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case order_search_actions_1.ADD_ORDER:
            return storeOrder(state, action);
        case order_search_actions_1.RESET_ORDER:
            return clearOrder(state);
        case request_search_actions_1.ADD_REQUEST:
            return storeRequest(state, action);
        case request_search_actions_1.RESET_REQUEST:
            return clearRequest(state);
        default:
            return state;
    }
}
exports.reducer = reducer;
;
