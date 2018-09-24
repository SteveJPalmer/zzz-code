"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("../../services/requests/index");
var request_search_actions_1 = require("./request-search.actions");
var RequestSearchPanelComponent = /** @class */ (function () {
    function RequestSearchPanelComponent(_router, requestsService, requestSearchActions) {
        this._router = _router;
        this.requestsService = requestsService;
        this.requestSearchActions = requestSearchActions;
        this.search = { labNumber: '' };
        this.noRequestFound = false;
        this.request = {};
    }
    RequestSearchPanelComponent.prototype.findRequestByLabNumber = function () {
        var _this = this;
        this.noRequestFound = false;
        this.requestsService.apiRequestsGet(this.search.labNumber)
            .subscribe(function (next) {
            _this.request = next;
            if (!_this.request || typeof _this.request.labNumber == 'undefined') {
                console.info('>>findRequestByLabNumber... request: Is empty - no match ');
                _this.request = {};
                _this.noRequestFound = true;
                _this.lastSearch = _this.search.labNumber;
            }
            else {
                // console.info('>>findRequestByLabNumber... request: ' + JSON.stringify(this.request,null, 2));
                _this.requestSearchActions.addRequest(_this.request);
                //ToDo: redirect to tt > data entry view
                _this._router.navigate(['/hlaResultsEntry']);
            }
        }, function (err) {
            //ToDo: replace with a non-blocking notification
            _this.request = {};
            _this.noRequestFound = true;
        });
    };
    ;
    RequestSearchPanelComponent.prototype.resetRequestSearch = function () {
        this.noRequestFound = false;
        this.search.labNumber = '';
        this.request = {};
        this.requestSearchActions.resetRequest();
    };
    ;
    RequestSearchPanelComponent = __decorate([
        core_1.Component({
            selector: 'request-search-panel',
            templateUrl: 'request-search-panel.component.html',
            styleUrls: ['request-search-panel.component.scss'],
            providers: [index_1.RequestsService,
                request_search_actions_1.RequestSearchActions
            ]
        })
    ], RequestSearchPanelComponent);
    return RequestSearchPanelComponent;
}());
exports.RequestSearchPanelComponent = RequestSearchPanelComponent;
