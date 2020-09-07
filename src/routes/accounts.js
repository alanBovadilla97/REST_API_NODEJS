const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/',(req,res)=>{
    const query =`SELECT name,description,balance 
                  FROM accounts 
                  INNER JOIN customers ON accounts.customerID = customers.customerID
                  INNER JOIN accountTypes ON accounts.accountType = accountTypes.accountTypeID`;
                    
    mysqlConnection.query(query,(err,rows,fields)=>{
        !err ? res.json(rows) : console.log("Error retrieving the data:"+err);
    });
});

router.get('/:id',(req,res)=>{
    const { id } = req.params;
    mysqlConnection.query('SELECT accountID,balance,description,name FROM accounts INNER JOIN accountTypes ON accounts.accountType = accountTypes.accountTypeID INNER JOIN customers ON accounts.customerID = customers.customerID WHERE accountID = ?',[id],(err,rows)=>{
        !err ? res.json(rows[0]) : console.log("Error retrieving the data:"+err);
    })
})

router.put('/withdraw',(req,res)=>{

    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }

    const {id,amount} = req.body;

    mysqlConnection.query('CALL withdraw(?,?)',[id,amount],(err,rows)=>{
        !err ? res.json({Description:'Withdrawal succesful',Data:rows}) : console.log("Error withdrawing money from account:"+err);
    })
})

router.put('/deposit',(req,res)=>{

    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }

    const {id,amount} = req.body;

    mysqlConnection.query('UPDATE accounts SET balance=balance + ? WHERE accountID=?',[amount,id],(err,rows)=>{
        !err ? res.json({Description:'Deposit succesful',Data:rows}) : console.log('Error withdrawing money from account:'+err);
    })
})

router.put('/transfer',(req,res)=>{

    const { originID, destinationID, amount } = req.body;
 
    mysqlConnection.query('CALL transfer(?,?,?)',[originID,destinationID,amount],(err,rows)=>{
        !err ? res.json({Description:'Transfer succesful',Data:rows}) : console.log('Error transfering money from account:'+err);
    })
})


module.exports = router; 