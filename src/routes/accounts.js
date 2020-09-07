const express = require('express');
const router = express.Router();

//Obtain the connection here to perform the queries
const mysqlConnection = require('../database');
let query;

/*The first parameter of HTTP methods is the path where they are going
to be accessed. Then a function where we'll perform the DB queries
and return the obtained data*/ 
router.get('/',(req,res)=>{
        query =`SELECT name,description,balance 
                  FROM accounts
                  INNER JOIN customers ON accounts.customerID = customers.customerID
                  INNER JOIN accountTypes ON accounts.accountType = accountTypes.accountTypeID`;
                    
    mysqlConnection.query(query,(err,rows)=>{
        !err ? res.json(rows) : console.log("Error retrieving the data:"+err);
    });
});


router.get('/:id',(req,res)=>{
    const { id } = req.params;
    query=`SELECT accountID,balance,description,name 
           FROM accounts 
           INNER JOIN accountTypes ON accounts.accountType = accountTypes.accountTypeID 
           INNER JOIN customers ON accounts.customerID = customers.customerID 
           WHERE accountID = ?`;
    mysqlConnection.query(query,[id],(err,rows)=>{
        !err ? res.json(rows[0]) : console.log("Error retrieving the data:"+err);
    })
})

router.put('/withdraw',(req,res)=>{

    checkBodyData(req);
    const {id,amount} = req.body;

    mysqlConnection.query('CALL withdraw(?,?)',[id,amount],(err,rows)=>{
        !err ? res.json({Description:'Withdrawal succesful',Data:rows}) : console.log("Error withdrawing money from account:"+err);
    })
})

router.put('/deposit',(req,res)=>{

    checkBodyData(req);
    const {id,amount} = req.body;
    query=`UPDATE accounts 
           SET balance=balance + ? 
           WHERE accountID=?`;

    mysqlConnection.query(query,[amount,id],(err,rows)=>{
        !err ? res.json({Description:'Deposit succesful',Data:rows}) : console.log('Error depositing money to account:'+err);
    })
})

router.put('/transfer',(req,res)=>{

    checkBodyData(req);
    const { originID, destinationID, amount } = req.body;
 
    mysqlConnection.query('CALL transfer(?,?,?)',[originID,destinationID,amount],(err,rows)=>{
        !err ? res.json({Description:'Transfer succesful',Data:rows}) : console.log('Error transfering money from account:'+err);
    })
})

router.put('/monthlyInterest/:id',(req,res)=>{

    const { id } = req.params;
 
    mysqlConnection.query('CALL interest(?)',[id],(err,rows)=>{
        !err ? res.json({Description:'Calculating interest succesful',Data:rows}) : console.log('Error calculating monthly interest:'+err);
    })
})

//Function to check if the body parameters are not empty. If so, returns an error message
checkBodyData=(req)=>{
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
}


module.exports = router; 