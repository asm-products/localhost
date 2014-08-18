var assert = require('assert');

module.exports = function (app) {
  return {
    'User model': {
      '- after the application has loaded': {
        topic: app.models.user,
        'should be loaded': function (model) {
          assert.isNotNull(model);
        }
      },
      '- saving': {
        topic: function () {
          var user = new app.models.user({
            name: 'John Doe',
            displayName: 'John',
            email: 'john.doe@localhost.local',
            facebookId: '123456789'
          });

          user.save(this.callback);
        },
        'should not return error': function (err, user) {
          assert.isNull(err);
        },
        'should return user': function (err, user) {
          assert.isNotNull(user.id);
          assert.isTrue(user.created instanceof Date);
          assert.equal(user.name, 'John Doe');
          assert.equal(user.displayName, 'John');
          assert.equal(user.email, 'john.doe@localhost.local');
          assert.equal(user.facebookId, '123456789');
          assert.isArray(user.cities);
        }
      },
      '- saving without valid attributes': {
        topic: function () {
          var user = new app.models.user({});
          user.save(this.callback);
        },
        'should return validation error': function (err, user) {
          assert.equal(err.name, 'ValidationError');
          assert.equal(err.errors.name.type, 'required');
          assert.equal(err.errors.displayName.type, 'required');
          assert.equal(err.errors.facebookId.type, 'required');
        },
        'should not return user': function (err, user) {
          assert.isUndefined(user);
        }
      }
    }
  };
};
