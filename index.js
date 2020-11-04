//express
var express = require('express');

//fetch
var bodyParser = require('body-parser');

//call express
var app = express();

//port information
const port = process.env.PORT || 3000;

//use EJS for templates 
app.set('view engine','ejs');

//home page
app.get('/',function(req,res){
    res.render('index');
});

//contact page 
app.get('/contact',function(req,res){
    res.render('contact');
});

//movie api page
app.get('/Movie', function(req,res){
    res.render('Movie');
});

//tv-show api page
app.get('/TV', function(req,res){
    res.render('TV');
});

app.listen(port,function(){
    console.log('Using port: '+ port);
});