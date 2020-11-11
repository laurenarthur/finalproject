//express
var express = require('express');

//parser
var bodyParser = require('body-parser');

//fetch
var fetch = require('node-fetch');

//call express
var app = express();

//port information
const port = process.env.PORT || 3000;

//use EJS for templates 
app.set('view engine','ejs');

//make styles public
app.use(express.static("public"));

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
    //var result = null;
    fetch('https://api.themoviedb.org/3/search/movie?api_key=2cb9d256f4796cfd3b7c89a3324b4356&language=en-US&query=big&page=1&include_adult=false')
    .then(res => res.json())
    .then(result => {
        res.render('nasa',{result:result});
    });
});

app.get('/searchMovie', function(req,res){
    //var search = req.body.movieSearch;
    fetch('https://api.themoviedb.org/3/search/movie?api_key=2cb9d256f4796cfd3b7c89a3324b4356&language=en-US&query=big&page=1&include_adult=false')
    .then(res => res.json())
    .then(result => {
        res.render('nasa',{result:result});
    });
});

//tv-show api page
app.get('/TV', function(req,res){
    //need to fetch the query that they searched 
    
    res.render('TV');
});

app.listen(port,function(){
    console.log('Using port: '+ port);
});

//API Key: 2cb9d256f4796cfd3b7c89a3324b4356

//https://api.themoviedb.org/3/search/movie?api_key=2cb9d256f4796cfd3b7c89a3324b4356&language=en-US&query=big&page=1&include_adult=false