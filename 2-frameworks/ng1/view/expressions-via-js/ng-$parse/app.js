var app = angular.module('app', []);

app.controller('MainCtrl', function($scope, $parse) {

  var vm = this;
  vm.obj = { name: 'foo' };
  
  var ref = 'obj.name';         //string value  - holds name of model var
  var getter = $parse(ref);     //returns fn (js obj) representing exp

  var extractValue = getter(vm);
  console.log(extractValue);

  vm.go = function() {
    getter.assign(vm, 'bar');

    console.log(getter(vm));
  };
});
