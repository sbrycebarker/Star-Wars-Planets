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

  $scope.getotherPlanets = function() {
    service.getotherPlanets().then(function(results){
      $scope.otherPlanets = results.data.results
    })
  }
  $scope.getotherPlanets();

  // $scope.getweather =function() {
  //   service.getweather().then(function(results){
  //     console.log('WEATHER', results)
  //     $scope.weather = results;
  //   })
  // }
  //
  // $scope.getweather()

})
