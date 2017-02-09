(function(angular) {
  'use strict';
angular.module('app', [])
  .controller('MyController', function() {
    //state properties
    this.myName = 'steve',
    this.color;

    this.format = 'M/d/yy h:mm:ss a';
  })


  /* directive to change background colour */
  .directive('aoColour', function() {
    return {
      restrict: 'AE',
      replace: true,
      template: '<p style="background-color:{{color}}">Change Colour to {{color}}</p>',

      link: function(scope, elem, attrs) {
        //reset background to white on click
        elem.bind('click', function() {
          elem.css('background-color', 'white');
          // scope.$apply(function() {
          //   scope.color = "white";
          // });
        });
        //change pointer icon on hover
        elem.bind('mouseover', function() {
          elem.css('cursor', 'pointer');
        });
      }
    };
  })


  /* directive to display current time - refresh every second */
  .directive('myCurrentTime', ['$interval', 'dateFilter', function($interval, dateFilter) {

    function linker(scope, element, attrs) {
      var format = scope.ctrl.format,
          timeoutId;

      console.log('debug: myName: ' + scope.ctrl.myName);
      console.log('debug: scope.format: ' + scope.ctrl.format);

      function updateTime() {
        element.text(dateFilter(new Date(), format));
      }

      scope.$watch(attrs.myCurrentTime, function(value) {
        format = value;
        updateTime();
        console.log('debug: attr watch fired');
      });

      //start UI update process (save timeoutId so can cancel)
      timeoutId = $interval(function() {
        updateTime();  //update DOM
      }, 1000);

      //to cancel interval if elem removed from DOM
      element.on('$destroy', function() {
        $interval.cancel(timeoutId);
      });
    }

    return {
      link: linker
    };
  }]);


})(window.angular);
