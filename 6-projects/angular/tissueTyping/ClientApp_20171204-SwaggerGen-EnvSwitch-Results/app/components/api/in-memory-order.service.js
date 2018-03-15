"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InMemoryOrderService = /** @class */ (function () {
    function InMemoryOrderService() {
    }
    /**
    * Creates fresh copy of data each time.
    * Safe for consuming service to morph arrays and objects.
    */
    InMemoryOrderService.prototype.createDb = function () {
        var orders = [
            {
                "orderNumber": "501",
                "orderables": [
                    {
                        "testCode": "code1"
                    }
                ]
            },
            {
                "orderNumber": "502",
                "orderables": [
                    {
                        "testCode": "code2"
                    }
                ]
            }
        ];
        var acceptOrder = [
            {
                "id": "501",
                "accepted": "true"
            }
        ];
        var Requests = [
            {
                "labNumber": "abc",
                "orderNumber": "123",
                "requestedTests": [
                    {
                        "testCode": "PCR"
                    },
                    {
                        "testCode": "DEF"
                    }
                ]
            },
            {
                "labNumber": "xzy",
                "orderNumber": "999",
                "requestedTests": [
                    {
                        "testCode": "PCR"
                    },
                    {
                        "testCode": "DEF"
                    }
                ]
            }
        ];
        var db = { orders: orders, acceptOrder: acceptOrder, Requests: Requests };
        return db;
    };
    return InMemoryOrderService;
}());
exports.InMemoryOrderService = InMemoryOrderService;
