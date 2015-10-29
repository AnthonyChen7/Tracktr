angular.module('tracktr.controllers', [])

.controller('HomeController', function($scope, $state, TaskService) {
  
  $scope.allTasks;
  $scope.date = new Date().getDate();      
  
  /*
   *Get all tasks from the DB
   */
 TaskService.getAll(function(err,tasks){
    $scope.allTasks = tasks;
  });
 
  
  /*
   * Increment the count for count tasks
   */
  $scope.incCount = function(task) {
    if(task.isCount) {
      var newProgress = $scope.startProgress(task);
      task.progress.push(newProgress);
      TaskService.addProgressToTask(task, newProgress);
    }
  };
  
  
  /*
   * Start a new progress for every count 
   */
  $scope.startProgress = function(task) {
    return {
      task_id: task.id,
      date: new Date(),
      progress: 1,
      timerLastStarted: null
    };
  };
  
  
  // /*
  //  * Count the total progress of the task 
  //  */
  // $scope.countProgress = function(task){
  //   var result = 0;
  //   if(task.isCount) {
  //      for(var i = 0; i < task.progress.length; i++){
  //        result += task.progress[i].progress;
  //      }
  //   }
  //   return result;
  // };
  
  
  /*
   * Count the total progress of the task 
   * TODO: implement to display count progress for current goal "period"
   */
  $scope.countProgress = function(task){
    var result = 0;
    var current_date = new Date();
    if(task.isCount) {
      result = task.getProgress(task);
    }
    return result;
  };
  
  
  /*
   * Count the amount time spent on the task
   * @Param format is the output format, 1:seconds, 2:minutes, 3:hours
   */
  $scope.countTime = function(task,format) {
    var result = 0;
    if(task.isTime) {
      for(var i = 0; i < task.progress.length; i++) {
        result += task.progress[i].progress;
      }
    }
    switch(format) {
       case 1: 
         result = $scope.toSeconds(result);
         break;   
       case 2: 
         result = $scope.toMinutes(result);
         break;
       case 3: 
         result = $scope.toHours(result);
         break;
    }
    return result;
  };
  
  
  /*
   * Convert milliseconds into seconds
   */
  $scope.toSeconds = function(num) {
    num = Math.floor(num / 1000);
    return num % 60;
  };
  
  
  /*
   * Convert milliseconds into minutes
   */
  $scope.toMinutes = function(num) {
    num = Math.floor(num / 60000);
    return num % 60;
  };
  
  
  /*
   * Convert milliseconds into hours
   */
  $scope.toHours = function(num) {
    num = Math.floor(num / 3600000);
    return num;
  };
  
  
  /*
   * Determine if the task is active for the current day
   */
  $scope.isTaskActiveToday = function(task){
    var today = new Date();
    var dayIndex = today.getDay();
    var days = task.days;
    var  dayOfWeek = $scope.dayOfWeekAsString(dayIndex);
    var isActive = task.isActive;  
      for(field in days){
        if(field === dayOfWeek){
          if(days[field]===true && isActive===true){
            return true;
          }else{
            return false;
          }
        }
      }
      return false;
  };
  
  
  /*
   * Converts a day of week number to a string
   */
  $scope.dayOfWeekAsString = function(dayIndex){
    return ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"][dayIndex];
  };
  
  
  /*
   * update all the tasks
   */
  $scope.updateAll = function(allTasks) {
    for(i = 0; i < allTasks.lenth; i++) {
      TaskService.updateTask(allTasks[i]);
    }
  };
 
  
  /*
   * Count the current progress, and express it in seconds
   * @Param format is the output format, 1:seconds, 2:minutes, 3:hours
   */
  $scope.progressTimer = function(task,format) {
    if(task.isTimerRunning) {
      var current = new Date();
      var difference = current - task.progress[task.progress.length - 1].timerLastStarted;
      switch(format) {
         case 1:
           difference = $scope.toSeconds(difference);
          break;      
         case 2: 
           difference = $scope.toMinutes(difference);
          break;      
         case 3: 
           difference = $scope.toHours(difference);
          break;      
      }
      return difference;  
    }
    else{
    return 0;
    }
  };


  /*
   * Count the current progress, and express it in seconds
   */
  $scope.progressTimerInSeconds = function(task) {
    if(task.isTimerRunning) {
      var current = new Date();
      var difference = current - task.progress[task.progress.length - 1].timerLastStarted;
      return Math.floor(difference / 1000) % 60;  
    } else {
      return 0;
    }
  };
  
  
  /*
   * Count the current progress, and express it in minutes
   */
  $scope.progressTimerInMinutes = function(task) {
    if(task.isTimerRunning) {
      var current = new Date();
      var difference = current - task.progress[task.progress.length - 1].timerLastStarted;
      return Math.floor(difference / 60000) % 60;  
    } else {
      return 0;
    }
  };
  
  
  /*
   * Count the current progress, and express it in hours
   */
  $scope.progressTimerInHours = function(task) {
    if(task.isTimerRunning) {
      var current = new Date();
      var difference = current - task.progress[task.progress.length - 1].timerLastStarted;
      return Math.floor(difference / 3600000);  
    } else {
      return 0;
    }
  };
  
  
  /*
   *Reload tasks every time home tab is entered
   */
  $scope.$on("$ionicView.enter", function(){
    TaskService.getAll(function(err,tasks){
      $scope.allTasks = tasks;
    }); 
  });
  
  
  /*
   *Navigation for create button
   */
  $scope.navCreateClick = function() {
    $state.go('tab.create'); 
  };
  
})


/*
 * Controller for timer
 */
.controller('TimerCtrl', function($scope, $timeout, TaskService) {
    $scope.counter = 0;
 
    var mytimeout = null; // the current timeoutID


    $scope.onTimeout = function() {
        mytimeout = $timeout($scope.onTimeout, 1000);
    };
 
   
   /*
    * Start the timer, create a new progress array entry 
    */
    $scope.startTimer = function(task) {
       var progress = {
          task_id: task.id,
          date: new Date(),
          progress: 0,
          timerLastStarted: new Date()
       };
       task.progress.push(progress);
       task.isTimerRunning = true;
       TaskService.updateTask(task);
       mytimeout = $timeout($scope.onTimeout, 1000);
    };
 
 
    /*
     * Stop and reset the current timer
     */ 
    $scope.stopTimer = function(task) {
        var current_time = new Date(); 
        var last_started = task.progress[task.progress.length - 1].timerLastStarted;
        task.progress[task.progress.length - 1].progress = current_time - last_started;
        task.isTimerRunning = false;
        TaskService.updateTask(task);
        
        $scope.$broadcast('timer-stopped', $scope.counter);
        $timeout.cancel(mytimeout);
    };
    
 
    /*
     * Triggered when the timer stops
     */ 
    $scope.$on('timer-stopped', function(event, remaining) {
            console.log('You stopped!!');
    });
});
