module.exports = function (app) {
  // connect to url from config
  app.db.connect(app.get('db'));

  // display connection errors
  app.db.connection.on('error', function (err) {
    console.error('Error while connecting to Mongo:', err);
  });
};
