//Aplication Object
var express = require('express')
var app = express()

app.locals.title="rafi"   //local variable in 'locals' object

app.post('/', (req, res) => {
    res.send('Home page with post request');
});

app.get('/', function (req, res) {
    res.send('Hello world')
})

app.listen(3000,()=>{
    console.log("Run succesfull");
})