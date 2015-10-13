angular.module('tracktr.controllers', [])

.controller('HomeController', function($scope, $state) {
  
  $scope.navCreateClick = function() {
    $state.go('create'); 
  }
  
});
