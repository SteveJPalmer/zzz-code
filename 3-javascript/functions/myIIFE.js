
var mySum = function(x, y) {
  return x + y;
}

function myConcat (a, b) {
  return a + ':' + b;
}

// duck.js
(function(exports) {    //creates own namespace
  "use strict";

  function Duck(name) {
    this.name = name || "(default) Mr Duck";
  }
  exports.Duck = Duck;

  Duck.prototype = {
    quack: function(target) {
      if (!target)
        throw new Error("missing target");
      return this.name + " quacked at " + target;
    }
  };

  // console.log( (new Duck('Daffy')).quack('steve')  );   //will be visible inside
})(global);

//local tests
// console.log(mySum(1,2));
//
// console.log(myConcat('a','b'));
//
// console.log(Duck);
// console.log( (new Duck('Daffy')).quack('steve')  );   //check is visible

