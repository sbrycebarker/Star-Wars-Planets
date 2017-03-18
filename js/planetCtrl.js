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
      console.log(results)
      $scope.Dagobah = results.data.results[3]
    });
  }
  $scope.getDagobah()


});
