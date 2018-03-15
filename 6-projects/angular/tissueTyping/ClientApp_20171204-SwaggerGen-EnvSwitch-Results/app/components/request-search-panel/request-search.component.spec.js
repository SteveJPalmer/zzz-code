"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/of");
var store_1 = require("@angular-redux/store");
var _ = require("lodash");
var request_search_panel_component_1 = require("./request-search-panel.component");
var api_1 = require("../../services/requests/api/api");
var request_search_actions_1 = require("./request-search.actions");
describe('RequestSearchComponent - test env', function () {
    it('true is true', function () { return expect(true).toBe(true); });
});
describe('RequestSearchComponent', function () {
    var fixture, comp, input, button;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [forms_1.FormsModule,
                router_1.RouterModule
            ],
            declarations: [request_search_panel_component_1.RequestSearchPanelComponent],
            schemas: [core_1.NO_ERRORS_SCHEMA],
            providers: [
                { provide: http_1.Http, useValue: {} },
                { provide: api_1.RequestsService,
                    useValue: { apiRequestsGet: Observable_1.Observable.of('base data') } },
                { provide: store_1.NgRedux, useValue: {} },
                { provide: request_search_actions_1.RequestSearchActions, useValue: {} },
                { provide: router_1.Router, useValue: {} }
            ]
        })
            .compileComponents().then(function () {
            fixture = testing_1.TestBed.createComponent(request_search_panel_component_1.RequestSearchPanelComponent);
        });
    }));
    it('should create component', function () {
        expect(fixture.componentInstance).toBeDefined();
    });
    it('should default input lab number to empty', testing_1.async(function () {
        fixture.detectChanges();
        fixture.whenStable().then(function () {
            input = fixture.debugElement.query(platform_browser_1.By.css('input'));
            var el = input.nativeElement;
            //--
            expect(el.value).toBe('');
        });
    }));
    it('should store entered lab number in model', testing_1.async(function () {
        fixture.detectChanges();
        fixture.whenStable().then(function () {
            input = fixture.debugElement.query(platform_browser_1.By.css('input'));
            var el = input.nativeElement;
            //--
            el.value = '123a4-aa1b';
            el.dispatchEvent(new Event('input'));
            expect(fixture.componentInstance.search.labNumber).toBe('123a4-aa1b');
        });
    }));
    it('should call resetRequestSearch on cancel event', testing_1.async(function () {
        spyOn(fixture.componentInstance, 'resetRequestSearch').and.callThrough();
        //
        fixture.detectChanges();
        fixture.whenStable().then(function () {
            button = fixture.debugElement.query(platform_browser_1.By.css('#resetRequest'));
            button.triggerEventHandler('click', null);
            expect(fixture.componentInstance.resetRequestSearch).toHaveBeenCalledTimes(1);
        });
    }));
    it('should clear lab number value on cancel event', testing_1.async(function () {
        fixture.detectChanges();
        fixture.whenStable().then(function () {
            input = fixture.debugElement.query(platform_browser_1.By.css('input'));
            var el = input.nativeElement;
            el.value = '123a4-aa1c';
            el.dispatchEvent(new Event('input'));
            expect(fixture.componentInstance.search.labNumber).toBe('123a4-aa1c');
            //
            fixture.detectChanges();
            fixture.whenStable().then(function () {
                button = fixture.debugElement.query(platform_browser_1.By.css('#resetRequest'));
                button.triggerEventHandler('click', null);
                expect(fixture.componentInstance.search.labNumber).toBe('');
                expect(fixture.componentInstance.request).toEqual({});
            });
        });
    }));
    it('should call findRequestByLabNumber method on search event', testing_1.async(function () {
        spyOn(fixture.componentInstance, 'findRequestByLabNumber').and.callThrough();
        //
        fixture.detectChanges();
        fixture.whenStable().then(function () {
            button = fixture.debugElement.query(platform_browser_1.By.css('#findRequest'));
            button.triggerEventHandler('click', null);
            expect(fixture.componentInstance.findRequestByLabNumber).toHaveBeenCalled();
        });
    }));
    it('should set request property, if request retrieved for search', testing_1.async(function () {
        spyOn(api_1.RequestsService.prototype, 'apiRequestsGet')
            .and.callFake(function () {
            return Observable_1.Observable.of({ "labNumber": "abc", "orderNumber": "123" });
        });
        //
        fixture.detectChanges();
        fixture.whenStable().then(function () {
            button = fixture.debugElement.query(platform_browser_1.By.css('#findRequest'));
            button.triggerEventHandler('click', null);
            expect(api_1.RequestsService.prototype.apiRequestsGet).toHaveBeenCalled();
            //
            fixture.detectChanges();
            fixture.whenStable().then(function () {
                expect(fixture.componentInstance.request).not.toEqual({});
                expect(_.get(fixture.componentInstance.request, 'labNumber')).toEqual("abc");
            });
        });
    }));
});
