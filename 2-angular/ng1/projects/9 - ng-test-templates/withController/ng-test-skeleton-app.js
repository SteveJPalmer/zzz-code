(function(angular) {
  'use strict';
angular.module('app', [])
  .controller('InvoiceController', function InvoiceController() {
    //state properties
    this.qty = 1;       //set initial state of model props
    this.cost = 2;
    this.inCurr = 'EUR';
    this.currencies = ['USD', 'EUR', 'CNY'];
    this.usdToForeignRates = {
      USD: 1,
      EUR: 0.74,
      CNY: 6.09
    };
    //behaviour properties  - methods add model behavior props
    this.total = function total(outCurr) {
      return this.convertCurrency(this.qty * this.cost, this.inCurr, outCurr);
    };
    this.convertCurrency = function convertCurrency(amount, inCurr, outCurr) {
      return amount * this.usdToForeignRates[outCurr] / this.usdToForeignRates[inCurr];
    };
    this.pay = function pay() {
      window.alert('Thanks!');
    };
    //testing tip, write scope to window var (else can use angular.element() in console)
    // window.AA_SteveDebugScope = this;

    //or can just write out key props
    // console.log('scope obj:', this);         //use this or $scope depending on technique
    // console.log('scope obj:', this.inCurr);  //out specific prop
  });
})(window.angular);
