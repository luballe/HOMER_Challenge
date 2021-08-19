'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Zips_Coords_Schema = new Schema({
  zipcode: {
    type: String
  },
  lat: {
    type: Number
  },
  lon: {
    type: Number
  }
});

module.exports = mongoose.model('zips_coords', Zips_Coords_Schema);
