const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'bank'
});

/*Attempt to connect to database. If succesful show a success mensage.
If not show the error mesage. All in console*/
mysqlConnection.connect((err)=>{
    err?console.log(err):console.log('Connection succesful to database');
});

//Export the connection
module.exports = mysqlConnection;