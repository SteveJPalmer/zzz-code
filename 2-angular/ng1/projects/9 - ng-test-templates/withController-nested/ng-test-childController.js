/* child controller  - use $scope to show other technique */
angular.module('app')
  .controller('ChildController', ['$scope', function($scope) {
  $scope.name = 'Steve';
  $scope.timeOfDay = 'morning';
  }
]);