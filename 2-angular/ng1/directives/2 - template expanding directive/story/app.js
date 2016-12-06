(function(angular) {
  'use strict';
angular.module('app', [])
  .controller('StoryController', function() {
    //state properties
    this.stories = [
      {title:'myTitle1', description:'stuff1'},
      {title:'myTitle2', description:'stuff2'},
      {title:'myTitle3', description:'stuff3'},
    ];
  })

  .directive('aoStory', function() {              //name normalization applies: aoStory (ao-story)
    return {																			//DDO
      scope: true,																// each instance gets new scope
      replace: true,															// template replaces elem directive defined on
      template: '<div><h4 ao-fade>{{story.title}}</h4><p>{{story.description}}</p></div>'   //nested directive ao-fade
    }
  })


  .directive('aoFade', function() {                         //name normalization applies: aoFade (ao-fade)
    var linker = function(scope, element, attrs) {					//link fn
      //add events
      element
        .mouseover(function () {
          element.css({ 'opacity': 0.5 });
          //element.css({ 'background-color': red });
        })
        .mouseout(function () {															//can chain events together
          element.css({ 'opacity': 1.0 })
          //element.css({ 'background-color': orange });
        });
    };
    var controller = function($scope) {
      //...DOM manipulation, plugin config etc..  					//controller fn
    };
    return { 															//DDO
      restrict: 'A',  										// restrict usage to attribute only
      link: linker												// specify controller fn
    };

  });




})(window.angular);
