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
//home page
app.get('/',function(req,res){
    res.render('index');
});

//contact page 
app.get('/contact',function(req,res){
    res.render('contact');
});

//POST route from contact form 
app.post('/contact', (req, res)=> {
    //intall the SMTP server
    const smtpTrans = nodemailer.createTransport({
        service: 'Gmail',
        auth:{
            user: 'lauern.arthur123@gmail.com',
            pass: 'lpa12321'
        }
    })
    //specify what the email will look like
    const mailOpts={
        from: "lauern.arthur123@gmail.com", 
        to: 'lauern.arthur123@gmail.com',
        subject: 'New message from contact form at movieguru',
        text: '&{req.body.email} says: ${req.body.message}'
    }

    smtpTrans.sendMail(mailOpts, function (err, res) {
        if(err){
            console.error('there was an error: ', err);
        }
        else{
            console.log('here is the res: ', res);
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