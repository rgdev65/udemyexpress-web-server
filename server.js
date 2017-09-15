const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app=express();
const port = process.env.PORT || 3000; //to provide server port dynamicaaly by HEROKU.

app.set('view engine','hbs');


app.use((req,res,next) => {
var now = new Date().toString();
var log = `${now}: ${req.method} ${req.url}`
fs.appendFile('server-log',log + '\n', (err)=>{
  if(err){ console.log('Error while writing logs');}
});
next();
});
app.use((req,res,next)=>{
  res.render('magnet.hbs');
});
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});
app.get('/',(req,res)=>{
  // res.send('<h1>Hello express!<h1>');
  res.render('home.hbs',{
    pageTitle:'Home Page',
    message:'Welcome to Express'
  });
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About Page',
  });
});

app.get('/bad',(req,res) =>{
  res.send({
    errorMessage:404,
  });
});

app.listen(port,()=>{
  console.log(`We are live on port:${port}`);
});
