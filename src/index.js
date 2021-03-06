const express = require('express');
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

//Middleware
app.use(express.json());

//Routes
app.use(require('./routes/accounts'));

app.listen(app.get('port'), ()=>{
    console.log("Server listening on port "+app.get('port'));
})