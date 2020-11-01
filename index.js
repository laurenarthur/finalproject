var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const port = process.env.PORT || 3000;
app.set('view engine','ejs');
app.get('/',function(req,res){
    res.send('Hello, this will be our project.')
});

app.listen(port,function(){
    console.log('Using port: '+ port);
});