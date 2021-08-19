'use strict';

const https = require('https');

var mongoose = require('mongoose'),
  Zips_Coords_Collection = mongoose.model('zips_coords');

exports.get_coords = function(req, res) {
  console.log(req.params);
  Zips_Coords_Collection.find({zipcode : req.params.zipcode}, function(err, coords) {
    if (err)
      res.send(err);
    console.log(coords);
    res.json(coords);
  });
};



exports.get_weather = function(req, res) {
  console.log("Looking up coodinates for zipcode: "+req.params.zipcode+"...");
  Zips_Coords_Collection.find({zipcode : req.params.zipcode}, function(err, coords) {
//    console.log(err)
//    console.log(coords)
//    console.log(coords.length)
    const kelvinToFahrenheit = kelvin => ((kelvin - 273.15) * (9/5)) + 32;
    if (coords.length==0){
      var msg="ZipCode not found!";
      console.log(msg);
      res.send({"status": msg});
    }
    else{
      console.log("Zip Code Found! Coordinates :"+coords[0].lat+','+coords[0].lon);
      console.log("Getting today's weather info...")
      https.get('https://api.openweathermap.org/data/2.5/weather?APPID=6f90027c4f6cb48c722d0285723d5c7b&lat='+coords[0].lat+'&lon='+coords[0].lon, (resp) => {
        let today_data = '';
      
        // A chunk of data has been received.
        resp.on('data', (chunk) => {
          today_data += chunk;
        });
      
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          console.log("Weather info acquired: ")
          console.log(today_data);
          //response = JSON.parse(response).weather[0];
          let geo_loc  = JSON.parse(today_data).name;
          let main_w   = JSON.parse(today_data).weather[0].main;
          let icon     = JSON.parse(today_data).weather[0].icon;
          let temp     = kelvinToFahrenheit(JSON.parse(today_data).main.temp).toFixed(2);
          let temp_min = kelvinToFahrenheit(JSON.parse(today_data).main.temp_min).toFixed(2);
          let temp_max = kelvinToFahrenheit(JSON.parse(today_data).main.temp_max).toFixed(2);
          let pressure = JSON.parse(today_data).main.pressure.toFixed(2);
          let humidity = JSON.parse(today_data).main.humidity.toFixed(2);
          //res.json(answer1);
          let response = JSON.parse('{"0":{},"1":{},"2":{},"3":{},"4":{},"5":{},"6":{}}')
          response[0].day      = "Today"
          response[0].geo_loc  = geo_loc
          response[0].main_w   = main_w
          response[0].icon     = icon
          response[0].temp     = temp
          response[0].temp_min = temp_min
          response[0].temp_max = temp_max
          response[0].pressure = pressure
          response[0].humidity = humidity
          
          // Get UV index
          //http://api.openweathermap.org/data/2.5/onecall?APPID=6f90027c4f6cb48c722d0285723d5c7b&lat=5.7143&lon=-72.9339
          console.log("Getting UV index...")
          https.get('https://api.openweathermap.org/data/2.5/onecall?APPID=6f90027c4f6cb48c722d0285723d5c7b&lat='+coords[0].lat+'&lon='+coords[0].lon, (resp) => {
            let answer2 = '';
    
            // A chunk of data has been received.
            resp.on('data', (chunk) => {
              answer2 += chunk;
            });
    
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
              //console.log(uvi);
              let uvi = JSON.parse(answer2).current.uvi.toFixed(2);
              console.log("UV index acquired:"+uvi)
              response[0].uvi = uvi

              //console.log("Response:")
              //console.log(response)
              let num_days = Object.keys(response).length;
              console.log("num_days:"+num_days)
              for (var i=1;i<num_days;i=i+1){
                //console.log("i: "+i)
                if (i==1){
                  response[i].day = "Tomorrow"
                }
                else{
//                  response[i].day = (new Date(JSON.parse(answer2).daily[i].dt)).getDay();
                  var timestamp = JSON.parse(answer2).daily[i].dt;
                  var a = new Date(timestamp*1000);
                  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
                  var dayOfWeek = days[a.getDay()]
                  response[i].day = dayOfWeek;
                }
                response[i].geo_loc  = geo_loc;
                response[i].main_w   = JSON.parse(answer2).current.weather[0].main;
                response[i].icon     = JSON.parse(answer2).current.weather[0].icon;
                response[i].temp     = kelvinToFahrenheit(JSON.parse(answer2).daily[i].temp.day).toFixed(2);
                response[i].temp_min = kelvinToFahrenheit(JSON.parse(answer2).daily[i].temp.min).toFixed(2);
                response[i].temp_max = kelvinToFahrenheit(JSON.parse(answer2).daily[i].temp.max).toFixed(2);
                response[i].pressure = JSON.parse(answer2).daily[i].pressure.toFixed(2);
                response[i].humidity = JSON.parse(answer2).daily[i].humidity.toFixed(2);
                response[i].uvi      = JSON.parse(answer2).daily[i].uvi.toFixed(2);
              }

              console.log("Full Answer: ")
              console.log(response)
              res.json(response);
    
            });
    
          }).on("error", (err) => {
            console.log("Error: " + err.message);
            res.send({"status":err.message})
          });

        });
      
      }).on("error", (err) => {
        console.log("Error: " + err.message);
        res.send({"status":err.message})
      });      
      //res.json(coords);
    }
  });
};

