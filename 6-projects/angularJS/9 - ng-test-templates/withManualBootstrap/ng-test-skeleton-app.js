(function(angular) {
  'use strict';
  angular.module('myApp', [])
    .controller('MyController', ['$scope', function ($scope) {
      $scope.greetMe = 'Steve';
    }]);

  //manual bootstrap - basically just removed ng-app directive from index.html, so initialises here

  angular.element(document).ready(function() {
    angular.bootstrap(document, ['myApp']);      //provide app module name as 2nd param
  });

})(window.angular);
