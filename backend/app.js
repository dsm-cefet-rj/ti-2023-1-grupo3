const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

const professionalsRouter = require('./routes/professionals');
const usersRouter = require('./routes/users');

const config = require('./config');

const mongoose = require('mongoose');

const url =  config.mongoUrl;
const connect = mongoose.connect(url);

connect.then(() => {
  console.log("Connected correctly to server");
}, (err) => { console.log(err); });

const app = express();

app.use(session({
  secret: config.secretKey,
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/professionals', professionalsRouter);

module.exports = app;