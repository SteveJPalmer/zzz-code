(function(angular) {
  'use strict';
angular.module('app', ['finance'])
  .controller('InvoiceController', ['currencyConverter', function InvoiceController(currencyConverter) {
    this.qty = 1;
    this.cost = 2;
    this.inCurr = 'EUR';
    this.currencies = currencyConverter.currencies;

    this.total = function total(outCurr) {
      return currencyConverter.convert(this.qty * this.cost, this.inCurr, outCurr);
    };
    this.pay = function pay() {
      window.alert('Thanks!');
    };
    //testing tip, write scope to window var (else can use angular.element() in console)
    // window.AA_SteveDebugScope = this;

    //or can just write out key props
    // console.log('scope obj:', this);         //use this or $scope depending on technique
    // console.log('scope obj:', this.inCurr);  //out specific prop
  }]);
})(window.angular);
