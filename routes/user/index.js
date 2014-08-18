module.exports = function (app) {
  require('./auth')(app);
  require('./view')(app);
};
