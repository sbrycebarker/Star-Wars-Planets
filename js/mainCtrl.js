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
  $scope.dagobahweather = function() {
    service.getweather().then(function(results){
      console.log('WEATHER', results)
      $scope.dagow = results.data;
    })
  }
  $scope.dagobahweather()

  $scope.hothweather = function() {
    service.hothweather().then(function(hothweather){
      console.log('hothweather', hothweather)
      $scope.hothw = hothweather.data;
    })
  }
  $scope.hothweather()

  $scope.tatweather = function() {
    service.tatweather().then(function(tatweather){
      console.log('tatweather', tatweather)
      $scope.tatw = tatweather.data;
    })
  }
  $scope.tatweather()

  $scope.mustweather = function() {
    service.mustweather().then(function(mustweather){
      console.log('mustweather', mustweather)
      $scope.mustw = mustweather.data;
    })
  }
  $scope.mustweather()

  $scope.coruweather = function() {
    service.coruweather().then(function(coruweather){
      console.log('coruweather', coruweather)
      $scope.coruw = coruweather.data;
    })
  }
  $scope.coruweather()

})
