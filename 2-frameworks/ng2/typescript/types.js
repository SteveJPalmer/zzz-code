/* TypeScript examples */
//types
var myString = 'test'; //type string..
var myNumber = 1;
var myBoolean = true;
myString = myNumber; //compiler error
myString = myNumber.toString(); //ok
//inferred typing
var myString2 = "my string"; //inferred type of string
var myNumber2 = 2; //inferred type of number
myNumber = myString; //compiler error
//duck typing - for complex types
var complexType = { name: "myName", id: 1 }; //inferred type object, with id & name properties
complexType = { id: 2, name: "other" }; //ok (order doesn't matter)
complexType = { name: "name", id: 3, age: "21" }; //compiler error v1.6+ (as extra property)
complexType = { id: 4 }; //compiler error (as no name property)
// : Any  - relax type checking
var item1 = { id: 1, name: "item 1" };
item1 = { id: 2 }; //is now ok (:any relaxes strict type checking)
//explicit casting
var item1 = { id: 1, name: "item 1" }; // :any (on left) replaced with <and> (on right)
item1 = { id: 2 }; //is now ok (due to casting)
//Arrays
var arrayOfNumbers = [1, 2, 3]; //type array of numbers
arrayOfNumbers = [3, 4, 5]; //ok
arrayOfNumbers = ["one", "two", "three"]; //compiler error (items not numbers)
//Enums
var DoorState;
(function (DoorState) {
    DoorState[DoorState["Open"] = 0] = "Open";
    DoorState[DoorState["Closed"] = 1] = "Closed";
    DoorState[DoorState["Ajar"] = 2] = "Ajar";
})(DoorState || (DoorState = {}));
;
//can ref in variety of ways..
var openDoor = DoorState.Open;
console.log("My door state: " + openDoor.toString()); //My door state: 0
var closedDoor = DoorState["Closed"];
console.log("My door state: " + closedDoor.toString()); //My door state: 1
var myDoor = DoorState[1]; //or DoorState["1"]  but not DoorState.0 (number not valid js property name)
console.log("My door state: " + myDoor.toString()); //My door state: Closed
