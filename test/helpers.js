var assert = require('assert'),
    request = require('request');

// test helper functions
module.exports = {
  // get url
  get: function (url, callback) {
    request.get('http://localhost:3001' + url, { json: true }, callback);
  },

  // check http status
  isStatus: function (status) {
    return function (err, res) {
      assert.isNull(err);
      assert.equal(res.statusCode, status);
    };
  }
};
