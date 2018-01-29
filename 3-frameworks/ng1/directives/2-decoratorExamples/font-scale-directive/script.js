// Code goes here

angular.module('app', []);

angular.module('app').controller('mainCtrl', function($scope) {
  $scope.size = 150;  //default value
});

/* directive to watch a given model var & use it to apply styling */

angular.module('app').directive('fontScale', function() {
  return {
    link: function(scope, elem, attrs) {
      //if $watch 'size' then binds to implementation in this instance, dont want that..
      //instead pass vairable want to bind to in attr - then is reusable :)
      scope.$watch(attrs['fontScale'], function(newVal) {    //gets the value of the elems' attribute passed
        //remember $watch cb fn can accept new value & old value of model var
        elem.css('font-size', newVal + '%');  //make use jq methods (as jq wrapped set)  - % is units (%, px, em)
      })
    }
  }
})
