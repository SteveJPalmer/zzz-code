/**
 * Created by Steve on 13/03/2016.
 */

// **
// ** Predicate & Iteratee shorthands
// **

var _ = require('lodash');
var res;

var users = [
  {
    name: 'Steve',
    age: 30,
    is_premium: false
  },
  {
    name: 'Bob',
    age: 20,
    is_premium: false
  },
  {
    name: 'Kylie',
    age: 25,
    is_premium: true
  }
];



// **
// ** details of _.property(), _.matchesProperty(), _.matches() & _.bind()
// **


// ** _.property  - creates a fn to return the value of a property
// **
var f = _.property('name');
res = f({name: 'Steve'});
console.log('>>_.property result 1: ' + res);  //'Steve'

// ** example: _.matchesProperty     (Predicate & Iteratee shorthand pass as: [string, value] )
// **
console.log('example: _.matchesProperty');
//
var f = _.matchesProperty('name', 'Steve');
res = f({name: 'Steve'});
console.log('>result: ' + res);  //true

//can also call as _.matchesProperties(source)(given)
var res = _.matchesProperty('user.name', 'Steve')({user: {name: 'Steve'}});
console.log('>result: ' + res);  //true


// ** example: _.matches    (Predicate & Iteratee shorthand pass as: {obj} )
// **
console.log('example: _.matches');

var f = _.matches( {a: 1, b: 2} );
res = f( {a: 1, b: 3} );
console.log('>result: ' + res);  //false

//is not exact match, rather does source exist in given
//can also  call as _.matches(source)(given)
res = _.matches({name:'bob'})({name:'bob',age:100});
console.log('>result: ' + res);  //true


// ** example: this context (binding)
// **
console.log('example: this context (binding)');

var obj = {
  val: 10,
  add: function(n) {
    return this.val + n; }
};

var res = _.map([1, 2, 3], _.bind(obj.add, obj));
console.log('>result: ' + res);  //11,12,13