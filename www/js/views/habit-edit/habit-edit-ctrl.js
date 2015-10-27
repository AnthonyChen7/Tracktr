angular.module('tracktr.controllers')

.controller("HabitEditController", function($scope,$stateParams,$ionicPopup,$ionicModal,$ionicHistory,TaskService) {
	$scope.habitID = $stateParams.habitId;
	
	$scope.habitTypes = [
		{name: "Time", code: 0},
		{name: "Count", code: 1}
		];
		
	$scope.frequencies = [
		{name: "Daily", code: 0},
		{name: "Weekly", code: 1},
		{name: "Monthly", code: 2}
		];
	
	$scope.days = [
		{name: "Sunday", short: "Sun", value: false},
		{name: "Monday", short: "Mon", value: false},
		{name: "Tuesday", short: "Tue", value: false},
		{name: "Wednesday", short: "Wed", value: false},
		{name: "Thursday", short: "Thu", value: false},
		{name: "Friday", short: "Fri", value: false},
		{name: "Saturday", short: "Sat", value: false}
		];
		 
	$scope.icons = [
		{class: "icon ion-star icon-custom", code: 0, value: false},
		{class: "icon ion-heart icon-custom", code: 1, value: false},
		{class: "icon ion-wrench icon-custom", code: 2, value: false},
		{class: "icon ion-hammer icon-custom", code: 3, value: false},
		{class: "icon ion-edit icon-custom", code: 4, value: false},
		{class: "icon ion-map icon-custom", code: 5, value: false},
		{class: "icon ion-chatbubble icon-custom", code: 6, value: false},
		{class: "icon ion-beer icon-custom", code: 7, value: false},
		{class: "icon ion-wineglass icon-custom", code: 8, value: false},
		{class: "icon ion-coffee icon-custom", code: 9, value: false},
		{class: "icon ion-icecream icon-custom", code: 10, value: false},
		{class: "icon ion-pizza icon-custom", code: 11, value: false},
		{class: "icon ion-calculator icon-custom", code: 12, value: false},
		{class: "icon ion-camera icon-custom", code: 13, value: false},
		{class: "icon ion-iphone icon-custom", code: 14, value: false},
		{class: "icon ion-cash icon-custom", code: 15, value: false},
		{class: "icon ion-university icon-custom", code: 16, value: false},
		{class: "icon ion-trophy icon-custom", code: 17, value: false},
		{class: "icon ion-bonfire icon-custom", code: 18, value: false},
		{class: "icon ion-lightbulb icon-custom", code: 19, value: true},
		];		
	
	$scope.range = function(start, end) {
		var result = [];
		for (var i = start; i <= end; i++) {
			result.push(i);
		};
		return result;
	};
	
	$scope.init = function() {
		TaskService.getTaskById($scope.habitID, function(err, task) { 
			$scope.task = task;
			
			$scope.habitTitle = task.name;
			$scope.isActive = task.isActive;
			
			$scope.frequency = $scope.frequencies[task.frequency];
			
			if (task.isTime == 1) {
				$scope.habitType = $scope.habitTypes[0];
				$scope.hoursAndMinutes = task.goal;
				$scope.hours = Math.floor(task.goal/60);
				$scope.minutes = task.goal%60;
			} else if (task.isCount == 1) {
				$scope.habitType = $scope.habitTypes[1];
				$scope.goal = task.goal;
			}
			
			$scope.icon = $scope.icons[task.icon];
			$scope.isTimerRunning = task.isTimerRunning;
			$scope.creationDate = task.creationDate;
			$scope.progress = task.progress;
		});
	};
});