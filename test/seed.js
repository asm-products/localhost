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

  // users
  var users = [{
    name: 'Arthur Dent',
    displayName: 'Arthur',
    facebookId: 1,
    _id: "540106ab3729a30000432bbe"
  }, {
    name: 'Zaphod Beeblebrox',
    displayName: 'Zaphod',
    facebookId: 2,
    _id: "5406659c9f72d3047fff3068"
  }];
  seed.push(app.models.user.create(users));

  // return all inserts
  Promise.all(seed).then(function () {
    callback();
  }, function (err) {
    callback(err);
  });
};
