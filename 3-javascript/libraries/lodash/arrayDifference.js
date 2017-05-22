/**
 * Created by Steve on 13/03/2016.
 */

var _ = require('lodash');
var res, added, removed, extra;


var current  = ['Fred','Barney','Wilma','Betty','Pebbles'];
var original = ['Fred','Barney','Wilma','Betty','Bob'];

/*  _.difference()  */
res = _.difference([1,2,3,4,5], [2,3]);
console.log('_.difference       ' + JSON.stringify(res));   // [1,4,5]   returns array of diff
console.log('convert to string: ' + res.join(' '));         // "1 4 5"  convert to string

added   = _.difference(current, original);
deleted = _.difference(original, current);
console.log('added:   ' + JSON.stringify(added));     // returns array of values not in second array
console.log('deleted: ' + JSON.stringify(deleted));   //    ,,        ,,        ,,        ,,

