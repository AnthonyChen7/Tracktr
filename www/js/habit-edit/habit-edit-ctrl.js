angular.module('tracktr.controllers')

.controller("HabitEditController", function($scope, $stateParams) {
	$scope.habitID = $stateParams.habit-id;
});