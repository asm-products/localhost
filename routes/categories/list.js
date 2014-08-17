module.exports = function (app) {
  // list all available categories
  app.get('/categories', function (req, res, next) {
    app.models.category.find({ active: true }).lean().exec(function (err, categories) {
      if (err) return next(err);

      app.helpers.shieldEach(categories, ['__v', 'active']);

      return res.json(categories);
    });
  });
};
