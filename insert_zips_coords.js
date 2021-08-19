const mongo = require('mongodb');
const url = "mongodb://localhost:27017";

// include file system module
var fs = require('fs');
 
mongo.connect(url, {useNewUrlParser: true}, (err, db) => {
  // Connect to Mongo
  if(err) {
    console.log(err);
    process.exit(0);
  }
  console.log('Database connected!');

  var dbo = db.db('weather');
  var collection = dbo.collection('zips_coords');

  fs.readFile('zip-codes-to-geo-coords.json',
    // callback function that is called when reading file is done
    function(err, data) { 
   
      // parse json
      var jsonParsed = JSON.parse(data);
      // console.log(jsonParsed);
   
      // Insert elements
      for(var zipcode in jsonParsed){
        //console.log(zipcode+": "+jsonParsed[zipcode][0]+','+jsonParsed[zipcode][1]);
        data = {"zipcode": zipcode, "lat":jsonParsed[zipcode][0], "lon":jsonParsed[zipcode][1]}
        collection.insertOne(data, (err, result) => {
          if(err) {
            console.log(err);
            process.exit(0);
          }
          //console.log(result);
          db.close();
        });
      }
    }
  );
});
