(function(angular) {
  'use strict';
angular.module('customTriggerExample', [])
 .controller('ExampleController', ['$scope', function($scope) {
   //user model - obj
   $scope.user = {};
 }]);
})(window.angular);
