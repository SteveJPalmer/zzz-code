(function(angular) {
  'use strict';
angular.module('app', [])
  .controller('Controller', ['$scope', '$timeout', function($scope, $timeout) {
    $scope.name = 'Steve';
    $scope.message = 'initial';
    $scope.dialogIsHidden = false;

    //hide the dialog for 2sec
    $scope.hideDialog = function(message) {
      $scope.message = message;
      $scope.dialogIsHidden = true;
      $timeout(function() {
        $scope.message = 'reset';
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
