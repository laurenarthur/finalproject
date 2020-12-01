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

//nodemailer
const nodemailer = require('nodemailer');

//make styles public
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
var search = "";
var searchtv = "";
var sent = false;
//home page
app.get('/',function(req,res){
    res.render('index');
});

//contact page 
app.get('/contact',function(req,res){
    res.render('contact', {sent:sent});
});

//POST route from contact form 
app.post('/contacts', (req, res)=> {
    //intall the SMTP server
    const smtpTrans = nodemailer.createTransport({
        service: 'Gmail',
        auth:{
            user: 'serversidemail2020@gmail.com', //I created this email for this project specifically, still not getting anything
            pass: 'webdev2020'
        },
        tls: {
            rejectUnauthorized: false
        }
    })
    var user = req.body.email;
    var message = req.body.message;
    //specify what the email will look like
    const mailOpts={
        from: user, 
        to: 'serversidemail2020@gmail.com',
        subject: 'New message from contact form at movieguru',
        text: user + ' says:' +message
    }

    smtpTrans.sendMail(mailOpts, function (err, res) {
        if(err){
            console.error('there was an error: ', err);
        }
        else{
            console.log('here is the res: ', res);
            sent = true;
            res.redirect('/contact');
        }
    })
    
})


//movie api page
app.get('/Movie', function(req,res){
    if(search != ""){
    fetch('https://api.themoviedb.org/3/search/movie?api_key=2cb9d256f4796cfd3b7c89a3324b4356&language=en-US&query='+search+'&page=1&include_adult=false')
    .then(res => res.json())
    .then(data => {
        result = data.results;
        console.log(result);
        console.log(search);
        res.render('Movie',{result:result, search:search});
    });
}
else{
    res.render('Movie',{search:search});
}
});

app.post('/searchMovie', function(req,res){
    search = req.body.movieSearch;
    res.redirect('/Movie');
});

//tv-show api page
app.get('/TV', function(req,res){
    fetch('https://api.themoviedb.org/3/search/tv?api_key=2cb9d256f4796cfd3b7c89a3324b4356&language=en-US&query='+searchtv+'&page=1&include_adult=false')
    .then(res => res.json())
    .then(data => {
        result = data.results;
        console.log(result);
        console.log(searchtv);
        res.render('TV',{result:result, searchtv:searchtv});
    });
});

app.post('/TVsearch', function(req,res){
   searchtv = req.body.TVsearch;
    res.redirect('/TV');
});

app.listen(port,function(){
    console.log('Using port: '+ port);
});

//API Key: 2cb9d256f4796cfd3b7c89a3324b4356

//https://api.themoviedb.org/3/search/movie?api_key=2cb9d256f4796cfd3b7c89a3324b4356&language=en-US&query=big&page=1&include_adult=false