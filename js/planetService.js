angular.module('myApp').service('planetService', function($http){

this.getTat = function() {
  return $http({
    method: 'GET',
    url: "https://swapi.py4e.com/api/planets/?page=1"
  })
}

this.gethoth = function() {
  return $http({
    method: 'GET',
    url: "https://swapi.py4e.com/api/planets/?page=1"
  });
}

this.getDagobah = function() {
  return $http({
    method: 'GET',
    url: "https://swapi.py4e.com/api/planets/?page=1"
  });
}

this.getmustafar = function() {
  return $http({
    method: 'GET',
    url: "https://swapi.py4e.com/api/planets/?page=2"
  });
}

});
