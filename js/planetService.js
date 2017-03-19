angular.module('myApp').service('planetService', function($http){

this.getTat = function() {
  return $http({
    method: 'GET',
    url: "https://swapi.co/api/planets/?page=6"
  })
}



this.gethoth = function() {
  return $http({
    method: 'GET',
    url: "https://swapi.co/api/planets/?page=1"
  });
}

this.getDagobah = function() {
  return $http({
    method: 'GET',
    url: "https://swapi.co/api/planets/?page=1"
  });
}

this.getmustafar = function() {
  return $http({
    method: 'GET',
    url: "https://swapi.co/api/planets/?page=2"
  });
}


//
// this.getYavin = function() {
//   return $http({
//     method: 'GET',
//     url: "http://swapi.co/api/planets/?page=6"
//   });
// }
});
