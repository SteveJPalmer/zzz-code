"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var cl_panel_component_1 = require("./cl-panel.component");
describe('ClPanelComponent', function () {
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({ declarations: [cl_panel_component_1.ClPanelComponent] })
            .compileComponents();
    });
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(cl_panel_component_1.ClPanelComponent);
        fixture.detectChanges();
    });
    it('should display empty title', function () {
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('#title').textContent).toEqual('');
    });
    it('should update to new title', function () {
        var title = 'New Title';
        fixture.componentInstance.title = title;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('#title').textContent).toEqual(title);
    });
});
var TestHostComponent = /** @class */ (function () {
    function TestHostComponent() {
    }
    TestHostComponent = __decorate([
        core_1.Component({
            template: "    \n    <cl-panel title=\"Test\">                          \n      <div id=\"test-body\" panel-body>Test</div>\n    </cl-panel>"
        })
    ], TestHostComponent);
    return TestHostComponent;
}());
describe('ClPanelComponent - hosted', function () {
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({ declarations: [TestHostComponent, cl_panel_component_1.ClPanelComponent] })
            .compileComponents();
    });
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });
    it('should display title', function () {
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('#title').textContent).toEqual('Test');
    });
    it('should add panel body content projection', function () {
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('#test-body').textContent).toMatch(/Test/i);
    });
});
