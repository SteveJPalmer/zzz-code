"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var forms_1 = require("@angular/forms");
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var order_search_panel_component_1 = require("./order-search-panel.component");
// import { OrderSearchService } from './order-search.service';
var api_1 = require("../../services/orders/api/api");
var order_search_actions_1 = require("./order-search.actions");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/of");
var store_1 = require("@angular-redux/store");
describe('orderSearchComponent - test env', function () {
    it('true is true', function () { return expect(true).toBe(true); });
});
describe('orderSearchComponent', function () {
    var fixture, comp, input, button;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [forms_1.FormsModule],
            declarations: [order_search_panel_component_1.OrderSearchPanelComponent],
            schemas: [core_1.NO_ERRORS_SCHEMA],
            providers: [
                { provide: http_1.Http, useValue: {} },
                // { provide: OrderSearchService,
                //   useValue: { getOrderByOrderNumber: Observable.of('base data') }},
                { provide: api_1.OrdersService,
                    useValue: { apiOrdersGet: Observable_1.Observable.of('base data') } },
                { provide: store_1.NgRedux, useValue: {} },
                { provide: order_search_actions_1.OrderSearchActions, useValue: {} },
            ]
        })
            .compileComponents().then(function () {
            fixture = testing_1.TestBed.createComponent(order_search_panel_component_1.OrderSearchPanelComponent);
        });
    }));
    it('should create component', function () {
        expect(fixture.componentInstance).toBeDefined();
    });
    it('should default input order number to empty', testing_1.async(function () {
        fixture.detectChanges();
        fixture.whenStable().then(function () {
            input = fixture.debugElement.query(platform_browser_1.By.css('input'));
            var el = input.nativeElement;
            //--
            expect(el.value).toBe('');
        });
    }));
    it('should store provided order number in component state', testing_1.async(function () {
        fixture.detectChanges();
        fixture.whenStable().then(function () {
            input = fixture.debugElement.query(platform_browser_1.By.css('input'));
            var el = input.nativeElement;
            //--
            el.value = '97531';
            el.dispatchEvent(new Event('input'));
            expect(fixture.componentInstance.search.orderNumber).toBe('97531');
        });
    }));
    it('should call resetOrderSearch method on cancel button event', testing_1.async(function () {
        spyOn(fixture.componentInstance, 'resetOrderSearch').and.callThrough();
        //
        fixture.detectChanges();
        fixture.whenStable().then(function () {
            button = fixture.debugElement.query(platform_browser_1.By.css('#resetOrder'));
            button.triggerEventHandler('click', null);
            expect(fixture.componentInstance.resetOrderSearch).toHaveBeenCalledTimes(1);
        });
    }));
    it('should clear order number value on cancel button event', testing_1.async(function () {
        fixture.detectChanges();
        fixture.whenStable().then(function () {
            input = fixture.debugElement.query(platform_browser_1.By.css('input'));
            var el = input.nativeElement;
            el.value = '12345';
            el.dispatchEvent(new Event('input'));
            expect(fixture.componentInstance.search.orderNumber).toBe('12345');
            //
            fixture.detectChanges();
            fixture.whenStable().then(function () {
                button = fixture.debugElement.query(platform_browser_1.By.css('#resetOrder'));
                // console.info('>>>>Test variables - comp.search.orderNumber: ' + fixture.componentInstance.search.orderNumber);
                button.triggerEventHandler('click', null);
                expect(fixture.componentInstance.search.orderNumber).toBe('');
            });
        });
    }));
    it('should hide order search panel & reset search result data on cancel button event', testing_1.async(function () {
        comp = fixture.componentInstance;
        comp.isData = true;
        comp.order = { "orderNumber": "777" };
        fixture.detectChanges();
        fixture.whenStable().then(function () {
            button = fixture.debugElement.query(platform_browser_1.By.css('#resetOrder'));
            // console.info('>>>>Test variables - comp.isData: ' + comp.isData);
            // console.info('>>>>Test variables - comp.order: ' + JSON.stringify(comp.order,null,2));
            button.triggerEventHandler('click', null);
            expect(comp.isData).toBeFalsy();
            expect(comp.order).toEqual({});
        });
    }));
    it('should call findOrderByOrderNumber method on search button event', testing_1.async(function () {
        spyOn(fixture.componentInstance, 'findOrderByOrderNumber').and.callThrough();
        //
        fixture.detectChanges();
        fixture.whenStable().then(function () {
            button = fixture.debugElement.query(platform_browser_1.By.css('#findOrder'));
            button.triggerEventHandler('click', null);
            expect(fixture.componentInstance.findOrderByOrderNumber).toHaveBeenCalled();
        });
    }));
    it('should set search result data, if order found for search', testing_1.async(function () {
        // spyOn(OrderSearchService.prototype, 'getOrderByOrderNumber')
        spyOn(api_1.OrdersService.prototype, 'apiOrdersGet')
            .and.callFake(function () {
            return Observable_1.Observable.of("  [{\n" +
                "    \"orderNumber\": \"501\",\n" +
                "    \"orderables\": [\n" +
                "    {\n" +
                "      \"testCode\": \"code1\"\n" +
                "    }\n" +
                "  ]\n" +
                "  }]\n");
        });
        //
        fixture.detectChanges();
        fixture.whenStable().then(function () {
            button = fixture.debugElement.query(platform_browser_1.By.css('#findOrder'));
            button.triggerEventHandler('click', null);
            // expect(OrderSearchService.prototype.getOrderByOrderNumber).toHaveBeenCalled();
            expect(api_1.OrdersService.prototype.apiOrdersGet).toHaveBeenCalled();
            //
            fixture.detectChanges();
            fixture.whenStable().then(function () {
                // console.info('>>test - order: ' + JSON.stringify(fixture.componentInstance.order, null,2));
                expect(fixture.componentInstance.order).not.toEqual({});
                expect(fixture.componentInstance.searchResults).toMatch(/"orderNumber": "501"/);
            });
        });
    }));
});
