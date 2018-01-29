var mysql = require('mysql');
var connection = mysql.createConnection({ host:'localhost', user:'root', password:'friday', database:'test' });

//connect.. if omit, .query() method will implicitly open a connection
//connection.connect();               //quick prototype
connection.connect(function(err) {    //full prod
  if (err) {
    console.error('error connecting: ' + err);                  //connection error
    console.error('error connecting: ' + err.stack);            //connection error, plus stack
    process.exitCode = 1;
    throw new Error("AppError: connection attempt failed");     //controlled exit (rather than process.exit(1)
  }
  console.log('connected as id ' + connection.threadId);        //connection success
});

connection.query('SELECT * FROM DEPARTMENT'
  ,function (err, rows, fields) {
    if (err) {
      console.log(err);
      throw err;
    }

    console.log(rows);                      //array of all row obj
    //console.log('Row 1 is: ', rows[0]);   //single row obj
    //console.log('Row 2 is: ', rows[1]);
    //console.log(fields);
  } );

//connection.end();                 //quick prototype
connection.end(function(err) {      //full prod
  if (err) {
    console.log(err);
    throw err;
  }
  console.log('connection terminated' );
});