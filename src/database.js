const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'bank'
});

mysqlConnection.connect((err)=>{
    err?console.log(err):console.log('Connection succesful to database');
});

module.exports = mysqlConnection;