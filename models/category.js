module.exports = function (app) {
  // setup category schema
  var categorySchema = app.db.Schema({
    name: { type: String, required: true },
    active: { type: Boolean, default: false }
  });

  // return the model
  return app.db.model('Category', categorySchema);
};
