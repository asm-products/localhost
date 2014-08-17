var Promise = require('promise');

module.exports = function (app, callback) {
  // seed the database for tests
  var seed = [];

  // categories
  var categories = [{ name: 'Sightseeing', active: true }, { name: 'Nightlife', active: true }];
  seed.push(app.models.category.create(categories));

  // cities
  var cities = [{ name: 'San Francisco', country: 'USA', active: true }, { name: 'Barcelona', country: 'Spain', active: true }];
  seed.push(app.models.city.create(cities));

  // return all inserts
  Promise.all(seed).then(function () {
    callback();
  }, function (err) {
    callback(err);
  });
};
