angular.module('myApp').service('tatService', function($http){

this.getTat = function() {
  return $http({
    method: 'GET',
    url: "http://swapi.co/api/planets/?page=6"
  });
}
});

console.log
