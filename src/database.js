const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'bank'
});

mysqlConnection.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('Connection succesful to database');
    }
});

module.exports = mysqlConnection;