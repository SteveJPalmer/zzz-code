(function(angular) {
  'use strict';
angular.module('ao-dateFilterDecorator', [])

  /* syntax using module.decorator()  - convenience method */

  /* note: comment out decorator & will revert to original default (mediumDate) */

  //matches date filter (format filterName+'Filter')
  .decorator('dateFilter',  ['$delegate', function dateDecorator($delegate) {    //naming convention

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
   }]);



})(window.angular);
