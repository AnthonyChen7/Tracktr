angular.module('tracktr.controllers')

.controller("HabitChartsController", function($scope, $stateParams, $ionicHistory, TaskService) {
	$scope.testBoolean = true;
  $scope.taskId = $stateParams.taskId;
	console.log($scope.taskId);
	// $scope.labels = ['Nov. 1', 'Nov. 2', 'Nov. 3', 'Nov. 4', 'Nov. 5', 'Nov. 6', 'Nov. 7','Nov. 8','Nov. 9','Nov. 10','Nov. 11','Nov. 12','Nov. 13'];
  $scope.labels = [];
  // $scope.series = ['Series A', 'Series B'];
  
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
  $scope.loadDailyProgress_1 = function() {
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
   * 
   * TODO: create helper to check if a date is on sun mon tues...etc
   */
  
  $scope.loadWeeklyProgress = function(option) {
    TaskService.getTaskById($scope.taskId, function(err, task) { 
      $scope.task = task;
      $scope.labels = ['Sun.', 'Mon.', 'Tues.', 'Wed.', 'Thur.', 'Fri.', 'Sat.'];
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
  
  /**
   * pseudo code for displaying progress by hours:
   * get date of today, set hours to (0,0,0,0)
   * 
   * for every progress entry, checkDate = task.progress.date; checkDate.setHours(0,0,0,0);
   * get date.getHours, if from 0-1 && checkDate.getTime() === today.getTime(), put into data[0][0]
   * 1-2, data[0][1]
   * 
   */
  $scope.loadDailyProgress = function(option) {
    TaskService.getTaskById($scope.taskId, function(err, task) { 
      $scope.task = task;
      $scope.labels = ['0:00','1:00','2:00','3:00','4:00','5:00','6:00','7:00','8:00','9:00','10:00','11:00','12:00',
                       '13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'];
      $scope.data = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];
      $scope.days = option;                
      var today = new Date();
      today.setDate(today.getDate() - $scope.days);
      
      $scope.currentDay = $scope.monthNames[today.getMonth()] + " " + today.getDate(); //for displaying current date  on chart
      
      for(var i = 0; i < $scope.task.progress.length; i++) {
        var progressDate = $scope.task.progress[i].date;
        if($scope.isSameDate(today,progressDate)) {
        // var checkTime = checkDate.getTime();
        // var actualDate = $scope.task.progress[i].date;
           var hours = progressDate.getHours();
           console.log('hour is: ' + hours);
           $scope.data[0][hours] += $scope.task.progress[i].progress;
           console.log('progress is: ' + $scope.task.progress[i].progress);
          //  switch(hours) {
          //    case 0:
          //        $scope.data[0][0] += $scope.task.progress[i].progress;
          //        break;
          //    case 1:
          //        $scope.data[0][1] += $scope.task.progress[i].progress;
          //        break;
          //    case 2:
          //        $scope.data[0][2] += $scope.task.progress[i].progress;
          //        break;
          //    case 3:
          //        $scope.data[0][3] += $scope.task.progress[i].progress;
          //        break;
          //    case 4:
          //        $scope.data[0][4] += $scope.task.progress[i].progress;
          //        break;
          //    case 5:
          //        $scope.data[0][5] += $scope.task.progress[i].progress;
          //        break;
          //    case 6:
          //        $scope.data[0][6] += $scope.task.progress[i].progress;
          //        break;
          //    case 7:
          //        $scope.data[0][] += $scope.task.progress[i].progress;
          //        break;
          //    case 8:
          //        $scope.data[0][0] += $scope.task.progress[i].progress;
          //        break;
          //    case 9:
          //        $scope.data[0][0] += $scope.task.progress[i].progress;
          //        break;
          //    case 10:
          //        $scope.data[0][0] += $scope.task.progress[i].progress;
          //        break;
          //    case 11:
          //        $scope.data[0][0] += $scope.task.progress[i].progress;
          //        break;
          //    case 12:
          //        $scope.data[0][0] += $scope.task.progress[i].progress;
          //        break;
          //    case 13:
          //        $scope.data[0][0] += $scope.task.progress[i].progress;
          //        break;
          //    case 14:
          //        $scope.data[0][0] += $scope.task.progress[i].progress;
          //        break;
          //    case 15:
          //        $scope.data[0][0] += $scope.task.progress[i].progress;
          //        break;
          //    case 16:
          //        $scope.data[0][0] += $scope.task.progress[i].progress;
          //        break;
          //    case 17:
          //        $scope.data[0][0] += $scope.task.progress[i].progress;
          //        break;
          //    case 18:
          //        $scope.data[0][0] += $scope.task.progress[i].progress;
          //        break;
          //    case 19:
          //        $scope.data[0][0] += $scope.task.progress[i].progress;
          //        break;
          //    case 20:
          //        $scope.data[0][0] += $scope.task.progress[i].progress;
          //        break;
          //    case 21:
          //        $scope.data[0][0] += $scope.task.progress[i].progress;
          //        break;
          //    case 22:
          //        $scope.data[0][0] += $scope.task.progress[i].progress;
          //        break;
          //    case 23:
          //        $scope.data[0][0] += $scope.task.progress[i].progress;
          //        break;
             
          //  }
        
        }
      }
      
    });
  };
  
  
  /**
   * Check if two dates are the same
   */
  $scope.isSameDate = function(date1,date2) {
    console.log('today is: ' + date1.getDate() + ', progressDate is: ' + date2.getDate());
    return(
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };
  
  
  /**
   * Update the chart to previous day
   */
  $scope.previousDay = function() {
    $scope.days += 1;
    $scope.loadDailyProgress($scope.days);
  };
  
  
  /**
   * Update the chart to the next day
   */
  $scope.nextDay = function() {
    if($scope.days >0){
      $scope.days -= 1;
      $scope.loadDailyProgress($scope.days);
    }
  };
  
  
  /**
   * pseudo code:
   * for every progress entry, check if the date is 
   */
  $scope.loadMonthlyProgress = function(option) {
    TaskService.getTaskById($scope.taskId, function(err, task) {
      $scope.task = task;
      $scope.data = [[0,0,0,0,0,0,0,0,0,0,0,0]];
      $scope.labels = $scope.monthNames;
      $scope.years = option;
      
      var thisYear = new Date();
      thisYear.setFullYear(thisYear.getFullYear() - $scope.years);
      
      for(var i = 0;i < $scope.task.progress.length; i++) {
        var month = $scope.task.progress[i].date.getMonth();
        if($scope.task.progress[i].date.getFullYear() === thisYear.getFullYear()) {
          $scope.data[0][month] += $scope.task.progress[i].progress;
        }
      }
    });
  };
  
  
  /**
   * Update chart to display the previous year
   */
  $scope.previousYear = function() {
    $scope.years += 1;
    $scope.loadMonthlyProgress($scope.years);
  };
  
  
  /**
   * Update chart to display the previous year
   */
  $scope.nextYear = function() {
    if($scope.years > 0) {
       $scope.years -= 1;
       $scope.loadMonthlyProgress($scope.years);
    }
  };
  
  
  /** 
   * Reload tasks every time home tab is entered
   */
  $scope.$on("$ionicView.enter", function () {
    TaskService.getTaskById($scope.taskId, function(err, task) {
      $scope.task = task;
    });
  });
  
  /**
   * Return back to the previous page
   */
  $scope.goBack = function() {
    $ionicHistory.goBack();
  };
});