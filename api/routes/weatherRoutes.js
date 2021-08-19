'use strict';
module.exports = function(app) {
  var zipcodes_controller = require('../controllers/weatherController');

  app.route('/get_coords/:zipcode')
    .get(zipcodes_controller.get_coords);

  app.route('/get_weather/:zipcode')
    .get(zipcodes_controller.get_weather);

};
