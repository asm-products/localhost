var express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
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

// initialize express parsers and session handler
app.use(bodyParser());
app.use(cookieParser());
app.use(session({
  secret: app.get('session_secret'),
  store: new MongoStore({
    url: app.get('db')
  }),
  resave: true,
  saveUninitialized: true
}));

// initialize logger
require('./helpers/logger')(app);

// initialize auth
require('./helpers/auth')(app);

// include param helpers
require('./helpers/params')(app);

// include app routes
require('./routes/user')(app);
require('./routes/categories')(app);
require('./routes/cities')(app);

// include error helper
require('./helpers/errors')(app);


module.exports = app;
