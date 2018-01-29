//load libs
var _ = require('lodash');


//array of objs  -- Ng1 $$hashKey can cause matching issues (good test)
var myArray = [ {"code": "A",
                 "desc": "Test A"
                },
                {"code": "B",
                  "desc": "Test B"
                },
                {"code": "C",
                  "desc": "Test C"
                },
                {"code": "Z",
                  "desc": "Test Z",
                  "$$hashKey": "object:111"
                }
              ];

//Matching object with subset of props (partial prop)  ** NEED THIS TO MATCH **
var myObj = {"code": "Z",
             "desc": "Test Z"
};

// var myObj = {"code": "New",
//              "desc": "New Item"
// };

//search for a match
var index = _.findIndex(myArray, myObj);    //returns index of first match


//manage array
if (index > -1) {
  myArray.splice(index, 1);    //matched  - remove from array
}
else {
  myArray.push(myObj);         //no matched  - add to array
}

console.log( JSON.stringify(myArray, undefined, 2) );

