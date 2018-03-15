"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var forms_1 = require("@angular/forms");
var testing_1 = require("@angular/router/testing");
var testing_2 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/observable/of");
var store_1 = require("@angular-redux/store");
var hla_results_entry_component_1 = require("./hla-results-entry.component");
var hla_results_entry_actions_1 = require("./hla-results-entry.actions");
describe('HLAResultsEntryComponent - test env', function () {
    it('true is true', function () { return expect(true).toBe(true); });
});
describe('HLAResultsEntryComponent', function () {
    var fixture, comp, input, button;
    beforeEach(testing_2.async(function () {
        testing_2.TestBed.configureTestingModule({
            imports: [forms_1.FormsModule,
                testing_1.RouterTestingModule.withRoutes([]),
            ],
            declarations: [hla_results_entry_component_1.HlaResultsEntryComponent],
            schemas: [core_1.NO_ERRORS_SCHEMA],
            providers: [
                { provide: http_1.Http, useValue: {} },
                { provide: store_1.NgRedux, useValue: {} },
                { provide: hla_results_entry_actions_1.HlaResultsEntryActions, useValue: {} },
            ]
        })
            .compileComponents().then(function () {
            fixture = testing_2.TestBed.createComponent(hla_results_entry_component_1.HlaResultsEntryComponent);
        });
    }));
    it('should create component', function () {
        expect(fixture.componentInstance).toBeDefined();
    });
});
