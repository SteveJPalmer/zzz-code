"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var _ = require("lodash");
var HlaResultsEntryHelperService = /** @class */ (function () {
    function HlaResultsEntryHelperService() {
        var _this = this;
        this.getHLATypes = function () {
            var types = [];
            types.push('HLA-A', 'HLA-B', 'HLA-Bw', 'HLA-Cw', 'HLA-DR', 'HLA-DR51,52,53', 'HLA-DQ', 'HLA-DPB1');
            // types.push('HLA-Bw', 'HLA-B', 'HLA-A');   //manual test data
            return types;
        };
        //mapGridResults
        this.resultsGrid = function (test, results, types) {
            return _this.mapToHlaType(_this.extractResult(results, test), types);
        };
        this.extractResult = function (data, test) {
            var elem = _.find(data, ['test', test]);
            if (typeof elem == 'undefined') {
                return [];
            }
            else {
                return elem.results;
            }
        };
        this.mapToHlaType = function (data, types) {
            var orderedData = [];
            var nextElem;
            for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
                var type = types_1[_i];
                nextElem = _.find(data, { 'hlaType': type });
                if (!nextElem) {
                    nextElem = { "hlaType": type, "value1": "", "value2": "" };
                }
                ;
                orderedData.push(nextElem);
            }
            return orderedData;
        };
    }
    HlaResultsEntryHelperService = __decorate([
        core_1.Injectable()
    ], HlaResultsEntryHelperService);
    return HlaResultsEntryHelperService;
}());
exports.HlaResultsEntryHelperService = HlaResultsEntryHelperService;
