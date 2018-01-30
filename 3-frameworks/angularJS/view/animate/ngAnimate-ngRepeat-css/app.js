(function(angular) {

angular.module('myApp', ['ngAnimate'])
  .controller('myController', function() {

    //state properties
    this.items = [ {id:111},{id:222},{id:333} ];

    this.push = function() {
      this.items.push({id:999});
    };

    this.pop = function() {
      this.items.pop();
    };

  });

})(window.angular);
