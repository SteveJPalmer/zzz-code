(function(angular) {
  'use strict';
angular.module('myServiceDecorator', [])

  .controller('Ctrl', ['$scope', '$log', '$timeout', function($scope, $log, $timeout) {

      //log some errors into the $log stack (view in console log)
      $log.error('my error message');
      $log.warn('my warn message');
      $log.log('my log message');
      $log.info('my info message');
      $log.debug('my debug message');

      $timeout(function() {
        $log.info('info: message logged within a timeout');
      });
    }
  ])

  /* directive to write out the $log stack */
  .directive('myLog', ['$log', function($log) {
      return {
        restrict: 'E',
        template: '<ul id="myLog"><li ng-repeat="l in myLog" class="{{l.type}}">{{l.message}}</li></ul>',
        scope: {},
        compile: function() {
          return function(scope) {
            scope.myLog = $log.stack;
          };
        }
      };
    }
  ])

  /* decorator replaces the $log service */
  .config([
    '$provide',
    function($provide) {

      $provide.decorator('$log', [
        '$delegate',
        function logDecorator($delegate) {

          var myLog = {
            warn: function(msg) {
              log(msg, 'warn');
            },
            error: function(msg) {
              log(msg, 'error');
            },
            info: function(msg) {
              log(msg, 'info');
            },
            debug: function(msg) {
              log(msg, 'debug');
            },
            log: function(msg) {
              log(msg, 'log');
            },
            stack: []
          };

          function log(msg, type) {
            myLog.stack.push({ type: type, message: msg.toString() });
            if (console && console[type]) console[type](msg);
          };

          return myLog;
        }
      ]);

    }
  ]);

})(window.angular);
