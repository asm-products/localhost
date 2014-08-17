var express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser')
    dotenv = require('dotenv'),
    db = require('mongoose');

// initialize express
var app = express();

// load .env variables
dotenv.load();

// load config
require('./helpers/config')(app);

// connect to db
app.db = db;
require('./helpers/db')(app);

// load models
require('./helpers/models')(app);

// initialize express parsers
app.use(bodyParser());
app.use(cookieParser());

// initialize logger
require('./helpers/logger')(app);

// include helpers
require('./helpers/params')(app);

// include app routes
require('./routes/categories')(app);
require('./routes/cities')(app);

// include error helper
require('./helpers/errors')(app);


module.exports = app;
