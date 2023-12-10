var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();

//impor router
var movies = require('./routes/movies.js');
var user = require('./routes/user.js');

app.use(morgan('tiny'));

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//use router for subroute /movie
app.use('/movies', movies);
app.use('/user', user);

app.listen(3000);