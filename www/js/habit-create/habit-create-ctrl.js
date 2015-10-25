angular.module('tracktr.controllers')

.controller("HabitCreateController", function($scope, $ionicHistory, TaskService) {
	$scope.back = function() {
        $ionicHistory.goBack();
    }
	
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
		{name: "Sunday", value: false},
		{name: "Monday", value: false},
		{name: "Tuesday", value: false},
		{name: "Wednesday", value: false},
		{name: "Thursday", value: false},
		{name: "Friday", value: false},
		{name: "Saturday", value: false}
		];
		
	$scope.createTask = function(habitTitle,habitType,hours,minutes,frequency, days) {
		// Create Task		
		// Type
		var aTime = false;
		var aCount = false;
		switch (habitType) {
			case 0:
				aTime = true;
				break;
			case 1:
				aCount = true;
				break;
			default:
				// None chosen.
		}
		
		// Goal
		var aGoal = (parseInt(hours)*60) + parseInt(minutes);
		
		// Frequency
		var booleanDays = [];
		angular.forEach($scope.days, function(day) {
			if (day.selected) {
				day.value = true;
			}
			booleanDays.push(day.value);
		});
		
		// Days
		var aDays = { sunday: booleanDays[0], monday: booleanDays[1], tuesday: booleanDays[2], wednesday: booleanDays[3], thursday: booleanDays[4], friday: booleanDays[5], saturday: booleanDays[6] }
		
		// Creation Date
		var currentDate = new Date();
		
		// Progress
		var emptyProgress = [];
		
		// Generate Task and make call to TaskService
		var aTask = { name: habitTitle, isActive: true, 
		    frequency: frequency, days: aDays, isTime: aTime, isCount: aCount, goal: aGoal, icon: 0, isTimerRunning: false, creationDate: currentDate, progress: emptyProgress };
		TaskService.createTask(aTask, function(err, id) { });
		
		// Return to Home View
		$ionicHistory.goBack();
	}
});
