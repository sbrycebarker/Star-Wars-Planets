angular.module('myApp').controller('mainCtrl', function($scope, service){

  $scope.getPlanets = function() {
    service.getPlanets().then(function(results){
      $scope.planets = results.data.results
    })
  }

$scope.getPlanets();

  $scope.getmorePlanets = function() {
    service.getmorePlanets().then(function(results){
      $scope.moreplanets = results.data.results
    })
  }
  $scope.getmorePlanets();

  $scope.mustafar = function() {
    service.mustafar().then(function(results){
      $scope.mustafar = results.data.results
    })
  }
  $scope.mustafar();

  // $scope.getweather =function() {
  //   service.getweather().then(function(results){
  //     console.log('WEATHER', results)
  //     $scope.weather = results;
  //   })
  // }
  //
  // $scope.getweather()

})
