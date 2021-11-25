/* native formatting */
var date = new Date();
var hr  = date.getHours();
var min = date.getMinutes();
var sec = date.getSeconds();
var ms  = date.getMilliseconds();
var dateFormatted = hr 
                    + ':' + String(min).padStart(2,'0') 
                    + ':' + String(sec).padStart(2,'0') 
                    + '.' + String(ms).padStart(3,'0');
console.log('Executeion time (hr:min:sec.ms): ' + dateFormatted);
