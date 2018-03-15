"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var lodash_1 = require("lodash");
var store_1 = require("@angular-redux/store");
var hla_results_entry_helper_service_1 = require("./hla-results-entry.helper.service");
var api_1 = require("../../services/results/api/api");
var api_2 = require("../../services/orders/api/api");
var HlaResultsEntryComponent = /** @class */ (function () {
    function HlaResultsEntryComponent(helperService, requestResultsService, requestOrderablesService, _router, ngRedux) {
        var _this = this;
        this.helperService = helperService;
        this.requestResultsService = requestResultsService;
        this.requestOrderablesService = requestOrderablesService;
        this._router = _router;
        this.ngRedux = ngRedux;
        this.PCRTest = true;
        this.DEFTest = false;
        this.CDCTest = false;
        this.request = [];
        this.tissueTypingResults = [];
        this.HLATypes = [];
        this.PCRResults = [];
        this.DEFResults = [];
        this.CDCResults = [];
        this.isSaved = false;
        this.isError = false;
        this.setTestFlags = function () {
            var testCodes = lodash_1.map(_this.request.requestedTests, 'testCode');
            // console.log('>>setObservableFlags > testCodes: ' + testCodes);
            if (lodash_1.indexOf(testCodes, 'DEF') != -1)
                _this.DEFTest = true;
            if (lodash_1.indexOf(testCodes, 'CDC') != -1)
                _this.CDCTest = true;
        };
        this.addCytotoxic = function () {
            var tests = [
                {
                    "testCode": "CDC"
                }
            ];
            _this.requestOrderablesService.apiOrdersByOrderNumberRequestsByLabNumberOrderablesPost(_this.request.orderNumber, _this.request.labNumber, tests)
                .subscribe(function (next) {
                _this.CDCResults = _this.helperService.resultsGrid('CDC', _this.tissueTypingResults, _this.HLATypes);
                _this.CDCTest = true;
                // console.log('>>addCytotoxic TestService returned: next' + JSON.stringify(next, null, 2));
            }, function (err) {
                _this.isError = true;
            });
        };
        this.saveResults = function () {
            var observations = [];
            observations.push({ "test": "PCR", "results": _this.PCRResults });
            if (_this.DEFTest)
                observations.push({ "test": "DEF", "results": _this.DEFResults });
            if (_this.CDCTest)
                observations.push({ "test": "CDC", "results": _this.CDCResults });
            // console.log('>>saveResults >observations[]: ' + JSON.stringify(observations,undefined, 2) );
            // let results: any = {
            //   "labNumber": this.request.labNumber,
            //   "observations": observations
            // };
            // console.log('>>saveResults > payload: ' + JSON.stringify(results,undefined, 2) );
            _this.requestResultsService.apiTissueTypingRequestsByLabNumberResultsPut(_this.request.labNumber, observations)
                .subscribe(function (next) {
                _this.isSaved = true;
                _this._router.navigate(['/requestSearch']);
            }, function (err) {
                _this.isError = true;
            });
        };
        //mock initial RESTFul service
        //getTissueTypingResultsMock: any = () => {
        // return [
        //   {
        //     "test": "PER",
        //     "results": [
        //       {
        //         "hlaType": "HLA-A",
        //         "value1": "A1",
        //         "value2": "A2"
        //       },
        //       {
        //         "hlaType": "HLA-B",
        //         "value1": "B1",
        //         "value2": "B2"
        //       }
        //     ]
        //   },
        //   {
        //     "test": "CDC",
        //     "results": [
        //       {
        //         "hlaType": "HLA-A",
        //         "value1": "C1",
        //         "value2": "C2"
        //       },
        //       {
        //         "hlaType": "HLA-B",
        //         "value1": "C11",
        //         "value2": "C12"
        //       }
        //     ]
        //   }
        // ]
        //};
        this.getTissueTypingResults = function () {
            _this.requestResultsService.apiTissueTypingRequestsByLabNumberResultsGet(_this.request.labNumber)
                .subscribe(function (next) {
                _this.tissueTypingResults = next;
                _this.PCRResults = _this.helperService.resultsGrid('PCR', _this.tissueTypingResults, _this.HLATypes);
                if (_this.DEFTest) {
                    _this.DEFResults = _this.helperService.resultsGrid('DEF', _this.tissueTypingResults, _this.HLATypes);
                }
                if (_this.CDCTest) {
                    _this.CDCResults = _this.helperService.resultsGrid('CDC', _this.tissueTypingResults, _this.HLATypes);
                }
            }, function (err) {
                _this.tissueTypingResults = [];
            });
        };
    }
    HlaResultsEntryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ngRedux.select('request')
            .subscribe(function (request) {
            _this.request = request;
            _this.setTestFlags();
        });
        this.HLATypes = this.helperService.getHLATypes();
        this.getTissueTypingResults();
    };
    __decorate([
        store_1.select(['request', 'orderNumber'])
    ], HlaResultsEntryComponent.prototype, "orderNumber$", void 0);
    __decorate([
        store_1.select(['request', 'labNumber'])
    ], HlaResultsEntryComponent.prototype, "labNumber$", void 0);
    HlaResultsEntryComponent = __decorate([
        core_1.Component({
            selector: 'hla-results-entry',
            templateUrl: 'hla-results-entry.component.html',
            styleUrls: ['hla-results-entry.component.scss'],
            providers: [hla_results_entry_helper_service_1.HlaResultsEntryHelperService,
                api_1.RequestResultsService,
                api_2.RequestOrderablesService
            ]
        })
    ], HlaResultsEntryComponent);
    return HlaResultsEntryComponent;
}());
exports.HlaResultsEntryComponent = HlaResultsEntryComponent;
