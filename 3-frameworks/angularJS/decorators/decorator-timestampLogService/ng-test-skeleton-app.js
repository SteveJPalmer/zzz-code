(function(angular) {
  'use strict';
angular.module('app', [])
  .controller('InvoiceController', ['$log', function InvoiceController($log) {
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

    $log.info('test info message shows always');
    $log.debug('test debug message shows conditionally');

  }])

  .config(['$logProvider', function($logProvider) {
      //enable|disable debug logs
      $logProvider.debugEnabled(true);   //true | false
  }])

  .decorator( '$log', [ "$delegate", function($delegate) {
    // Save the original $log.debug()
    var debugFn = $delegate.debug;

    $delegate.debug = function() {
      var args    = [].slice.call(arguments),
        now     = new Date(),
        logtime = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + '.' + now.getMilliseconds()
      // Prepend timestamp
      args[0] = logtime + ' - ' + args[0];

      //call original with  output prepended with formatted timestamp
      debugFn.apply(null, args)
    };

    var infoFn = $delegate.info;

    $delegate.info = function() {
      var args    = [].slice.call(arguments),
        now     = new Date(),
        logtime = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + '.' + now.getMilliseconds()
      // Prepend timestamp
      args[0] = logtime + ' - ' + args[0];

      //call original with  output prepended with formatted timestamp
      infoFn.apply(null, args)
    };

    return $delegate;
  }]);


})(window.angular);
