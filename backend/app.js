var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var professionalsRouter = require('./routes/professionals');
var usersRouter = require('./routes/users');

var config = require('./config');

const mongoose = require('mongoose');

const url =  config.mongoUrl;
const connect = mongoose.connect(url);

connect.then(() => {
  console.log("Connected correctly to server");
}, (err) => { console.log(err); });

var app = express();

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/professionals', professionalsRouter);
app.use('/users', usersRouter);

module.exports = app;