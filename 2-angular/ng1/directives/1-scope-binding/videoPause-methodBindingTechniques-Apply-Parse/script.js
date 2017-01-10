/* alternative way to pass fn & vars into directives, via the link fn, attr param
   (holds all tag’s attrs as key:value)
*/

angular.module('app', []);

angular.module('app').controller('mainCtrl', function($scope) {
  $scope.messages = [];

  //parent method to be used by event-pause directives
  $scope.handlePause = function(e) {
    console.log(e);
    $scope.messages.push({text: 'paused!'});    //message array updates - no binding to view if outside of ng digest cycle
    console.log('video was paused!');
  }
});


/* event-pause directive - fire a method when video is in paused state */
//standard way with isolate scope & & binding
angular.module('app').directive('eventPause', function($parse) {
  return {
    restrict: 'A',
    scope: {
      eventPause: '&'     //binds to parent method
    },
    link: function(scope, elem, attrs) {

      elem.on('pause', function(event) {
        //start new digest cycle, as external event has happened...
        scope.$apply(function() {           //as jq event, outside of ng digest cycle, so wrap with $apply()
          scope.eventPause({evt: event});   //call parent method passing out the event
        })                                  //arg binding name is the html instance arg name - ie in this case evt (not e)
      })                                    //Think: in terms of also binding the 'arg' as well as the method name vai the html attrs

/*
      //test removing $apply()
      //by removing from ng digest cycle, view binding will not happen, as messages not appear on screen
      elem.on('pause', function(event) {
        scope.eventPause({evt: event});     //if remove the $apply, the 'pause' messages on screen don't appear
      })                //reason: ng is unaware of the jq event firing, in ng nothing happens if outside of a digest cycle! (watch out)
*/

    }
  }
})

//alternative way via link attr arg..
angular.module('app').directive('eventPause2', function($parse) {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      var fn = $parse(attrs['eventPause2']);
      elem.on('pause', function(event) {
        scope.$apply(function() {           //as jq event, outside of ng digest cycle, so wrap with $apply()
          fn(scope, {evt: event})           //call parent method passing out the event
        })
      })
    }
  }
})

/* spacebar-support directive */
// when spacebar pressed, toggle play/pause
angular.module('app').directive('spacebarSupport', function() {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      $('body').on('keypress', function(evt) {
        var vidEl = elem[0];                        //convert from jq obj to underlying elem
        if(evt.keyCode === 32) {
          if(vidEl.paused) {                      //can then view video elem properties & methods
            vidEl.play();
          } else {
            vidEl.pause();
          }
        }
      })
    }
  }
})
