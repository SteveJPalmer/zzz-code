"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var store_1 = require("@angular-redux/store");
var index_1 = require("./store/index");
var index_2 = require("./services/orders/index");
var app_component_1 = require("./components/app/app.component");
var cl_panel_component_1 = require("./components/cl-panel/cl-panel.component");
var order_search_panel_component_1 = require("./components/order-search-panel/order-search-panel.component");
var accept_order_component_1 = require("./components/accept-order/accept-order.component");
var request_search_panel_component_1 = require("./components/request-search-panel/request-search-panel.component");
var hla_results_entry_component_1 = require("./components/hla-results-entry/hla-results-entry.component");
var app_routing_module_1 = require("./components/app/app-routing.module");
var environment_1 = require("../environments/environment");
var core_2 = require("@angular/core");
if (environment_1.environment.production) {
    core_2.enableProdMode();
}
function apiConfig() {
    return new index_2.Configuration({
        basePath: environment_1.environment.basePath
    });
}
exports.apiConfig = apiConfig;
var AppModuleShared = /** @class */ (function () {
    function AppModuleShared(ngRedux) {
        ngRedux.provideStore(index_1.store);
    }
    AppModuleShared = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                cl_panel_component_1.ClPanelComponent,
                order_search_panel_component_1.OrderSearchPanelComponent,
                accept_order_component_1.AcceptOrderComponent,
                request_search_panel_component_1.RequestSearchPanelComponent,
                hla_results_entry_component_1.HlaResultsEntryComponent
            ],
            imports: [
                common_1.CommonModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                // InMemoryWebApiModule.forRoot(InMemoryOrderService),
                app_routing_module_1.AppRoutingModule,
                store_1.NgReduxModule,
                index_2.ApiModule.forConfig(apiConfig)
            ]
        })
    ], AppModuleShared);
    return AppModuleShared;
}());
exports.AppModuleShared = AppModuleShared;
