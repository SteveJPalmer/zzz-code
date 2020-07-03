/* Node.js console.time */
console.log('Node.js console.time');
console.time('loop-100');
for (var i = 0; i < 1000000; i++) {
  null;
}
console.timeEnd('loop-100');  // prints loop-100: 0.7ms


//=============================================================================
/* ES5 timing fn */
var start = Date.now();	 					//start time (number ms)
console.log('start: ' + start);
//just to slow it down a bit (taking 0)
for (var i = 0; i < 1000000; i++) {
  null;
}
//process running
var stop = Date.now();						//stop time (number ms)
console.log('end: ' + stop);

var duration = stop - start;			//duration (number ms)
console.log('process duration(ms): ' + duration);
console.log('process duration(sec): ' + duration/1000);


//=============================================================================
/* native formatting */
var date = new Date(duration);
var hr  = date.getHours();
var min = date.getMinutes();
var sec = date.getSeconds();
var ms  = date.getMilliseconds();
var dateFormatted = hr
					+ ':' + strPadLeft(min,'0',2)
					+ ':' + strPadLeft(sec,'0',2)
					+ '.' + strPadLeft(ms,'00',3);
console.log('process duration(hr:min:sec.ms): ' + dateFormatted);

//lpad function
function strPadLeft(string,pad,length) {
    return (new Array(length+1).join(pad)+string).slice(-length);
};


//=============================================================================
/* moment formatting - npm install moment */
var moment = require('moment'); 	//moment.js

//moment.js version
var mm = moment.duration(duration);   //pass in time in ms
console.log(mm.hours() + ':' + mm.minutes() + ':' + mm.seconds() + '.' + mm.milliseconds());
