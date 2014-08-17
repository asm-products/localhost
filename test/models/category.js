var assert = require('assert');

module.exports = function (app) {
  return {
    'Category model': {
      '- after the application has loaded': {
        topic: app.models.category,
        'should be loaded': function (model) {
          assert.isNotNull(model);
        }
      },
      '- saving': {
        topic: function () {
          var category = new app.models.category({ name: 'Restaurants' });
          category.save(this.callback);
        },
        'should not return error': function (err, category) {
          assert.isNull(err);
        },
        'should return category': function (err, category) {
          assert.isNotNull(category.id);
          assert.equal(category.name, 'Restaurants');
        },
        'should default active to false': function (err, category) {
          assert.isFalse(category.active);
        }
      },
      '- saving without a name': {
        topic: function () {
          var category = new app.models.category({});
          category.save(this.callback);
        },
        'should return validation error': function (err, category) {
          assert.equal(err.name, 'ValidationError');
          assert.equal(err.errors.name.type, 'required');
        },
        'shoud not return category': function (err, category) {
          assert.isUndefined(category);
        }
      }
    }
  };
};
