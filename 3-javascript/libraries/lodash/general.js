/**
 * Created by Steve on 13/03/2016.
 */

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

/*  _.difference()  */

res = _.difference([1,2,3,4,5], [2,3]);
console.log('_.difference -1- ' + JSON.stringify(res));        //1,2,3
console.log('convert to string:' + res.join(' '));