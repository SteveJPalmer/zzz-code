"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var reducer_1 = require("./reducer");
var devToolsExtension = (window.devToolsExtension)
    ? window.devToolsExtension() : function (f) { return f; };
exports.store = redux_1.createStore(reducer_1.reducer, redux_1.compose(devToolsExtension));
