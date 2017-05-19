// **
// ** LoDash shorthands
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

//standard syntax - plain fn provided, fn used directly
res = _.filter(users, function(value, index, collection) {
          return value.age > 21;
        });
console.log('>result: ' + JSON.stringify(res) );  //Steve & Kylie

//shorthand - prop string (truthy values returned)
res =_.filter(users, 'is_premium');
console.log('>result: ' + JSON.stringify(res) );  //Kylie

//shorthand - prop name & value
res =_.filter(users, ['name','Kylie']);
console.log('>result: ' + JSON.stringify(res) );  //Kylie

//shorthand - using object props
res =_.filter(users, {name:'Kylie'});
console.log('>result: ' + JSON.stringify(res) );  //Kylie
