/***********
 * Strings *
 ***********/

/* String.search() - String.match() - String.replace()*/
console.info('<< Strings >>');

var str="Is this all there is?";
var result = str.search(/rubbish/i);
console.log('match0: ' + result);      //-1     (no match)

var patt = /is/i; 
var patt1 = /is/ig;
var result;                     

result = str.search(patt);
console.log('match1: ' + result);      //0      (position of first match)
result = str.search(patt1);
console.log('match2: ' + result);      //0      (position of first match)

result = str.match(patt);
console.log('match3: ' + result);      //Is
result = str.match(patt1);
console.log('match4: ' + result);      //[ Is,is,is ]
console.log('match5: ' + result[0]);   //Is

// replace
const re2 = /(\w+)\s(\w+)/ig;
const str2   = 'John Smith';
const subst = '$2, $1 is formal name. Matched: $&';
result = str2.replace(re2, subst);
console.log('result: ', result);       //result:  Smith, John is formal name. Matched: John Smith



/*****************
 * RegExp object *
 *****************/

/* RegExp.test() & RegExp.exec() */
console.info('<< RegExp >>');

var patt2 = new RegExp("e");
console.log(patt2.test("The best things in life are free"));     // true
console.log(/e/.exec("The best things in life…"));  			        // [ 'e', index: 2, input: 'The best things in life…' ]
console.log(patt2.exec("The best things in life are free")); 	  // [ 'e', index: 2, input: 'The best things in life are free' ]
console.log(patt2.exec("The best things in life are free")[0]); 	// e

//iterative loop
const myRegExp = /\w+\s/g;								                //matches one or more chars followed by a space
const myStr2 = 'fee fi fo fum';
var myArray;
while ((myArray = myRegExp.exec(myStr2)) !== null) {       //returns null if no further matches
  var msg = 'Found ' + myArray[0] + '. ';
  msg += 'Next match starts at ' + myRegExp.lastIndex;
  console.log(msg);
}
//Found fee . Next match starts at 4
//Found fi . Next match starts at 7
//Found fo . Next match starts at 10

/* Parenthesized Substring Matches */
const re = /(foo) (bar) \1 \2/;
const str3 = 'foo bar foo bar some more stuff';
const isMatch = re.test(str3);
console.log('isMatch: ' + isMatch);            //isMatch: true
const match   = re.exec(str3);
console.log('value: ' + match[0]);             //value:foo bar foo bar
console.log('Parenthesis Substrings: ' + match[1] + ', ' + match[2]);  //Parenthesis Substrings: foo, bar
