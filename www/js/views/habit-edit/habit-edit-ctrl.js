angular.module('tracktr.controllers')

.controller("HabitEditController", function($scope, $ionicHistory, $stateParams, TaskService) 
{
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
	
	$scope.habitId = $stateParams.habitId;
	
	$scope.init = function() {		
		TaskService.getTaskById($scope.habitId, function(err, task) { 
			$scope.task = task;
			
			// Edit Task
			$scope.habitTitle = task.name;	
			
			if (task.isTime == 1) {
				$scope.habitType = $scope.habitTypes[0];
			} else {
				$scope.habitType = $scope.habitTypes[1];
			}	
			
			$scope.goal = task.goal;
			$scope.hours = Math.floor(task.goal/60);
			$scope.minutes = task.goal%60;
			
			switch (task.frequency) {
			case 0:
				$scope.frequency = $scope.frequencies[0];
				break;
			case 1:
				$scope.frequency = $scope.frequencies[1];
				break;
			case 2:
				$scope.frequency = $scope.frequencies[2];
				break;
			default:
				// None chosen.
			}
			
			$scope.daysId = task.days.id;
			$scope.days = [
				{name: "Sunday", value: task.days.sunday},
				{name: "Monday", value: task.days.monday},
				{name: "Tuesday", value: task.days.tuesday},
				{name: "Wednesday", value: task.days.wednesday},
				{name: "Thursday", value: task.days.thursday},
				{name: "Friday", value: task.days.friday},
				{name: "Saturday", value: task.days.saturday}
				];
			
			$scope.isActive = task.isActive;
			$scope.isTime = task.isTime;
			$scope.isCount = task.isCount;		
			$scope.icon = task.icon;
			$scope.isTimerRunning = task.isTimerRunning;
			$scope.currentDate = task.creationDate;
			$scope.progress = task.progress;
		});
    }
	
	$scope.saveTask = function(habitID,habitTitle,isActive,habitType,isTime,isCount,hours,minutes,frequency,days,daysId,icon,isTimerRunning,currentDate,progress,goal) {			
		// Save Task		
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
		// for (var i = 0; i < days.length; i++) {
		// 	if (days[i].value == true) {
		// 		days[i].value == 1;
		// 	} else {
		// 		days[i].value == 0;
		// 	}
		// }
		var aDays = { id: daysId, task_id: $scope.habitId, sunday: days[0].value, monday: days[1].value, tuesday: days[2].value, wednesday: days[3].value, thursday: days[4].value, friday: days[5].value, saturday: days[6].value }
		
		// alert(daysId);
		alert(aDays.monday);
		
		// Generate Task and make call to TaskService
		var aTask = { id: $scope.habitId, name: habitTitle, isActive: isActive, 
			frequency: frequency, days: aDays, isTime: aTime, isCount: aCount, goal: aGoal, icon: icon, isTimerRunning: isTimerRunning, creationDate: currentDate, progress: progress };
		TaskService.updateTask(aTask, function(err, id) { });
		
		// Return to Home View
		$ionicHistory.goBack();
	}
	
	$scope.deleteTask = function(habitId) {
		// Delete Task
		var taskToDelete = { id: $scope.habitId, days: { id: $scope.daysId } };
		TaskService.deleteTask(taskToDelete, function(err, id) { });
		
		// Return to Home View
		$ionicHistory.goBack();
	}

});