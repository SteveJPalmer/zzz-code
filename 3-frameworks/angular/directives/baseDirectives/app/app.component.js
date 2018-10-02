"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AppComponent = (function () {
    function AppComponent() {
        ///model properties
        this.title = 'Basic Directives';
        this.myHero = 'Steve';
        this.myTrueProp = true;
        this.myFalseProp = false;
        /* ngIf & ngSwitch */
        this.toeChoice = '';
    }
    /* ngClass - adv example returns obj managing state of 3 CSS classes */
    AppComponent.prototype.setClasses = function () {
        var classes = {
            saveable: true,
            modified: false,
            special: true
        };
        return classes;
    };
    /* ngStyles - adv example returns obj managing styles */
    AppComponent.prototype.setStyles = function () {
        var styles = {
            // CSS property names
            'font-style': 'myTrueProp' ? 'italic' : 'normal',
            'font-weight': 'myFalseProp' ? 'bold' : 'normal',
            'font-size': 'myTrueProp' ? '24px' : '8px',
        };
        return styles;
    };
    AppComponent.prototype.toeChooser = function (picker) {
        var choices = picker.children;
        //iterate until find checked one
        for (var i = 0; i < choices.length; i++) {
            var choice = choices[i];
            if (choice.checked) {
                return this.toeChoice = choice.value;
            }
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/app.component.html'
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map