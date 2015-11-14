angular.module('tracktr.controllers')

.controller("HabitChartsController", function($scope, $stateParams, $ionicHistory, TaskService) {
	$scope.testBoolean = true;
  $scope.taskId = $stateParams.taskId;
	console.log($scope.taskId);
  $scope.labels = [];
  
  //Month names
  $scope.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  $scope.task_progress = [];
  $scope.progress=[[]];
  $scope.data = [[]];
 
  
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
      $scope.isWeekly = true;
      $scope.isDaily = false;
      $scope.isMonthly = false;
      
      var today = new Date();
      
      $scope.data = [[0,0,0,0,0,0,0]];
      
      //lastSunday date object
      var lastSunday = new Date();
      lastSunday.setDate(today.getDate() - (7*option) - today.getDay());
      lastSunday.setHours(0,0,0,0);
      var sundayDateString = (lastSunday.getMonth()+1) + "/" + lastSunday.getDate();
      $scope.labels[0] = $scope.labels[0] + " " + sundayDateString;
      console.log("lastSunday is " + lastSunday.getDate());
      
      //monday date object
      var monday = new Date();
      monday.setDate(today.getDate() - (7*option) - today.getDay() + 1);
      monday.setHours(0,0,0,0);
      var mondayDateString = (monday.getMonth()+1) + "/" + monday.getDate();
      $scope.labels[1] = $scope.labels[1] + " " + mondayDateString;
      console.log("Monday is " + monday.getDate());
      
      //tuesday date object
      var tuesday = new Date();
      tuesday.setDate(today.getDate() - (7*option) - today.getDay() + 2);
      tuesday.setHours(0,0,0,0);
      var tuesdayDateString = (tuesday.getMonth()+1) + "/" + tuesday.getDate();
      $scope.labels[2] = $scope.labels[2] + " " + tuesdayDateString;
      console.log("Tuesday is " + tuesday.getDate());
      
      //wednesday date object
      var wednesday = new Date();
      wednesday.setDate(today.getDate() - (7*option) - today.getDay() + 3);
      wednesday.setHours(0,0,0,0);
      var wednesdayDateString = (wednesday.getMonth()+1) + "/" + wednesday.getDate();
      $scope.labels[3] = $scope.labels[3] + " " + wednesdayDateString;
      console.log("Wednesday is " + wednesday.getDate());
      
      //thursday date object
      var thursday = new Date();
      thursday.setDate(today.getDate() - (7*option) - today.getDay() + 4);
      thursday.setHours(0,0,0,0);
      var thursdayDateString = (thursday.getMonth()+1) + "/" + thursday.getDate();
      $scope.labels[4] = $scope.labels[4] + " " + thursdayDateString;
      console.log("Thursday is " + thursday.getDate());
      
      //friday date object
      var friday = new Date();
      friday.setDate(today.getDate() - (7*option) - today.getDay() + 5);
      friday.setHours(0,0,0,0);
      var fridayDateString = (friday.getMonth()+1) + "/" + friday.getDate();
      $scope.labels[5] = $scope.labels[5] + " " + fridayDateString;
      console.log("Friday is " + friday.getDate());
      
      //saturday date object
      var saturday = new Date();
      saturday.setDate(today.getDate() - (7*option) - today.getDay() + 6);
      saturday.setHours(0,0,0,0);
      var saturdayDateString = (saturday.getMonth()+1) + "/" + saturday.getDate();
      $scope.labels[6] = $scope.labels[6] + " " + saturdayDateString;
      console.log("Saturday is " + saturday.getDate());
      
      //nextSunday date object
      var nextSunday = new Date();
      nextSunday.setDate(today.getDate() - (7*option) - today.getDay() + 7);
      nextSunday.setHours(0,0,0,0);
      console.log("NextSunday is " + nextSunday.getDate());
      
      $scope.currentWeek = sundayDateString + " - " + saturdayDateString;
      
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
      if($scope.task.isTime) {
        $scope.timeFormat($scope.data);
      }
      console.log('data is: ' + $scope.data[0]);
    });
  };
  
  
  /**
   * Update the chart to display the previous week
   */
  $scope.previousWeek = function() { 
    console.log("!!week is: " + $scope.week);
    $scope.week+=1;
    console.log("week is: " + $scope.week);
    $scope.loadWeeklyProgress($scope.week);
  };
  
  
  /**
   * Update the chart to display the next week
   */
  $scope.nextWeek = function() {
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
      $scope.isWeekly = false;
      $scope.isDaily = true;
      $scope.isMonthly = false;
      
      $scope.days = option;                
      var today = new Date();
      today.setDate(today.getDate() - $scope.days);
      
      $scope.currentDay = $scope.monthNames[today.getMonth()] + " " + today.getDate(); //for displaying current date  on chart
      
      for(var i = 0; i < $scope.task.progress.length; i++) {
        var progressDate = $scope.task.progress[i].date;
        if($scope.isSameDate(today,progressDate)) {
           var hours = progressDate.getHours();
           console.log('hour is: ' + hours);
           $scope.data[0][hours] += $scope.task.progress[i].progress;
           console.log('progress is: ' + $scope.task.progress[i].progress);
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
   * Update the chart to display the previous day
   */
  $scope.previousDay = function() {
    $scope.days += 1;
    $scope.loadDailyProgress($scope.days);
  };
  
  
  /**
   * Update the chart to display the next day
   */
  $scope.nextDay = function() {
    if($scope.days >0){
      $scope.days -= 1;
      $scope.loadDailyProgress($scope.days);
    }
  };
  
  
  /**
   * Load monthly chart within the year
   */
  $scope.loadMonthlyProgress = function(option) {
    TaskService.getTaskById($scope.taskId, function(err, task) {
      $scope.task = task;
      $scope.data = [[0,0,0,0,0,0,0,0,0,0,0,0]];
      $scope.isWeekly = false;
      $scope.isDaily = false;
      $scope.isMonthly = true;
      
      $scope.labels = $scope.monthNames;
      $scope.years = option;
      
      var thisYear = new Date();
      thisYear.setFullYear(thisYear.getFullYear() - $scope.years);
      $scope.currentYear = thisYear.getFullYear();
      
      for(var i = 0;i < $scope.task.progress.length; i++) {
        var month = $scope.task.progress[i].date.getMonth();
        if($scope.task.progress[i].date.getFullYear() === thisYear.getFullYear()) {
          $scope.data[0][month] += $scope.task.progress[i].progress;
        }
      }
    });
  };
  
  
  /**
   * Update the chart to display the previous year
   */
  $scope.previousYear = function() {
    $scope.years += 1;
    $scope.loadMonthlyProgress($scope.years);
  };
  
  
  /**
   * Update the chart to display the previous year
   */
  $scope.nextYear = function() {
    if($scope.years > 0) {
       $scope.years -= 1;
       $scope.loadMonthlyProgress($scope.years);
    }
  };
  
  
  /**
   * transform time on the chart to h:m:s format
   * 
   */
  $scope.timeFormat = function(data2DArray) {
    for(var i = 0;i < data2DArray[0].length;i++) {
      var progress = data2DArray[0][i];
      // $scope.data[0][i] = ($scope.data[0][i]/60000) + "Min. " + Math.floor(progress/3600000) + ":" + (Math.floor(progress/60000) % 60) + ":" + (Math.floor(progress/1000) % 60);
      $scope.data[0][i] = $scope.data[0][i]/60000;
      console.log("hihihihihi time is: " + $scope.data[0][i] + "minutes");
    }
  };
  
  
  /**
   * Switch to daily chart view
   */
  $scope.showDaily = function() {
    $scope.isWeekly = false;
    $scope.isDaily = true;
    $scope.isMonthly = false;
    $scope.loadDailyProgress(0);
  };
  
  
  /**
   * Switch to monthly chart view
   */
  $scope.showMonthly = function() {
    $scope.isWeekly = false;
    $scope.isDaily = false;
    $scope.isMonthly = true;
    $scope.loadMonthlyProgress(0);
  };
  
  
  /**
   * Switch to weekly chart view
   */
  $scope.showWeekly = function() {
    $scope.isWeekly = true;
    $scope.isDaily = false;
    $scope.isMonthly = false;
    $scope.loadWeeklyProgress(0);
  };
  
  
  /**
   * Return back to the previous page
   */
  $scope.goBack = function() {
    $ionicHistory.goBack();
  };
});