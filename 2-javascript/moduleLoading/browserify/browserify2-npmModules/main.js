//uniq - removes duplicates from array (in place - amends actual array, not creates copy)
/* npm install uniq */


//initial array
var arr = [1, 2, 2, 3, 4, 5, 5, 5, 6];

// var unique = require('uniq');
// unique(arr);
//or
require("uniq")(arr);

//final array
console.log(arr);