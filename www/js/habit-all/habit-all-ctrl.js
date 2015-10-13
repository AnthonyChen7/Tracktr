angular.module('tracktr.controllers')

.controller("HabitAllController", function($scope, $state) {
  
  /**
   * Click handler for new habit button
   */
  $scope.navCreateClick = function() {
    $state.go('tab.create'); 
  }
	
});