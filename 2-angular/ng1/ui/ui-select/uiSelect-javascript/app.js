/* initial prototye of ui-select */

var app = angular.module('app', ['ngSanitize', 'ui.select']);

  app.controller('ctrl', ['$scope', '$log', 'countryData', 'peopleData', 'itemData', function($scope, $log, countryData, peopleData, itemData) {
    var vm = this;
    /* properties */
    vm.country = {};          //country obj  - must be obj

    /* methods */
    vm.set = function(value) {
      vm.country.selectedItem = value ? value : null;
    };


    /* ---------------------------------------------------------------------------------------------
     * temp watch
     * --------------------------------------------------------------------------------------------- */
    $scope.$watch(function() {return vm.country.selectedItem;} ,function(value){
      if (!angular.isUndefined(value)) console.log("ng-model: " + JSON.stringify(value,null,2) );
    });

    /**---------------------------------------------------------------------------------------------
     ** mock data
     **---------------------------------------------------------------------------------------------*/
    //countries
    vm.countries = countryData.countries;

  }]);



