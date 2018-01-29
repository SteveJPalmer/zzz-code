// Code goes here

angular.module('app', []);

angular.module('app').controller('mainCtrl', function($scope) {
  $scope.data = {message:"I have not been clicked"};
  $scope.clickHandler = function(p) {
    p.message = "I have been clicked";
  }
});

angular.module('app').directive('myClick', function($parse) {     //$parse needed for technique below
  return {
    link: function(scope, el, attrs) {
      var fn = $parse(attrs['myClick']);  //again technique to not create isolate scope for our ng-click
      el.on('click', function() {
        scope.$apply(function() {         //need start an ng digest cycle (so view binding happens)
          fn(scope);
        })
      })
    }
  }
})

