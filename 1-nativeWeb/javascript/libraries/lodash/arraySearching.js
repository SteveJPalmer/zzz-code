// LoDash searching: _.find() & _.findIndex()

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
    age: 22,
    is_premium: false
  },
  {
    name: 'Bob2',
    age: 22,
    is_premium: false
  },
  {
    name: 'Kylie',
    age: 25,
    is_premium: true
  }
];

/*  _.find()  */

//find() returns first matching obj,  for given prop
res = _.find(users, {'name':'Bob'});
console.log('_.find -1- ' + JSON.stringify(res));        //returns "Bob" - first Obj matching Bob

//find() returns first matching obj,  for multiple props
res = _.find(users, {'is_premium':false, 'age':22});
console.log('_.find -2- ' + JSON.stringify(res));        //returns "Bob" - first Obj matching false & 22

//findLast() - as find() but reversed (from end)
res = _.findLast(users, {'is_premium':false, 'age':22});
console.log('_.find -3- ' + JSON.stringify(res));        //returns "Bob2" - first matching false & 22 from end



/*  _.findIndex()  */

//like _.find, but returns the array index (rather than element itself)
res = _.findIndex(users, {name: 'Bob', age: 22});
console.log('_.findIndex -1- ' + JSON.stringify(res));        //returns 1,  the array index of first Bob

//
res = _.findIndex(users, {age: 22});
console.log('_.findIndex -2- ' + JSON.stringify(res));        //returns 1,  the array index of first Bob

//as findIndex() but reversed (from end)
res = _.findLastIndex(users, {age: 22});
console.log('_.findIndex -3- ' + JSON.stringify(res));        //returns 2,  the array index of Bob2 (searches from end)

