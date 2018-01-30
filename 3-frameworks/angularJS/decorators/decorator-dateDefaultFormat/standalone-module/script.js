(function(angular) {
  'use strict';
angular.module('filterDecorator', ['ao-dateFilterDecorator'])

  .controller('Ctrl', ['$scope', function($scope) {
    $scope.hols = new Date(2010, 7, 1);
    $scope.bday = new Date(2016, 6, 26);
  }]);

})(window.angular);
