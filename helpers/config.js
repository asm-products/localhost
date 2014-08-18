module.exports = function (app) {
  // load config variables into app
  app.set('env', process.env.NODE_ENV || 'development'); // app environment
  app.set('port', process.env.PORT || 3000); // port to run on
  app.set('base_url', process.env.BASE_URL || 'http://localhost:' + app.get('port')); // api base url

  app.set ('db', process.env.MONGOHQ_URL || process.env.DB_URL || 'mongodb://localhost/localhost'); // database url

  app.set('session_secret', process.env.SESSION_SECRET || 'l0c@lh0$t'); // session secret

  app.set('facebook_app_id', process.env.FACEBOOK_APP_ID || 'fb_app_id'); // app id from facebook for auth
  app.set('facebook_app_secret', process.env.FACEBOOK_APP_SECRET || 'fb_app_secret'); // app secret from facebook for auth
};
