var fs = require('fs');

module.exports = function (app) {
  // load all models from models folder
  // container for all models
  app.models = {};
  
  var files = fs.readdirSync('./models');

  files.forEach(function (file) {
    // skip non .js files
    if (file.substr(-3) != '.js')
      return;

    // save model to container
    app.models[file.slice(0, -3)] = require('../models/' + file)(app);
  });
};
