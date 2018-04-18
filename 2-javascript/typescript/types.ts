/*****************
 **  variables  **
 *****************/

 //types
var myString : string = 'test';   //type string..
var myNumber : number = 1;
var myBoolean : boolean = true;

myString = myNumber;              //compiler error
myString = myNumber.toString();   //ok

// : Any  - relax type checking
var item1 : any = { id:1, name:"item 1" };
item1 = { id:2 };			//is now ok (:any relaxes strict type checking)

//inferred typing
var myString2 = "my string";	  //inferred type of string
var myNumber2 = 2;							//inferred type of number
myNumber = myString;            //compiler error


//duck typing - for complex types
var complexType = { name:"myName", id:1 };       //inferred type object, with id & name properties
complexType = { id:2, name:"other" };            //ok (order doesn't matter)
complexType = { name:"name", id:3, age:"21" };   //compiler error v1.6+ (as extra property)
complexType = { id:4 };                          //compiler error (as no name property)

//type assertion
var item1 = <any>{ id:1, name:"item 1" };        // :any (on left) replaced with <and> (on right)
item1 = { id:2 };     //is now ok (due to casting)



/**********************
 **  arrays & emuns  **
 **********************/

var arrayOfNumbers: number[] = [1, 2, 3];    //type array of numbers
arrayOfNumbers = [3, 4, 5];                  //ok
arrayOfNumbers = ["one", "two", "three"];    //compiler error (items not numbers)

//Enums
enum DoorState {
  Open,
  Closed,
  Ajar };
//can ref in variety of ways..
var openDoor = DoorState.Open;
console.log("My door state: " + openDoor.toString());  //My door state: 0
var closedDoor = DoorState["Closed"];
console.log("My door state: " + closedDoor.toString());  //My door state: 1
var myDoor = DoorState[1];  //or DoorState["1"]  but not DoorState.0 (number not valid js property name)
console.log("My door state: " + myDoor.toString());  //My door state: Closed



/*****************
 **  functions  **
 *****************/

//standard
function addNumbers(a: number, b: number): number {
  return a + b;
};
var result = addNumbers(1, 2);					//3 - ok
var result = addNumbers("1", "2");			//compilation error, as strings passed not numbers

//anonymous fns
var addNumbers2 = function(a: number, b: number): number { return a + b; }

//fat arrow fns (to right of =)
var addNumbers3 = (a: number, b: number): number => a + b;
console.log('addNumbers3: ' + addNumbers3(1, 2) );					//3 - ok

//alternative fat arrow syntax (to left of =)
var addNumbers4: (a: number, b: number) => number
  = function (a, b) {return a + b; }

//can even separate out into 2 stmts
var addNumbers5: (a: number, b: number) => number;
addNumbers5 = function(a, b) {return a + b; };

console.log('addNumbers4: ' + addNumbers4(1, 2) );					//3 - ok
console.log('addNumbers5: ' + addNumbers5(1, 2) );					//3 - ok
