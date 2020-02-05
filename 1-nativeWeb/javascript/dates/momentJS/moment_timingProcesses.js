/* enlorging on timingProcesses to investigate moment.js */

var moment = require('moment'); 	// moment.js

//EMCA5 timing fn 
var start = Date.now();	 					//start time (number ms)

console.log('start: ' + start);

//process running

var stop = Date.now();						//stop time (number ms)
console.log('end: ' + stop);

var duration = stop - start;			//duration (number ms)
console.log('process duration(ms): ' + duration); 
console.log('process duration(sec): ' + duration/1000); 


// =============================================================================
// native method
var date = new Date(duration);
var hr = date.getHours();
var min = date.getMinutes();
var sec = date.getSeconds();
var ms = date.getMilliseconds();
var dateFormatted = hr  
										+ ':' + strPadLeft(min,'0',2) 
										+ ':' + strPadLeft(sec,'0',2) 
										+ '.' + strPadLeft(ms,'00',3);
console.log('process duration(hr:min:sec.ms): ' + dateFormatted);

//lpad function
function strPadLeft(string,pad,length) {
    return (new Array(length+1).join(pad)+string).slice(-length);
};

//moment.js version
var mm = moment.duration(date);   //pass in time in ms
console.log(mm.hours() + ':' + mm.minutes() + ':' + mm.seconds() + '.' + mm.milliseconds());


// =============================================================================


//=============================================================================
// moment.duration function

// var mm = moment.duration(37250000);   //pass in time in ms
// console.log(mm.hours() + ':' + mm.minutes() + ':' + mm.seconds());

//output: 10:20:50

//=============================================================================
