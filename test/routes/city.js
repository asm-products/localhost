var assert = require('assert');

module.exports = function (app, helpers) {
  return {
    'City route': {
      '- getting list': {
        topic: function () {
          helpers.get('/cities', this.callback)
        },
        'should return status 200': helpers.isStatus(200),
        'should display a list of cities': function (err, res, body) {
          assert.lengthOf(body, 2);
          assert.isString(body[0]._id);
          assert.isString(body[0].name);
          assert.isString(body[0].country);
        },
        'should not display shielded attributes': function (err, res, body) {
          assert.isUndefined(body[0].__v);
          assert.isUndefined(body[0].active);
        },
        'should only display active cities': function (err, res, body) {
          body.forEach(function (category) {
            assert.notEqual(category.name, 'New York');
          });
        }
      }
    }
  };
};
