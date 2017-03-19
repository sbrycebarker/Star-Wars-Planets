angular.module('myApp').service('service', function($http, $sce){

this.getPlanets = function() {
  return $http({
    method: 'GET',
    url: "https://swapi.co/api/planets/"
  });
},

this.getmorePlanets = function() {
  return $http({
    method: 'GET',
    url: "https://swapi.co/api/planets/?page=6"
  });
}

this.mustafar = function() {
  return $http({
    method: 'GET',
    url: "https://swapi.co/api/planets/?page=2"
  });
}

// this.getweather = function(){
//   var url = url
// $sce.trustAsJs(url);
//   return $http({
//     method:'GET',
//     url: "https://api.weatherbit.io/v1.0/forecast/hourly?lat=68&lon=-43&key=279abbf80b9d4142a0f619336394e835"
// //   });
// }


});




console.log();
  // Require the module
//   var Forecast = require('forecast');
//
//   // Initialize
//   var forecast = new Forecast({
//     service: 'darksky',
//     key: '7c2cddbc19d52aeb622c6604ae5b50a3',
//     units: 'celcius',
//     cache: true,      // Cache API requests
//     ttl: {            // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/
//       minutes: 27,
//       seconds: 45
//     }
//   });
//
//   // Retrieve weather information from coordinates (Sydney, Australia)
//   forecast.get([-33.8683, 151.2086], function(err, weather) {
//     if(err) return console.dir(err);
//     console.dir(weather);
//   });
//
//   // Retrieve weather information, ignoring the cache
//   forecast.get([-33.8683, 151.2086], true, function(err, weather) {
//     if(err) return console.dir(err);
//     console.dir(weather);
//   });
//
// });
