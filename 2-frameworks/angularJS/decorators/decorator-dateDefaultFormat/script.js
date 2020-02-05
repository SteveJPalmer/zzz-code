(function(angular) {
  'use strict';
angular.module('filterDecorator', [])

  .controller('Ctrl', ['$scope', function($scope) {
    $scope.hols = new Date(2010, 7, 1);
    $scope.bday = new Date(2016, 6, 26);
  }])

  //note: comment out decorator & will revert to original default (mediumDate)
  .config(['$provide', function($provide) {

    $provide.decorator('dateFilter', [         //matches date filter (format filterName+'Filter')
      '$delegate', function dateDecorator($delegate) {    //naming convention

        // store the original filter
        var originalFilter = $delegate;

        // return our filter
        return shortDateDefault;

        // shortDateDefault sets the format to shortDate if it is falsy
        function shortDateDefault(date, format, timezone) {
          if (!format) format = 'shortDate';    //try diff formats from dateFormat (medium, fullDate...)

          // return the result of the original filter
          return originalFilter(date, format, timezone);
        }
      }
    ]);
  }]);

})(window.angular);
