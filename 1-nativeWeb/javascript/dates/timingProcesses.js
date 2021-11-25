/* Node.js console.time */
console.info('Node.js console.time');
console.time('loop-100');
for (var i = 0; i < 1000000; i++) {
  null;
}
console.timeEnd('loop-100');  // prints loop-100: 0.7ms


//=============================================================================
/* ES5 timing fn */
console.info('JS - Date.now()');
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
