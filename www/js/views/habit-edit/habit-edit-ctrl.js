angular.module('tracktr.controllers')

.controller("HabitEditController", function($scope,$state,$stateParams,$ionicPopup,$ionicModal,$ionicHistory,TaskService) {
	
	$scope.habitId = $stateParams.habitId;
	
	var today = new Date();
	$scope.progressHour = pad(today.getHours());
	$scope.progressMinute = pad(today.getMinutes());
	
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
		
	//For ionic date picker
	var weekDaysList = ["Su", "M", "Tu", "W", "Th", "F", "Sa"];
		
	// For the Ionic date picker	
	 $scope.datepickerObject = {
      titleLabel: 'Select Progress Date',  //Optional
      todayLabel: 'Today',  //Optional
      closeLabel: 'Close',  //Optional
      setLabel: 'Set',  //Optional
      setButtonType : 'button-assertive',  //Optional
      todayButtonType : 'button-assertive',  //Optional
      closeButtonType : 'button-assertive',  //Optional
       inputDate: new Date(),  //Optional
      mondayFirst: false,  //Optional
    //   disabledDates: disabledDates, //Optional
      weekDaysList: weekDaysList, //Optional
    //   monthList: monthList, //Optional
      templateType: 'popup', //Optional
      showTodayButton: 'true', //Optional
      modalHeaderColor: 'bar-positive', //Optional
      modalFooterColor: 'bar-positive', //Optional
    //   from: new Date(2012, 8, 2), //Optional
      to: new Date(),  //Optional
      callback: function (val) {  //Mandatory
        datePickerCallback(val);
      },
      dateFormat: 'YYYY/MM/DD', //Optional
      closeOnSelect: false, //Optional
    };
	
	//Mandatory callback object for datepicker
	var datePickerCallback = function (val) {
  if (typeof(val) === 'undefined') {
    console.log('No date selected');
  } else {
    console.log('Selected date is : ', val)
	$scope.datepickerObject.inputDate = val;
  }
};

$scope.timePickerObject = {
  inputEpochTime: ((new Date()).getHours() * 60 * 60),  //Optional
  step: 1,  //Optional
  format: 24,  //Optional
  titleLabel: 'Progress Time',  //Optional
  setLabel: 'Set',  //Optional
  closeLabel: 'Close',  //Optional
  setButtonType: 'button-positive',  //Optional
  closeButtonType: 'button-stable',  //Optional
  callback: function (val) {    //Mandatory
    timePickerCallback(val);
  }
};

//Mandatory callback for time picker object
function timePickerCallback(val) {
  if (typeof (val) === 'undefined') {
    console.log('Time not selected');
  } else {
    var selectedTime = new Date(val * 1000);
    console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), ':', selectedTime.getUTCMinutes(), 'in UTC');
	$scope.timePickerObject.inputEpochTime = val;
	$scope.progressHour = pad(selectedTime.getUTCHours());
	$scope.progressMinute = pad(selectedTime.getUTCMinutes());
  }
}		
		
	$scope.range = function(start, end) {
		var result = [];
		for (var i = start; i <= end; i++) {
			result.push(i);
		};
		return result;
	};
	
	// Type Popup
	$scope.showTypePopup = function(habitType) {
		if (habitType != null) {
			if (habitType.name == 'Time') {
				var buttonType0 = 'button-dark';
			} else if (habitType == 'Count') {
				var buttonType1 = 'button-dark';
			}
		}
			
		var typePopup = $ionicPopup.show({
     		title: 'Select a habit type:',
			buttons: [
				 { text: 'Time',
				   type: buttonType0,
				   onTap: function(e) {
					   return {name: "Time", code: 0};
				   }
				 }, { text: 'Count',
				   type: buttonType1,
				   onTap: function(e) {
					   return {name: "Count", code: 1};
				   }
				 }
			]
		});
		
		typePopup.then(function(res) {
			$scope.habitType = res;
			if (res.name == "Time") {
				document.getElementById('goalField').style.display = 'none';
				document.getElementById('minutesField').style.display = '';
				document.getElementById('hoursField').style.display = '';
			} else {
				document.getElementById('goalField').style.display = '';
				document.getElementById('minutesField').style.display = 'none';
				document.getElementById('hoursField').style.display = 'none';
			}
		});
	};
	
	// Frequency Popup
	$scope.showFrequencyPopup = function(frequency) {
		if (frequency != null) {
			if (frequency.name == 'Daily') {
				var buttonType0 = 'button-dark';
			} else if (frequency == 'Weekly') {
				var buttonType1 = 'button-dark';
			} else if (frequency == 'Monthly') {
				var buttonType2 = 'button-dark';
			}
		}
			
		var frequencyPopup = $ionicPopup.show({
			cssClass: "popup-vertical-buttons",
     		title: 'Select a habit type:',
			buttons: [
				 { text: 'Daily',
				   type: buttonType0,
				   onTap: function(e) {
					   return {name: "Daily", code: 0};
				   }
				 }, { text: 'Weekly',
				   type: buttonType1,
				   onTap: function(e) {
					   return {name: "Weekly", code: 1};
				   }
				 }, { text: 'Monthly',
				   type: buttonType2,
				   onTap: function(e) {
					   return {name: "Monthly", code: 2};
				   }
				 }
			]
		});
		
		frequencyPopup.then(function(res) {
			$scope.frequency = res;
			if (res.name == "Daily") {
				document.getElementById('daysField').style.display = '';
			} else {
				document.getElementById('daysField').style.display = 'none';
			}
		});
	};
	
	// Days Modal
	$ionicModal.fromTemplateUrl('daysModal.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(daysModal) {
		$scope.daysModal = daysModal;
	});
	
	$scope.saveDays = function(days) {
		var daysString = '';
		for (var i = 0; i < days.length; i++) {
			if (days[i].value == true && daysString == '') {
				daysString += days[i].short;
			} else if (days[i].value == true) {
				daysString += ", " + days[i].short;
			}
		}
		$scope.daysString = daysString;
		$scope.days = days;
		$scope.closeDaysModal();
	};
	
	//Add Progress Modal
	$ionicModal.fromTemplateUrl('addProgressModal.html',{
		scope:$scope,
		animation: 'slide-in-up'
	}).then(function(addProgressModal){
		$scope.addProgressModal = addProgressModal;
	});
		
	//Edit Progress Modal
	$ionicModal.fromTemplateUrl('editProgressModal.html',{
		scope:$scope,
		animation: 'slide-in-up'
	}).then(function(editProgressModal){
		$scope.editProgressModal = editProgressModal;
	});
	
	// Icon Modal
	$ionicModal.fromTemplateUrl('iconModal.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(iconModal) {
		$scope.iconModal = iconModal;
	});
	
	$scope.saveIcon = function(icon) {
		$scope.icon = icon;
		$scope.closeIconModal();
	};
	
	// Modal Helpers - Days
	$scope.openDaysModal = function() {
		$scope.daysModal.show();
	};
	$scope.closeDaysModal = function() {
		$scope.daysModal.hide();
	};
	// Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function() {
		$scope.daysModal.remove();
	});
	// Execute action on hide modal
	$scope.$on('daysModal.hidden', function() {
		// Execute action
	});
	// Execute action on remove modal
	$scope.$on('daysModal.removed', function() {
		// Execute action
	});
	
	//Modal Helpers - Add Progress
	$scope.openAddProgressModal = function(){
		$scope.addProgressModal.show();
	};
	
	$scope.closeAddProgressModal = function(){
		$scope.addProgressModal.hide();
	};
	
	//Clean up edit progress modal when we're done with it
	$scope.$on('$destroy',function(){
		$scope.addProgressModal.remove();
	});
	
	// Execute action on hide modal
	$scope.$on('addProgressModal.hidden', function() {
		// Execute action
	});
	// Execute action on remove modal
	$scope.$on('addProgressModal.removed', function() {
		// Execute action
	});
	
	//Modal Helpers - Edit Progress
	$scope.openEditProgressModal = function(){
		$scope.editProgressModal.show();
	};
	
	$scope.closeEditProgressModal = function(){
		$scope.editProgressModal.hide();
	};
	
	//Clean up edit progress modal when we're done with it
	$scope.$on('$destroy',function(){
		$scope.editProgressModal.remove();
	});
	
	// Execute action on hide modal
	$scope.$on('editProgressModal.hidden', function() {
		// Execute action
	});
	// Execute action on remove modal
	$scope.$on('editProgressModal.removed', function() {
		// Execute action
	});
	
	// Modal Helpers - Icon
	$scope.openIconModal = function() {
		$scope.iconModal.show();
	};
	$scope.closeIconModal = function() {
		$scope.iconModal.hide();
	};
	// Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function() {
		$scope.iconModal.remove();
	});
	// Execute action on hide modal
	$scope.$on('iconModal.hidden', function() {
		// Execute action
	});
	// Execute action on remove modal
	$scope.$on('iconModal.removed', function() {
		// Execute action
	});
	
	$scope.init = function() {
		TaskService.getTaskById($scope.habitId, function(err, task) { 
			$scope.task = task;
			
			$scope.habitTitle = task.name;
			$scope.isActive = task.isActive;
			
			$scope.frequency = $scope.frequencies[task.frequency];
			
			if ($scope.frequency.code == 0) {
				document.getElementById('daysField').style.display = '';
			} else {
				document.getElementById('daysField').style.display = 'none';
			}
			
			if (task.isTime == 1) {
				
				$scope.habitType = $scope.habitTypes[0];
				$scope.hoursAndMinutes = task.goal;
				$scope.hours = Math.floor(task.goal/60);
				$scope.minutes = task.goal%60;
				
				document.getElementById('goalField').style.display = 'none';
				document.getElementById('minutesField').style.display = '';
				document.getElementById('hoursField').style.display = '';
			} else if (task.isCount == 1) {
				
				$scope.habitType = $scope.habitTypes[1];
				$scope.goal = task.goal;
				
				document.getElementById('goalField').style.display = '';
				document.getElementById('minutesField').style.display = 'none';
				document.getElementById('hoursField').style.display = 'none';
			}
			
			$scope.daysId = task.days.id;
			$scope.taskId = task.days.task_id;
			$scope.days = [
				{name: "Sunday", short: "Sun", value: task.days.sunday},
				{name: "Monday", short: "Mon", value: task.days.monday},
				{name: "Tuesday", short: "Tue", value: task.days.tuesday},
				{name: "Wednesday", short: "Wed", value: task.days.wednesday},
				{name: "Thursday", short: "Thu", value: task.days.thursday},
				{name: "Friday", short: "Fri", value: task.days.friday},
				{name: "Saturday", short: "Sat", value: task.days.saturday}
			];
			
			var daysString = '';
			for (var i = 0; i < $scope.days.length; i++) {
				if ($scope.days[i].value == true && daysString == '') {
					daysString += $scope.days[i].short;
				} else if ($scope.days[i].value == true) {
					daysString += ", " + $scope.days[i].short;
				}
			}
			$scope.daysString = daysString;
			
			$scope.icon = $scope.icons[task.icon];
			$scope.isTimerRunning = task.isTimerRunning;
			$scope.creationDate = task.creationDate;
			$scope.progress = task.progress;
		});
	};
	
	$scope.save = function(habitId,habitTitle,isActive,frequency,habitType,hours,minutes,goal,icon,days,daysId,creationDate,isTimerRunning,progress) {
		// Habit Type
		var aTime = 0;
		var aCount = 0;
		if (habitType.name == 'Time') {
			aTime = 1;
		} else {
			aCount = 1;
		}
		
		// Goal
		var aGoal;
		if (habitType.name == 'Time') { 
			if (hours == null) {
				hours = 0;
			}
			if (minutes == null) {
				minutes = 0;
			}			
			aGoal = (parseInt(hours)*60) + parseInt(minutes);
		} else if (habitType.name == 'Count' && goal != null) {
			aGoal = (parseInt(goal));
		}
		
		// Days
		var aDays = { id: habitId, task_id: daysId, sunday: days[0].value, monday: days[1].value, tuesday: days[2].value, wednesday: days[3].value, thursday: days[4].value, friday: days[5].value, saturday: days[6].value }
		
		// Generate Task and make call to TaskService
		var aTask = { id: habitId, name: habitTitle, isActive: isActive, 
			frequency: frequency.code, days: aDays, isTime: aTime, isCount: aCount, goal: aGoal, icon: icon.code, isTimerRunning: isTimerRunning, creationDate: creationDate, progress: progress };
		TaskService.updateTask(aTask, function(err, id) { });
		// Return to Home View
		$ionicHistory.goBack();
	}
	
	$scope.delete = function(habitId,daysId) {
		// Delete Task
		var taskToDelete = { id: $scope.habitId, days: { id: daysId } };
		TaskService.deleteTask(taskToDelete, function(err, id) { });
		
		// Return to Home View
		$ionicHistory.goBack();
	}
	
	/**
	 * Displays the date in an appropriate format
	 * date is a javascript date object
	 */
	$scope.displayFormattedDate = function(date){
		var yyyy= date.getFullYear().toString();
		var mmm = (date.getMonth()+1).toString(); //getMonth() is zero based
		var dd = date.getDate().toString();
		
		var hours = date.getHours();
		var minutes = date.getMinutes();
		
		 return  yyyy+"/"+(mmm[1]?mmm:"0"+mmm[0])+"/"+(dd[1]?dd:"0"+dd[0]) + " "+ pad(hours)+":"+pad(minutes);
		//return  (mmm[1]?mmm:"0"+mmm[0])+"/"+(dd[1]?dd:"0"+dd[0])+"/"+yyyy + " "+ pad(hours)+":"+pad(minutes);
	};
	
	/**
	 * Displays the progress in an appropriate format
	 * 
	 */
	$scope.displayFormattedProgress = function(progressCount){
		if($scope.task.isTime === true){
			var seconds = toSeconds(progressCount);
			var minutes = toMinutes(progressCount);
			var hours = toHours(progressCount);
			return hours+":"+pad(minutes)+":"+pad(seconds);
		}else{
			return progressCount;
		}
	};
	
	/**
	 * Deletes the specified progress from the progress array of the task object
	 * progressObject is a valid progress object
	 */
	$scope.deleteProgress = function(progressObject){
		
		var index = $scope.progress.indexOf(progressObject);
		
		TaskService.removeProgressFromTask($scope.task, progressObject, function(err){
			
			TaskService.updateTask($scope.task, function(err){
          		$scope.progress.splice(index,1);
			});
			
		} );
		
		
		
		
	};
	
	/**
	 * Return back to the previous page
	 */
	$scope.goBack = function() {
		$ionicHistory.goBack();
	};
});