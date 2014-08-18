var assert = require('assert');

module.exports = function (app) {
  return {
    'City model': {
      '- after the application has loaded': {
        topic: app.models.city,
        'should be loaded': function (model) {
          assert.isNotNull(model);
        }
      },
      '- saving': {
        topic: function () {
          var city = new app.models.city({ name: 'New York', country: 'USA' });
          city.save(this.callback);
        },
        'should not return error': function (err, city) {
          assert.isNull(err);
        },
        'should return city': function (err, city) {
          assert.isNotNull(city.id);
          assert.equal(city.name, 'New York');
          assert.equal(city.country, 'USA');
        },
        'should default active to false': function (err, city) {
          assert.isFalse(city.active);
        }
      },
      '- saving without a name or country': {
        topic: function () {
          var city = new app.models.city({});
          city.save(this.callback);
        },
        'should return validation error': function (err, city) {
          assert.equal(err.name, 'ValidationError');
          assert.equal(err.errors.name.type, 'required');
          assert.equal(err.errors.country.type, 'required');
        },
        'should not return city': function (err, city) {
          assert.isUndefined(city);
        }
      }
    }
  };
};
