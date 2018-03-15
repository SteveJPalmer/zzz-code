"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./orderables.service"));
var orderables_service_1 = require("./orderables.service");
__export(require("./orders.service"));
var orders_service_1 = require("./orders.service");
__export(require("./requestOrderables.service"));
var requestOrderables_service_1 = require("./requestOrderables.service");
exports.APIS = [orderables_service_1.OrderablesService, orders_service_1.OrdersService, requestOrderables_service_1.RequestOrderablesService];
