module.exports = function (app) {
  app.get('/user', app.auth.user, function (req, res, next) {
    app.models.user.findById(req.user.id).populate('cities').lean().exec(function (err, user) {
      if (err) return next(err);

      app.helpers.shield(user, ['__v', 'facebookId']);
      app.helpers.shieldEach(user.cities, ['__v', 'active']);

      res.json(user);
    });
  });
};
