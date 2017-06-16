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

  })

  .animation('.my-fade-animation', function() {
    return {
      enter : function(element, done) {
        element.css('opacity',0);
        jQuery(element).animate({
          opacity: 1
        }, done);

        // optional onDone or onCancel callback
        // function to handle any post-animation
        // cleanup operations

        // return function(isCancelled) {
        //   if(isCancelled) {
        //     jQuery(element).stop();
        //   }
        // }
      },
      leave : function(element, done) {
        element.css('opacity', 1);
        jQuery(element).animate({
          opacity: 0
        }, done);

        // optional onDone or onCancel callback
        // function to handle any post-animation
        // cleanup operations

        // return function(isCancelled) {
        //   if(isCancelled) {
        //     jQuery(element).stop();
        //   }
        // }
      },
      move : function(element, done) {
        element.css('opacity', 0);
        jQuery(element).animate({
          opacity: 1
        }, done);

        // optional onDone or onCancel callback
        // function to handle any post-animation
        // cleanup operations

        // return function(isCancelled) {
        //   if(isCancelled) {
        //     jQuery(element).stop();
        //   }
        // }
      },

      // you can also capture these animation events
      addClass : function(element, className, done) {},
      removeClass : function(element, className, done) {}
    }
  });

})(window.angular);
