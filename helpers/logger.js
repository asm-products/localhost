var log4js = require('log4js');

module.exports = function (app) {
  log4js.configure({
    appenders: [
      { type: 'console' }
    ],
    replaceConsole: true
  });

  var logger = log4js.getLogger('requests');

  if (app.get('env') != 'test')
    app.use(log4js.connectLogger(logger, { level: 'auto', format: ':method :url -> :status' }));
};
