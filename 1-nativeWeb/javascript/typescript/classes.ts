/* Typescript Classes
 ------------------ */

/***********************
 *  Interface example  *
 ***********************/
//define interface
interface IComplexType {
  id: number;
  name: string;
  print(): string;
}

//define class, implementing interface
class ComplexType implements IComplexType {
  id: number;
  name: string;

  print(): string {
    return "Interface... id:" + this.id + " name:" + this.name;
  }
}
//create obj instance
var complexType_1: ComplexType = new ComplexType();
complexType_1.id = 1;
complexType_1.name = "complexType_1";
//create another obj instance
var complexType_2: ComplexType = new ComplexType();
complexType_2.id = 2;
complexType_2.name = "complexType_2";
//
console.log(complexType_1.print());
console.log(complexType_2.print());
//----------------------------------------------------------------------------------------



/*******************************
 *  Class Constructor example  *
 *******************************/
//define class, implementing interface
class ComplexTypeC implements IComplexType {
  id: number;
  name: string;

  print(): string {
    return "Constructor... id:" + this.id + " name:" + this.name;
  };

  constructor(idArg: number, nameArg: string) {
    this.id = idArg;
    this.name = nameArg;
  };
}
//create another obj instance
var complexTypeC = new ComplexTypeC(1, "complexTypeC");
//create another obj instance
var complexTypeC_2 = new ComplexTypeC(2, "complexTypeC_2");
//
console.log(complexTypeC.print());
console.log(complexTypeC_2.print());
//----------------------------------------------------------------------------------------


/*****************************************************
 *  Class Methods & constructor overloading example  *
 *****************************************************/
class ComplexTypeM implements IComplexType {
  id: number;
  name: string;

  constructor(idArg: number, nameArg: string);
  constructor(idArg: string, nameArg: string);
  constructor(idArg: any, nameArg: any) {
    this.id = idArg;
    this.name = nameArg;
  }

  //methods
  print(): string {
    return "id:" + this.id + " name:" + this.name;
  }

  usingTheAnyKeyword(arg1: any): any {
    this.id = arg1;
  }

  usingOptionalParameters(optionalArg1?: number) {
    if (optionalArg1) {
      this.id = optionalArg1;
    }
  }

  usingDefaultParameters(defaultArg1: number = 0) {
    this.id = defaultArg1;
  }

  usingRestSyntax(...argArray: number []) {   //variable args
    if (argArray.length > 0) {
      this.id = argArray[0];
    }
  }

  usingFunctionCallbacks(callback: (id: number) => string) {
    callback(this.id);
  }
}
//create instances (constructor overloaded)
var complexTypeM: ComplexTypeM = new ComplexTypeM(1, "complexType");  //ok
var complexTypeM_2: ComplexTypeM = new ComplexTypeM("1", "1");        //ok
var complexTypeM_3: ComplexTypeM = new ComplexTypeM(true, true);      //compile error (as boolean)
//method calls
complexTypeM.usingTheAnyKeyword(true);                      //ok
complexTypeM.usingTheAnyKeyword({id: 1, name: "test"});     //ok

complexTypeM.usingOptionalParameters(1);          //ok
complexTypeM.usingOptionalParameters();                     //ok

complexTypeM.usingDefaultParameters(2);            //ok
complexTypeM.usingDefaultParameters();                       //ok  value defaults to 0

complexTypeM.usingRestSyntax(1, 2, 3);               //ok
complexTypeM.usingRestSyntax(1, 2, 3, 4, 5);         //ok

function myCallbackFn(id: number): string {
  return id.toString();
}
complexTypeM.usingFunctionCallbacks(myCallbackFn);           //ok
complexTypeM.usingFunctionCallbacks('not a cb fn');   //error
//----------------------------------------------------------------------------------------


/*******************************
 *  Class Inheritance example  *
 *******************************/
class BaseClass {						//base class (super class)
  private _id: number;

  constructor(id: number) {
    this._id = id;
  }

  getProperties(): string {
    return "_id:" + this._id;
  }
}
;

//sub class
class subClass extends BaseClass {
  private _name: string;

  constructor(id: number, name: string) {
    //sub class can call base class constructor via super (aka constructor overloading)
    super(id);
    this._name = name;
  }

  //fn overloading
  getProperties(): string {
    //retrieves _name from subClass & _id from BaseClass (super.)
    return "Inheritance... _name:" + this._name + "," + super.getProperties();
  }
}
;

//calling code
var myClass = new subClass(1, "steve");
console.log(myClass.getProperties());
//----------------------------------------------------------------------------------------


/*****************************
 *  Class Modifiers example  *
 *****************************/
class ClassWithModifiers {
  private _id: number; 						    //private protects var - calls only allowed within body of class definition
  private _name: string;

  constructor(id: number, name: string) {		    //constructor assigns initial values
    this._id = id;
    this._name = name;
  }

  private updateNameFromId() {
    this._name = this._id.toString() + "_name";
  }

  modifyId(id: number) {					        //defaults to public - method used to update private vars
    this._id = id;
    this.updateNameFromId();
  }
}
//create instance
var myClass2 = new ClassWithModifiers(1, "name");
//access
myClass2.modifyId(2);					//OK (public api)
myClass2._id = 2;						      //Compile Error (private var)
myClass2.updateNameFromId();			//Compile Error (private method)
//----------------------------------------------------------------------------------------


/**************************************
 *  Class Property Accessors example  *
 **************************************/
class SimpleClassWithAccessors {
  private _id: number;			        //private _id prop
  get id() {								        //returns value of private _id prop
    console.log('Property Accessors... get called');
    return this._id;
  }

  set id(value: number) {					//sets value of private _id prop
    this._id = value;
    console.log('Property Accessors... set called');
  }
}
var mySimpleAccClass = new SimpleClassWithAccessors();		//instance of class
mySimpleAccClass.id = 1;																						//simply use id, js runtime will substitute with set()
console.log('Property Accessors... id value: ' + mySimpleAccClass.id); 			//simply use id, js runtime will substitute with get()
//----------------------------------------------------------------------------------------


/**************************
 *  Class Static example  *
 **************************/
//example: standard instance method
class standardClass {
  printOne() {
    console.log('StaticClass... 1');			//just logs string "1" to console
  }
}
;
var myClassInstance = new standardClass();
myClassInstance.printOne();

//example: ts defines static method & Constant
class myStaticClass {
  static printOne() {			                //fn marked as static
    console.log('StaticClass... 2');		  //just logs string "2" to console
  }

  static MAGIC_STRING: string = '12345';
}
;
//
myStaticClass.printOne();						          //can call fn without first creating instance of class
if (myStaticClass.MAGIC_STRING == '12345') {	//can ref var without first creating instance of class
                                              //do stuff
}
;


/****************************
 *  Class Generics example  *
 ****************************/
//generic implementation of class
class Concatenator<T> {										              //generic type < T > syntax

  concatenateArray(inputArray: Array<T>): string {			//inputArray arg must be array of type used to construct instance
    var returnString = "";                              //Note: we always want return type to be a string
    for (var i = 0; i < inputArray.length; i++) {
      if (i > 0)
        returnString += ",";
      returnString += inputArray[i].toString();
    }
    return returnString;
  }
}

//create instances
var stringConcatenator = new Concatenator<string>();			//substitute generic type < T > with string type (& inputArray a string)
var numberConcatenator = new Concatenator<number>();			//				,,							,,								number				(& inputArray a number)

//test
var stringArray: string[] = ["first", "second", "third"];						      //define string array
var numberArray: number[] = [1, 2, 3];																		//define number array
var stringResult  = stringConcatenator.concatenateArray(stringArray);			//OK, as passed correct array type
var stringResult1 = numberConcatenator.concatenateArray(numberArray);			//OK
var stringResult2 = stringConcatenator.concatenateArray(numberArray);			//Compile Error (type incompatible)
//----------------------------------------------------------------------------------------

