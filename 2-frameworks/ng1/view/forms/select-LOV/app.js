(function(angular) {
  'use strict';
angular.module('ngvalueSelect', [])
  .controller('ExampleController', ['$scope', function($scope) {

    //diff data types for the value attr (using ngValue directive allows more than just string values)
    $scope.data = {
     model: null,
     availableOptions: [
          {value: 'myString', name: 'string'},
          {value: 1, name: 'integer'},
          {value: true, name: 'boolean'},
          {value: null, name: 'null'},
          {value: {prop: 'value'}, name: 'object'},
          {value: ['a'], name: 'array'}
     ]
    };
 }]);
})(window.angular);
