angular.module('myApp').controller('planetCtrl', function($scope, planetService){

  $scope.getTat = function() {
    planetService.getTat().then(function(results){
      console.log(results)
      $scope.tatooine = results.data.results[9]
    })
  }
  $scope.getTat();

  $scope.gethoth = function() {
    planetService.gethoth().then(function(results){
      console.log(results)
      $scope.hoth = results.data.results[2]
    })
  }
  $scope.gethoth()

  $scope.getDagobah = function() {
    planetService.getDagobah().then(function(results){
      // console.log(results)
      $scope.Dagobah = results.data.results[3]
    });
  }
  $scope.getDagobah()

  $scope.getmustafar = function() {
    planetService.getmustafar().then(function(results){
      $scope.mustafar = results.data.results[1]
    })
  }
  $scope.getmustafar();

  // $scope.getweather = function() {
  //   service.getweather().then(function(results){
  //     console.log('WEATHER', results)
  //     $scope.weather = "results";
  //   })
  // }
  // $scope.getweather()
});
