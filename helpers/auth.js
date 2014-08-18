var passport = require('passport'),
    passportFacebookStrategy = require('passport-facebook').Strategy;

module.exports = function (app) {
  // make app use passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

  // (de)serializing session data
  passport.serializeUser(function (user, done) {
    done(null, { id: user.id });
  });

  passport.deserializeUser(function (user, done) {
    app.models.user.findById(user.id, function (err, user) {
      done(err, user);
    });
  });

  // setup facebook auth
  passport.use(new passportFacebookStrategy({
      clientID: app.get('facebook_app_id'),
      clientSecret: app.get('facebook_app_secret'),
      callbackURL: app.get('base_url') + '/user/auth/callback',
      enableProof: true,
    },
    function (accessToken, refreshToken, profile, done) {
      app.models.user.findOne({ facebookId: profile.id }, function (err, user) {
        if (err) return done(err);

        if (user) {
          // existing user
          return done(null, user);
        } else
        {
          var email = false;

          if (profile.emails !== undefined && profile.emails.length > 0)
            email = profile.emails[0].value;

          // user needs to be created
          var user = new app.models.user({
            name:         profile.displayName,
            displayName:  profile.name.givenName,
            facebookId:   profile.id
          });

          if (email)
            user.email = email;

          user.save(function (err, user) {
            if (err) return done(err);

            return done(null, user);
          });
        }
      });
    }
  ));

  app.auth = {
    user: function (req, res, next) {
      if (req.isAuthenticated()) { return next(); }

      return app.errors.auth(res);
    }
  };
};
