(function(angular) {
  'use strict';
angular.module('app', [])

  .controller('InvoiceController', ['$location', '$window', function InvoiceController($location, $window) {
    //state properties

    //ng partial page load
    this.partialPageRefresh = function() {
      $location.path('/test');
      console.log('test partial load happened...');
    };

    //do full page load
    this.fullPageRefresh = function() {
      $window.location.href = "http://localhost:63342/work_area/Angular1-Training/locationService-partial-full_pageloads/ng-test-skeleton.html";
    };
  }]);
})(window.angular);
