module.exports = function (app) {
  // load config variables into app
  app.set('env', process.env.NODE_ENV || 'development'); // app environment
  app.set('port', process.env.PORT || 3000); // port to run on

  app.set ('db', process.env.MONGOHQ_URL || process.env.DB_URL || 'mongodb://localhost/localhost'); // database url
};
