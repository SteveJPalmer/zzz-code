"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//temp mock for heroes data service
var mock_heroes_1 = require("./mock-heroes");
//logging service
var logger_service_1 = require("../logger/logger.service");
var HeroService = /** @class */ (function () {
    /* don't forget to register Logger service (either module or component)
       as used across app, best register logger in module  */
    //constructor shorthand, auto-creates class prop
    function HeroService(logger) {
        this.logger = logger;
    } //inject instance of Logger to to provide logging
    HeroService.prototype.getHeroes = function () {
        this.logger.log('Fetching heroes data..');
        this.logger.log('Fetching heroes data again..');
        return mock_heroes_1.HEROES;
    };
    HeroService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [logger_service_1.Logger])
    ], HeroService);
    return HeroService;
}());
exports.HeroService = HeroService;
//# sourceMappingURL=hero.service.js.map