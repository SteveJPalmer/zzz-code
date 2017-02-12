(function(angular) {
  'use strict';
  angular.module('app', [])
  .controller('TestCtrl', ['$scope', function($scope) {
      var vm = this;

      this.name = 'Max';
      this.changeName = function () {
        this.name = new Date();
      }

      // watches techniques for 'controller as'
      //use test  (the controller as name)
      $scope.$watch("test.name",function(newValue, oldValue){
        console.log('watch1 fired: ' + newValue + "  - old value was " + oldValue);
      });
      //use vm  (that = this)
      $scope.$watch(function() {return vm.name;} ,function(value){
        console.log("watch2 fired: " + value);
      });
      //use angular bind
      $scope.$watch(angular.bind(this, function () {return this.name;}) ,function(value){
        console.log("watch3 fired: " + value);
      });

      //also arrow fn works (if using ES6)
      $scope.$watch(() => this.name, function(value) {
        console.log("watch4 fired: " + value);
      });

    });

  }]);
})(window.angular);
