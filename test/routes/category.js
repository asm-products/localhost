var assert = require('assert');

module.exports = function (app, helpers) {
  return {
    'Category route': {
      '- getting list': {
        topic: function () {
          helpers.get('/categories', this.callback)
        },
        'should return status 200': helpers.isStatus(200),
        'should display a list of categories': function (err, res, body) {
          assert.lengthOf(body, 2);
          assert.isString(body[0]._id);
          assert.isString(body[0].name);
        },
        'should not display shielded attributes': function (err, res, body) {
          assert.isUndefined(body[0].__v);
          assert.isUndefined(body[0].active);
        },
        'should only display active categories': function (err, res, body) {
          body.forEach(function (category) {
            assert.notEqual(category.name, 'Restaurants');
          });
        }
      }
    }
  };
};
