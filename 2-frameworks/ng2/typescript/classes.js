/* Typescript Classes
   ------------------ */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//----------------------------------------------------------------------------------------
/*************************
 *  Basic Class example  *
 *************************/
//define class, implementing interface
var ComplexType = (function () {
    function ComplexType() {
    }
    ComplexType.prototype.print = function () {
        return "BasicClass... id:" + this.id + " name:" + this.name;
    };
    return ComplexType;
}());
//create obj instance
var complexType = new ComplexType();
complexType.id = 1;
complexType.name = "complexType";
//create another obj instance
var complexType_2 = new ComplexType();
complexType_2.id = 2;
complexType_2.name = "complexType_2";
//
console.log(complexType.print());
console.log(complexType_2.print());
//----------------------------------------------------------------------------------------
/*******************************
 *  Class Constructor example  *
 *******************************/
//define class, implementing interface
var ComplexTypeC = (function () {
    function ComplexTypeC(idArg, nameArg) {
        this.id = idArg;
        this.name = nameArg;
    }
    ComplexTypeC.prototype.print = function () {
        return "Constructor... id:" + this.id + " name:" + this.name;
    };
    ;
    ;
    return ComplexTypeC;
}());
//create another obj instance
var complexTypeC = new ComplexTypeC(1, "complexTypeC");
//create another obj instance
var complexTypeC_2 = new ComplexTypeC(2, "complexTypeC_2");
//
console.log(complexTypeC.print());
console.log(complexTypeC_2.print());
//----------------------------------------------------------------------------------------
/***************************
 *  Class Methods example  *
 ***************************/
var ComplexTypeM = (function () {
    function ComplexTypeM(idArg, nameArg) {
        this.id = idArg;
        this.name = nameArg;
    }
    //methods
    ComplexTypeM.prototype.print = function () {
        return "id:" + this.id + " name:" + this.name;
    };
    ComplexTypeM.prototype.usingTheAnyKeyword = function (arg1) {
        this.id = arg1;
    };
    ComplexTypeM.prototype.usingOptionalParameters = function (optionalArg1) {
        if (optionalArg1) {
            this.id = optionalArg1;
        }
    };
    ComplexTypeM.prototype.usingDefaultParameters = function (defaultArg1) {
        if (defaultArg1 === void 0) { defaultArg1 = 0; }
        this.id = defaultArg1;
    };
    ComplexTypeM.prototype.usingRestSyntax = function () {
        var argArray = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            argArray[_i - 0] = arguments[_i];
        }
        if (argArray.length > 0) {
            this.id = argArray[0];
        }
    };
    ComplexTypeM.prototype.usingFunctionCallbacks = function (callback) {
        callback(this.id);
    };
    return ComplexTypeM;
}());
//create instances (constructor overloaded)
var complexTypeM = new ComplexTypeM(1, "complexType"); //ok
var complexTypeM_2 = new ComplexTypeM("1", "1"); //ok
var complexTypeM_3 = new ComplexTypeM(true, true); //compile error (as boolean)
//method calls
complexTypeM.usingTheAnyKeyword(true); //ok
complexTypeM.usingTheAnyKeyword({ id: 1, name: "test" }); //ok
complexTypeM.usingOptionalParameters(1); //ok
complexTypeM.usingOptionalParameters(); //ok
complexTypeM.usingDefaultParameters(2); //ok
complexTypeM.usingDefaultParameters(); //ok  value defaults to 0
complexTypeM.usingRestSyntax(1, 2, 3); //ok
complexTypeM.usingRestSyntax(1, 2, 3, 4, 5); //ok
function myCallbackFn(id) {
    return id.toString();
}
complexTypeM.usingFunctionCallbacks(myCallbackFn); //ok
//----------------------------------------------------------------------------------------
/*******************************
 *  Class Inheritance example  *
 *******************************/
var BaseClass = (function () {
    function BaseClass(id) {
        this._id = id;
    }
    BaseClass.prototype.getProperties = function () {
        return "_id:" + this._id;
    };
    return BaseClass;
}());
;
//sub class
var subClass = (function (_super) {
    __extends(subClass, _super);
    function subClass(id, name) {
        //sub class can call base class constructor via super (aka constructor overloading)
        _super.call(this, id);
        this._name = name;
    }
    //fn overloading
    subClass.prototype.getProperties = function () {
        //retrieves _name from subClass & _id from BaseClass (super.)
        return "Inheritance... _name:" + this._name + "," + _super.prototype.getProperties.call(this);
    };
    return subClass;
}(BaseClass));
;
//calling code
var myClass = new subClass(1, "steve");
console.log(myClass.getProperties());
//----------------------------------------------------------------------------------------
/*****************************
 *  Class Modifiers example  *
 *****************************/
var ClassWithModifiers = (function () {
    function ClassWithModifiers(id, name) {
        this._id = id;
        this._name = name;
    }
    ClassWithModifiers.prototype.updateNameFromId = function () {
        this._name = this._id.toString() + "_name";
    };
    ClassWithModifiers.prototype.modifyId = function (id) {
        this._id = id;
        this.updateNameFromId();
    };
    return ClassWithModifiers;
}());
//create instance
var myClass2 = new ClassWithModifiers(1, "name");
//access
myClass2.modifyId(2); //OK (public api)
myClass2._id = 2; //Compile Error (private var)
myClass2.updateNameFromId(); //Compile Error (private method)
//----------------------------------------------------------------------------------------
/**************************************
 *  Class Property Accessors example  *
 **************************************/
var SimpleClassWithAccessors = (function () {
    function SimpleClassWithAccessors() {
    }
    Object.defineProperty(SimpleClassWithAccessors.prototype, "id", {
        get: function () {
            console.log('Property Accessors... get called');
            return this._id;
        },
        set: function (value) {
            this._id = value;
            console.log('Property Accessors... set called');
        },
        enumerable: true,
        configurable: true
    });
    return SimpleClassWithAccessors;
}());
var mySimpleAccClass = new SimpleClassWithAccessors(); //instance of class
mySimpleAccClass.id = 1; //simply use id, js runtime will substitute with set()
console.log('Property Accessors... id value: ' + mySimpleAccClass.id); //simply use id, js runtime will substitute with get()
//----------------------------------------------------------------------------------------
/**************************
 *  Class Static example  *
 **************************/
//example: standard js
var standardClass = (function () {
    function standardClass() {
    }
    standardClass.prototype.printOne = function () {
        console.log('StaticClass... 1'); //just logs string "1" to console
    };
    return standardClass;
}());
;
var myClassInstance = new standardClass();
myClassInstance.printOne();
//example: ts defines static fn
var myStaticClass = (function () {
    function myStaticClass() {
    }
    myStaticClass.printOne = function () {
        console.log('StaticClass... 2'); //just logs string "2" to console
    };
    myStaticClass.MAGIC_STRING = '12345';
    return myStaticClass;
}());
;
//
myStaticClass.printOne(); //can call fn without first creating instance of class
if (myStaticClass.MAGIC_STRING == '12345') {
}
;
/****************************
 *  Class Generics example  *
 ****************************/
//generic implementation of class
var Concatenator = (function () {
    function Concatenator() {
    }
    Concatenator.prototype.concatenateArray = function (inputArray) {
        var returnString = "";
        for (var i = 0; i < inputArray.length; i++) {
            if (i > 0)
                returnString += ",";
            returnString += inputArray[i].toString();
        }
        return returnString;
    };
    return Concatenator;
}());
//create instances
var stringConcatenator = new Concatenator(); //substitute generic type < T > with string type (& inputArray a string)
var numberConcatenator = new Concatenator(); //				,,							,,								number				(& inputArray a number)
//test
var stringArray = ["first", "second", "third"]; //define string array
var numberArray = [1, 2, 3]; //define number array
var stringResult = stringConcatenator.concatenateArray(stringArray); //OK, as passed correct array type
var numberResult = numberConcatenator.concatenateArray(numberArray); //OK
var stringResult2 = stringConcatenator.concatenateArray(numberArray); //Compile Error (type incompatible)
//----------------------------------------------------------------------------------------
//# sourceMappingURL=classes.js.map