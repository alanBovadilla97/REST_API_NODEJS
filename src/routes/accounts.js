const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/',(req,res)=>{
    mysqlConnection.query('SELECT * FROM customers',(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log("Error retrieving the data:"+err);
        }
    });
});

router.get('/:id',(req,res)=>{
    const { id } = req.params;
    mysqlConnection.query('SELECT accountID,balance,description,name FROM accounts INNER JOIN accountTypes ON accounts.accountType = accountTypes.accountTypeID INNER JOIN customers ON accounts.customerID = customers.customerID WHERE accountID = ?',[id],(err,rows)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    })
})

router.put('/withdraw',(req,res)=>{

    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    const id = req.body.id;
    const amount = req.body.amount;
    const accounType = req.body.accountType;
    const customerID = req.body.customerID;
    //const {id,amount,accounType,customerID} = req.body;

    mysqlConnection.query('UPDATE accounts SET accountID=?,balance=balance - ?,accountType=?,customerID=? WHERE accountID=1',[id,amount,accounType,customerID],(err,rows)=>{
        if(!err){
            res.json({Description:'Withdrawal succesful',Data:rows});
        }else{
            console.log('Error withdrawing money from account:'+err);
        }
    })
})



module.exports = router; 