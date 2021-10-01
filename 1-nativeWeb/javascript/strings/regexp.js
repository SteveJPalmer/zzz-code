/*****************
 * RegExp object *
 *****************/

 /* A) determine if pattern exists within string */

/* RegExp.test() */
var patt1 = new RegExp("e");
console.info(patt1.test("The best things in life are free"));     // true

/* String.search() */
var str5="Is this all there is?";
var patt5=/all/i;                      //caSe insensitive
var result5 = str5.search(patt5);
console.log('match: ' + result5);      //8      (position of match)
var result6 = str5.search(/rubbish/i);
console.log('match: ' + result6);      //-1     (no match)



/* B) determine & return matches */

/* RegExp.exec() */
console.info(/e/.exec("The best things in life…"));  			        // [ 'e', index: 2, input: 'The best things in life…' ]
console.info(patt1.exec("The best things in life are free")); 	  // [ 'e', index: 2, input: 'The best things in life are free' ]
console.info(patt1.exec("The best things in life are free")[0]); 	// e
//(remember exec() returns array with value as index [0], substring matches as index [1],[2]..)


/* String.match() */
var str3="Is this all there is?";
var patt3=/is/i;                      //caSe insensitive - stops after first match
var match3 = str3.match(patt3);
console.log('match: ' + match3);      //Is

var str4="Is this all there is?";
var patt4=/is/ig;                     //Global(return ALL) & Case insensitive
var match4 = str4.match(patt4);
console.log('match: ' + match4);      //[ Is,is,is ]
console.log('match: ' + match4[0]);   //Is






//iterative loop
const myRegExp = /\w+\s/g;								                //matches one or more chars followed by a space
const myStr = 'fee fi fo fum';
var myArray;
while ((myArray = myRegExp.exec(myStr)) !== null) {       //returns null if no further matches
  var msg = 'Found ' + myArray[0] + '. ';
  msg += 'Next match starts at ' + myRegExp.lastIndex;
  console.log(msg);
}
//Found fee . Next match starts at 4
//Found fi . Next match starts at 7
//Found fo . Next match starts at 10


/* Parenthesized Substring Matches */
const re = /(foo) (bar) \1 \2/;
const str = 'foo bar foo bar some more stuff';
const isMatch = re.test(str);
const match   = re.exec(str);
console.info('isMatch: ' + isMatch);            //isMatch: true
console.info('value: ' + match[0]);             //value:foo bar foo bar
console.info('Parenthesis Substrings: ' + match[1] + ', ' + match[2]);  //Parenthesis Substrings: foo, bar

const re2 = /(\w+)\s(\w+)/ig;
const str2   = 'John Smith';
const subst = '$2, $1 is formal name. Matched: $&';
const result = str2.replace(re2, subst);
console.info('result: ', result);  //result:  Smith, John is formal name. Matched: John Smith

