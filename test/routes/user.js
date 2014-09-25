var assert = require('assert'),
    passportStub = require('passport-stub');

module.exports = function (app, helpers) {
  return {
    'User route': {
      '- getting user': {
        'when authenticated': {
          topic: function() {
            passportStub.login({ id: "540106ab3729a30000432bbe" });
            helpers.get('/user', this.callback);
          },
          'should return status 200': helpers.isStatus(200),
          'should show the correct user': function(err, res, body) {
            assert.equal(body.displayName, 'Arthur');
            assert.equal(body._id, '540106ab3729a30000432bbe');
          },
          'when not authenticated': {
            topic: function() {
              passportStub.logout();
              helpers.get('/user', this.callback);
            },
            'should return status 403': helpers.isStatus(403)
          }
        }
      }
    }
  };
};
