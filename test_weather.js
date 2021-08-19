const https = require('https');
console.log("Hola")
https.get('https://api.openweathermap.org/data/2.5/weather?APPID=6f90027c4f6cb48c722d0285723d5c7b&lat=5.7143&lon=-72.9339', (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(data);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
