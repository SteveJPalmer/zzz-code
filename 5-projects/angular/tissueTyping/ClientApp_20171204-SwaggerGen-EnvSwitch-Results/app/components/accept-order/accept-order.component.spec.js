"use strict";
/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/of");
var testing_2 = require("@angular-redux/store/testing");
var accept_order_component_1 = require("./accept-order.component");
// import { AcceptOrderService } from './accept-order.service';
var api_1 = require("../../services/orders/api/api");
describe('AcceptOrderComponent', function () {
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                testing_2.NgReduxTestingModule,
            ],
            declarations: [
                accept_order_component_1.AcceptOrderComponent
            ],
            schemas: [core_1.NO_ERRORS_SCHEMA],
            providers: [
                { provide: http_1.Http, useValue: {} },
                { provide: api_1.OrdersService,
                    useValue: { apiOrdersPut: Observable_1.Observable.of('base data') } },
            ]
        })
            .compileComponents();
        testing_2.MockNgRedux.reset();
    });
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(accept_order_component_1.AcceptOrderComponent);
        fixture.detectChanges();
    });
    it('should create component', function () {
        expect(fixture.componentInstance).toBeDefined();
    });
    // xit('...trying out select decorator stub', () => {
    // const stub = MockNgRedux.getSelectorStub(selector);
    // stub.next(values);
    // stub.complete();
    // });
});
