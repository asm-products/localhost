module.exports = function (app) {
  app.helpers = {};

  // credits to @pksunkara for most of this

  // only allow supplied params
  app.helpers.permit = function (req, fields) {
    req.oldBody = req.body;
    req.body = {};

    fields.forEach(function (field) {
      if (req.oldBody[field]) {
        req.body[field] = req.oldBody[field];
      }
    });
  };

  // get rid of supplied params
  app.helpers.shield = function (body, fields) {
    fields.forEach(function (field) {
      if (body[field] !== undefined) delete body[field];
    });
  };

  app.helpers.shieldEach = function (objects, fields) {
    objects.forEach(function (i) {
      app.helpers.shield(i, fields);
    });
  };
};
