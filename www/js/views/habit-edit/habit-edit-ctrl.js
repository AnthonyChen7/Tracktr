angular.module('tracktr.controllers')

.controller("HabitEditController", function($scope,$state,$stateParams,$ionicPopup,$ionicModal,$ionicHistory,TaskService) {
	
	/**
	 * These arrays contains
	 * the progress(es) we want to add/delete
	 */
	var deletedProgress = [];
	var addedProgress = [];
	
	$scope.habitId = $stateParams.habitId;
		
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
	
	$scope.initDatePicker = function(){	
		
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

$scope.initTimePicker = function(){
	
	var today = new Date();
	$scope.progressHour = pad(today.getHours());
	$scope.progressMinute = pad(today.getMinutes());

$scope.timePickerObject = {
  inputEpochTime: ( ((new Date()).getHours() * 60 * 60) + (new Date()).getMinutes() / 60 * 3600 ),  //Starting input time in Epoch
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
	
	$scope.initAddProgressModal = function(){
	
		//Add Progress Modal
	$ionicModal.fromTemplateUrl('addProgressModal.html',{
		scope:$scope,
		animation: 'slide-in-up'
	}).then(function(addProgressModal){
		$scope.addProgressModal = addProgressModal;
		
	});
	};
		
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
	
	//Clean up add progress modal when we're done with it
	$scope.$on('$destroy',function(){
		var today = new Date();
	$scope.progressHour = pad(today.getHours());
	$scope.progressMinute = pad(today.getMinutes());
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
	
	$scope.$on("$ionicView.enter", function() {
		
		deletedProgress = [];
	 	addedProgress = [];
	
		$scope.progressCount = 1;
	
		$scope.progressCountHour = 0;
		$scope.progressCountMinute = 0;
		$scope.progressCountSecond = 0;
		
		$scope.initAddProgressModal();
		$scope.initDatePicker();
		$scope.initTimePicker();
		
		TaskService.getTaskById($scope.habitId, function(err, task) { 
			$scope.task = task;
			
			$scope.habitTitle = task.name;
			$scope.isActive = task.isActive;
			$scope.isShared = task.isShared;
			
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
	});
	
	$scope.save = function(habitId,habitTitle,isActive,frequency,habitType,hours,minutes,goal,icon,days,daysId,creationDate,isTimerRunning,progress,isShared) {
		if (habitType.name == 'Time' && (hours == null || parseInt(hours) == 0) && (minutes == null || parseInt(minutes) == 0)) {
            $scope.showAlert = function() {
				var alertPopup = $ionicPopup.alert({
					title: 'Please specify a goal.',
					template: 'The \'Hours\' field and the \'Minutes\' field cannot both be zero.'
				});
 			};
			 $scope.showAlert();
			 return;
		} else if (habitType.name == 'Count' && (goal == null || parseInt(goal) == 0)) {
			$scope.showAlert = function() {
				var alertPopup = $ionicPopup.alert({
					title: 'Please specify a goal.',
					template: 'The \'Goal\' field must have a value greater than zero.'
				});
 			};
			 $scope.showAlert();
			 return;
		}
		
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
			frequency: frequency.code, days: aDays, isTime: aTime, isCount: aCount, goal: aGoal, icon: icon.code, isTimerRunning: isTimerRunning, creationDate: creationDate, progress: progress, isShared: isShared };
		
		if(deletedProgress.length > 0){
		// There are progresses to delete....
		
		TaskService.removeManyProgressFromTask(aTask,deletedProgress, function(err){
		
		TaskService.updateTask(aTask, function(err, id) {
		//Reset the deleted progress array
		 deletedProgress = [];	
			});
		});
		}
		
		if(addedProgress.length > 0){
		//There are progresses to add
		TaskService.addManyProgressToTask(aTask, addedProgress, function(err){
		TaskService.updateTask(aTask, function(err, id) {
		// //Reset the added progress array
		 addedProgress = [];
			});
			
		});
		
		
		}
		
		else{
		//No progress to add/delete	
		TaskService.updateTask(aTask, function(err, id) { });
		}
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
			return pad(hours)+":"+pad(minutes)+":"+pad(seconds);
		}else{
			return progressCount;
		}
	};
	
	/**
	 * Deletes the specified progress from the progress array of the task object
	 * progressObject is a valid progress object. Note that we don't save this change to the database.
	 */
	$scope.deleteProgress = function(progressObject){
		var index = $scope.progress.indexOf(progressObject);
        $scope.progress.splice(index,1);
				  
		deletedProgress.push(progressObject);

	};
	
	/**
	 * Create the progress and adds it to the progress array of the task. Note that we don't save it to the database
	 */
	$scope.createProgress = function(selectedDate,inputHour, inputMinute,progressCount, progressCountHour, progressCountMinute, progressCountSecond){
		
		var dateInput = selectedDate;
		var parsedHour = parseInt(inputHour);
		var parsedMinute = parseInt(inputMinute);
		var newProgress = {};
		
		//Progress date
		dateInput.setHours(parsedHour, parsedMinute, 0);
		
		if($scope.task.isCount){
		//Count based task	
		newProgress = {
			id : 0,
			task_id : $scope.task.id,
			date : dateInput.getTime(),
			progress : progressCount,
			timerLastStarted : dateInput.getTime()
		};
	
		}
		
		else{
			//Time based task
			
			//Convert all the input times to milliseconds
			var hourMillisecond = progressCountHour * 3600000;
			var minuteMillisecond = progressCountMinute * 60000;
			var secondMillisecond = progressCountSecond * 1000;
			var total = hourMillisecond + minuteMillisecond + secondMillisecond;
			
			newProgress = {
			id : 0,
			task_id : $scope.task.id,
			date : dateInput.getTime(),
			progress : total,
			timerLastStarted : dateInput.getTime()
		};
			
		}
	
	//add the progress to the task array but we don't save it
	var aProgress = new Progress(newProgress);
	addedProgress.push(aProgress);
    $scope.progress.push(aProgress);
	
	//Destroy the add progress modal and re-init/reset the field values			
	$scope.closeAddProgressModal();
	$scope.addProgressModal.remove();
	$scope.initDatePicker();
	$scope.initTimePicker();
	$scope.initAddProgressModal();	
	};
		
	/**
	 * Return back to the previous page
	 */
	$scope.goBack = function() {
		$ionicHistory.goBack();
	};
});