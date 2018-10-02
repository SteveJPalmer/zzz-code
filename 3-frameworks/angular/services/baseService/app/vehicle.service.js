"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var VehicleService = (function () {
    function VehicleService() {
        this.getVehicles = function () { return [
            { id: 1, name: 'X-Wing Fighter' },
            { id: 2, name: 'Tie Fighter' },
            { id: 3, name: 'Y-Wing Fighter' }
        ]; };
    }
    VehicleService = __decorate([
        core_1.Injectable()
    ], VehicleService);
    return VehicleService;
}());
exports.VehicleService = VehicleService;
/*
Copyright 2016 JohnPapa.net, LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://bit.ly/l1cense
*/ 
//# sourceMappingURL=vehicle.service.js.map