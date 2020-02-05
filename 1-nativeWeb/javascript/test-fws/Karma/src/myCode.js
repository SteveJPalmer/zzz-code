/**
 * Created by steve on 30/08/2016.
 */
var mySum = function(x, y) {
  return x + y;
};

function myConcat (a, b) {
  return a + ':' + b;
};


function Duck(name) {
    this.name = name || "Anon cow";
};

Duck.prototype = {
  quack: function(target) {
    if (!target)
      throw new Error("missing target");
    return this.name + " quacked at " + target;
  }
};

//local tests
// console.log(mySum(1,2));
//
// console.log(myConcat('a','b'));
//
// console.log(Duck);    //check is visible in global
// console.log( (new Duck('Daffy')).quack('steve')  );

