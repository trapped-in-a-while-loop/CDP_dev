var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')

//var index = require('./routes/index');
var inscription = require('./routes/inscription');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

//app.use('/', index);
app.use('/inscription', inscription);

module.exports = app;
