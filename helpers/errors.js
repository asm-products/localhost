module.exports = function (app) {
  app.errors = {};

  // catch unhandled requests
  app.use(function (req, res, next) {
    app.errors.notfound(res);
  });

  // print 404
  app.errors.notfound = function (res) {
    res.status(404);
    return res.json({ message: 'Not found' });
  }

  // not authenticated
  app.errors.auth = function (res) {
    res.status(403);
    return res.json({ message: 'Access denied' });
  }

  // server errors
  // development env
  if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        console.error(err.message, err);

        res.status(err.status || 500);
        return res.json({ message: err.message, error: err });
    });
  }

  // production env
  app.use(function (err, req, res, next) {
      console.error(err.message, err);

      res.status(err.status || 500);
      return res.json({ message: 'An error occured', error: true });
  });
};
