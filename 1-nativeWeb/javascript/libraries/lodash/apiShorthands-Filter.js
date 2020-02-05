// LoDash shorthands: _.filter()

var _ = require('lodash');
var res, res1, res2;

var users = [
  {
    name: 'Fred',
    family: 'Flintstone',
    age: 35,
    isPet: false
  },
  {
    name: 'Wilma',
    family: 'Flintstone',
    age: 29,
    isPet: false
  },
  {
    name: 'Pebbles',
    family: 'Flintstone',
    age: 5,
    isPet: false
  },
  {
    name: 'Dino',
    family: 'Flintstone',
    age: 9,
    isPet: true,
    petType: 'dinosaur'
  },
  {
    name: 'Barney',
    family: 'Rubble',
    age: 33,
    isPet: false
  },
  {
    name: 'Betty',
    family: 'Rubble',
    age: 27,
    isPet: false
  },
  {
    name: 'Bamm-Bamm',
    family: 'Rubble',
    age: 7,
    isPet: false
  },
  {
    name: 'Hoppy',
    family: 'Rubble',
    age: 1,
    isPet: true,
    petType: 'kangaroo'
  }
];

//standard syntax - full predicate fn
console.info('>>predicate fn');
res = _.filter(users, function(value, index, collection) {
          return value.age > 31;
        });
console.log('>result: ' + JSON.stringify(res) );  // returns array of Fred, Barney objs

//shorthand - prop string
console.info('>>shorthand property string');
res1 =_.filter(users, 'isPet');                     // Watch: currently not finding if not boolean
res2 =_.filter(users, _.property('isPet'));         //        (not converting value to boolean!)
console.log('>result1: ' + JSON.stringify(res1) );  // returns array of Dino, Hoppy objs
console.log('>result2: ' + JSON.stringify(res2) );  // returns array of Dino, Hoppy objs

//shorthand - prop name & value
console.info('>>shorthand property array');
res1 =_.filter(users, ['name','Fred']);
res2 =_.filter(users, _.matchesProperty('name','Fred'));
console.log('>result1: ' + JSON.stringify(res1) );  // returns array Fred obj
console.log('>result2: ' + JSON.stringify(res2) );  // returns array Fred obj

//shorthand - using object props
console.info('>>shorthand Obj');
res1 =_.filter(users, {name:'Fred', isPet:false});
res2 =_.filter(users, _.matches({name:'Fred', isPet:false}) );
console.log('>result1: ' + JSON.stringify(res1) );  // returns array Fred obj
console.log('>result2: ' + JSON.stringify(res2) );  // returns array Fred obj
