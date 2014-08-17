var assert = require('assert'),
    vows = require('vows');

// override env settings
process.env.NODE_ENV = 'test';
process.env.PORT = 3001;
process.env.DB_URL = 'mongodb://localhost/localhost_test';

var app = require('../app'),
    helpers = require('./helpers'),
    seed = require('./seed');

vows.describe('localhost').addBatch({
  'Server': {
    topic: function () {
      app.listen(app.get('port'), this.callback);
    },
    'should be running': function (server) {
      assert.isNotNull(server);
    }
  }
})
.addBatch({
  'Database': {
    topic: function () {
      app.db.connection.once('open', this.callback);
    },
    'should be connected': function () {
      assert.equal(app.db.connection.readyState, 1);
    },
    'seeding': {
      topic: function () {
        seed(app, this.callback);
      },
      'should not return an error': function (err) {
        assert.isUndefined(err);
      },
      'should have inserted': {
        topic: function () {
          app.models.category.find({}, this.callback);
        },
        '2 categories': function (err, categories) {
          assert.lengthOf(categories, 2);
        }
      }
    }
  }
})
.addBatch(require('./models/category')(app, helpers))
.addBatch(require('./models/city')(app, helpers))
.addBatch(require('./routes/category')(app, helpers))
.addBatch(require('./routes/city')(app, helpers))
.addBatch({
  'Database': {
    topic: function () {
      app.db.connection.db.dropDatabase();
      app.models.category.find({}, this.callback);
    },
    'should be emptied': function (err, results) {
      assert.isEmpty(results);
    }
  }
})
.export(module);
