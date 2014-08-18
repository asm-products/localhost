module.exports = function (app) {
  var userSchema = app.db.Schema({
    created:      { type: Date, default: Date.now },
    name:         { type: String, required: true },
    displayName:  { type: String, required: true },
    email:        { type: String },
    facebookId:   { type: String, required: true },
    cities:       [{ type: app.db.Schema.Types.ObjectId, ref: 'City' }]
  });

  return app.db.model('User', userSchema);
};
