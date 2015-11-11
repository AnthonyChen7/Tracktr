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

  // $scope.data = [
  //   [65, 59, 80, 81, 56, 55, 40],
  //   [28, 48, 40, 19, 86, 27, 90]
  // ];
  $scope.task_progress = [];
  $scope.progress=[[]];
  $scope.data = [[]];
 
  
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
  
  /*
   * get current week: getlast sunday, get next sunday
   * put Sun Mon Tue Wed Thur Fri Sat in labels array
   * for every progress entry, look if it's within lastSunday and lastMonday, put in first element of data array
   * else if its within lastMonday to lastTuesday
   * 
   * 
   * !!!!to view previous week, today.getDate() - 7 * 1
   * current week: today.getDate() - 7 * 0
   * 
   * option is: 0 for current week,
   *            1 for last week,
   *            2 for two weeks ago etc
   */
  
  $scope.loadWeeklyProgress = function(option) {
    TaskService.getTaskById($scope.taskId, function(err, task) { 
      $scope.task = task;
      $scope.labels = ['Sun.', 'Mon.', 'Tues.', 'Wed.', 'Thur.', 'Fri', 'Sat'];
      $scope.week = option;
      
      var today = new Date();
      
      $scope.data = [[0,0,0,0,0,0,0]];
      
      //lastSunday date object
      var lastSunday = new Date();
      lastSunday.setDate(today.getDate() - (7*option) - today.getDay());
      lastSunday.setHours(0,0,0,0);
      console.log("lastSunday is " + lastSunday.getDate());
      
      //monday date object
      var monday = new Date();
      monday.setDate(today.getDate() - (7*option) - today.getDay() + 1);
      monday.setHours(0,0,0,0);
      console.log("Monday is " + monday.getDate());
      
      //tuesday date object
      var tuesday = new Date();
      tuesday.setDate(today.getDate() - (7*option) - today.getDay() + 2);
      tuesday.setHours(0,0,0,0);
      console.log("Tuesday is " + tuesday.getDate());
      
      //wednesday date object
      var wednesday = new Date();
      wednesday.setDate(today.getDate() - (7*option) - today.getDay() + 3);
      wednesday.setHours(0,0,0,0);
      console.log("Wednesday is " + wednesday.getDate());
      
      //thursday date object
      var thursday = new Date();
      thursday.setDate(today.getDate() - (7*option) - today.getDay() + 4);
      thursday.setHours(0,0,0,0);
      console.log("Thursday is " + thursday.getDate());
      
      //friday date object
      var friday = new Date();
      friday.setDate(today.getDate() - (7*option) - today.getDay() + 5);
      friday.setHours(0,0,0,0);
      console.log("Friday is " + friday.getDate());
      
      //saturday date object
      var saturday = new Date();
      saturday.setDate(today.getDate() - (7*option) - today.getDay() + 6);
      saturday.setHours(0,0,0,0);
      console.log("Saturday is " + saturday.getDate());
      
      //nextSunday date object
      var nextSunday = new Date();
      nextSunday.setDate(today.getDate() - (7*option) - today.getDay() + 7);
      nextSunday.setHours(0,0,0,0);
      console.log("NextSunday is " + nextSunday.getDate());
      
      for(var i = 0; i < $scope.task.progress.length; i++) {
        var progressTime = $scope.task.progress[i].date.getTime();
        
        //the progress is on Sunday
        if(lastSunday.getTime() <= progressTime && progressTime < monday.getTime()) {
          $scope.data[0][0] += $scope.task.progress[i].progress;
          console.log('progress is: ' + $scope.task.progress[i].progress + 'data is: ' + $scope.data[0][0]);
        }
        
        else if(monday.getTime() <= progressTime && progressTime < tuesday.getTime()) {
          $scope.data[0][1] += $scope.task.progress[i].progress;
          console.log('progress is: ' + $scope.task.progress[i].progress + 'data is: ' + $scope.data[0][1]);
        }
        
        else if(tuesday.getTime() <= progressTime && progressTime < wednesday.getTime()) {
          $scope.data[0][2] += $scope.task.progress[i].progress;
          console.log('progress is: ' + $scope.task.progress[i].progress + 'data is: ' + $scope.data[0][2]);
        }
        
        else if(wednesday.getTime() <= progressTime && progressTime < thursday.getTime()) {
          $scope.data[0][3] += $scope.task.progress[i].progress;
          console.log('progress is: ' + $scope.task.progress[i].progress + 'data is: ' + $scope.data[0][3]);
        }
        
        else if(thursday.getTime() <= progressTime && progressTime < friday.getTime()) {
          $scope.data[0][4] += $scope.task.progress[i].progress;
          console.log('progress is: ' + $scope.task.progress[i].progress + 'data is: ' + $scope.data[0][4]);
        }
        
        else if(friday.getTime() <= progressTime && progressTime < saturday.getTime()) {
          $scope.data[0][5] += $scope.task.progress[i].progress;
          console.log('progress is: ' + $scope.task.progress[i].progress + 'data is: ' + $scope.data[0][5]);
        }
        
        else if(saturday.getTime() <= progressTime && progressTime < nextSunday.getTime()) {
          $scope.data[0][6] += $scope.task.progress[i].progress;
          console.log('progress is: ' + $scope.task.progress[i].progress + 'data is: ' + $scope.data[0][6]);
        }
      }
      
      console.log('data is: ' + $scope.data[0]);
    });
  };
  
  $scope.updateToPrevious = function() { 
    console.log("!!week is: " + $scope.week);
    $scope.week+=1;
    console.log("week is: " + $scope.week);
    $scope.loadWeeklyProgress($scope.week);
  };
  
  $scope.updateToCurrent = function() {
    // console.log("!!week is: " + $scope.week);
    if($scope.week > 0)
       $scope.week-=1;
    console.log("week is: " + $scope.week);
    $scope.loadWeeklyProgress($scope.week);
  }
  
  /*
     *Reload tasks every time home tab is entered
     */
    $scope.$on("$ionicView.enter", function () {
      TaskService.getTaskById($scope.taskId, function(err, task) {
        $scope.task = task;
      });
    });
  
});