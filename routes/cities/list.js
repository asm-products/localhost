module.exports = function (app) {
  // list all available categories
  app.get('/cities', function (req, res, next) {
    app.models.city.find({ active: true }).lean().exec(function (err, cities) {
      if (err) return next(err);

      app.helpers.shieldEach(cities, ['__v', 'active']);

      return res.json(cities);
    });
  });
};
