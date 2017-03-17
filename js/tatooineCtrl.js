angular.module('myApp').controller('tatooineCtrl', function($scope, tatService){

  $scope.getTat = function() {
    tatService.getTat().then(function(results){
      console.log(results)
      $scope.tatooine = results.data.results[9]
    });
  }

$scope.getTat();

});
