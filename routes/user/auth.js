var passport = require('passport');

module.exports = function (app) {
  // redirect to facebook
  app.get('/user/auth', passport.authenticate('facebook', { scope: ['email'] }));

  // callback from facebook
  app.get('/user/auth/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login#failed' }));
};
