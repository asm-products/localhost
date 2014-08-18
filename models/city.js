module.exports = function (app) {
  // setup city schema
  var citySchema = app.db.Schema({
    name:     { type: String, required: true },
    country:  { type: String, required: true },
    active:   { type: Boolean, default: false }
  });

  // return the model
  return app.db.model('City', citySchema);
};
