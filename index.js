//express
var express = require('express');

//fetch
var bodyParser = require('body-parser');

//call express
var app = express();

//port information
const port = process.env.PORT || 3000;

//ue EJS for templates 
app.set('view engine','ejs');

//get home page
app.get('/',function(req,res){
    res.send('Hello, this will be our project.')
});

app.listen(port,function(){
    console.log('Using port: '+ port);
});