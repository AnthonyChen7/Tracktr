angular.module('tracktr.controllers')

.controller("HabitChartsController", function($scope, $stateParams, TaskService) {
	$scope.testBoolean = true;
  $scope.taskId = $stateParams.taskId;
	console.log($scope.taskId);
	// $scope.labels = ['Nov. 1', 'Nov. 2', 'Nov. 3', 'Nov. 4', 'Nov. 5', 'Nov. 6', 'Nov. 7','Nov. 8','Nov. 9','Nov. 10','Nov. 11','Nov. 12','Nov. 13'];
  $scope.labels = [];
  $scope.series = ['Series A', 'Series B'];
  
  //Month names
  $scope.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.task_progress = [];
  $scope.progress=[[]];
 
  
  $scope.loadProgress = function() {
    TaskService.getTaskById($scope.taskId, function(err, task) { 
    $scope.task = task;
      
      //Only loads every progress entry into progress, to display on chart
      // for(var i = 0; i < task.progress.length; i++) {
      //   $scope.progress[0][i] = task.progress[i].progress;
      //   console.log("progress " + i + " is " + $scope.progress[0][i]);
      // }
      
    var today = new Date();
    var firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(),1);
    var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1);
    var result = 0;
    
    for(var i = 0; i < $scope.task.progress.length ; i++){
      
      if(firstDayOfMonth.getTime() <= $scope.task.progress[i].date.getTime() && $scope.task.progress[i].date.getTime() <= lastDayOfMonth.getTime()){
         result += $scope.task.progress[i].progress;
      } 
    }
    
    if(task.isTime) {
      result = Math.floor(result / 1000);
    }
    console.log(result);
    $scope.progress[0][0] = result;  
    $scope.labels = [$scope.monthNames[today.getMonth()]];
    
      
    });
  };
  
  ///pseudo code for displaying daily: go through every progress entry, put first one into a date, and a progressChart
  ///for every entry i, check if the date is the same as i-1, if it is, add the progress to it
  ///if not, append new element to the date (label) array, append new element to data array
  $scope.loadDailyProgress = function() {
    TaskService.getTaskById($scope.taskId, function(err, task) { 
      $scope.task = task;
      
      var previousDate = null;
      var currentDate = null;
      var previousIndex = null;
      for(var i = 0; i < $scope.task.progress.length; i++) {
        if(i === 0) {
          previousDate = ($scope.task.progress[i].date.getMonth()+1) + "/" + $scope.task.progress[i].date.getDate();
          console.log("Date: " + previousDate);
          $scope.labels.push(previousDate);
          $scope.progress[0][i] = $scope.task.progress[i].progress;
          previousIndex = i;
        }
        else {
          currentDate = ($scope.task.progress[i].date.getMonth()+1) + "/" + $scope.task.progress[i].date.getDate();
          console.log("Date: " + currentDate);
          if(currentDate === previousDate) {
            $scope.progress[0][previousIndex] += $scope.task.progress[i].progress;
            console.log("progress: " + $scope.progress[0][previousIndex] + "at index " + previousIndex);
          }
          else {
            $scope.labels.push(currentDate);
            $scope.progress[0][previousIndex + 1] = $scope.task.progress[i].progress;
            console.log("second progress: " + $scope.progress[0][previousIndex + 1]);
            previousIndex += 1;
            previousDate = currentDate;
          }
        }
        
      }
      
    });
  };
  
});