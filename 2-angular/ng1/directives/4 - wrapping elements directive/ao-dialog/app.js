(function(angular) {
  'use strict';
angular.module('app', [])
  .controller('Controller', ['$scope', '$timeout', function($scope, $timeout) {
    $scope.name = 'Steve';
    $scope.message = '';

    //hide the dialog for 2sec
    $scope.hideDialog = function(message) {
      $scope.message = message;
      $scope.dialogIsHidden = true;
      $timeout(function() {
        $scope.message = '';
        $scope.dialogIsHidden = false;
      }, 2000);
    };

  }])
  .directive('aoDialog', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        'close': '&onClose'
      },
      templateUrl: 'ao-dialog-close.html'
    };
  });
})(window.angular);
