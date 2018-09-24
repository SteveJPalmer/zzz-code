"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./requestedTests.service"));
var requestedTests_service_1 = require("./requestedTests.service");
__export(require("./requests.service"));
var requests_service_1 = require("./requests.service");
exports.APIS = [requestedTests_service_1.RequestedTestsService, requests_service_1.RequestsService];
