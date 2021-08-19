var express = require('express'),
  app = express(),
  port = process.env.PORT || 8080,
  mongoose = require('mongoose'),
  Weather = require('./api/models/weatherModel'), //created model loading here
  bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/weather'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/weatherRoutes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('weather RESTful API server started on: ' + port);
