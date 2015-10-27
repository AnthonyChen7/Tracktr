angular.module('tracktr.controllers', [])

.controller('HomeController', function($scope, $state, TaskService) {
  
  $scope.allTasks;
        
  
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
    $scope.startProgress(task);
    task.progress[task.progress.length - 1].progress+=1;
    TaskService.updateTask(task, function(err){});
  };
  
  
  /*
   * Start a new progress, if the task has an empty progress array
   */
  $scope.startProgress = function(task) {
    var progress = {
      task_id: task.id,
      date: new Date(),
      progress: 0,
      timerLastStarted: null
    };
      task.progress.push(progress);
      // TaskService.updateTask(task);
  };
  
  
  /*
   * Count the total progress of the task 
   */
  $scope.countProgress = function(task){
    var result = 0;
    if(task.isCount) {
       for(var i = 0; i < task.progress.length; i++){
         result += task.progress[i].progress;
       }
    }
    return result;
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


/*Controller for timer
*TODO: does not handle hours for now, need to figure out how to not trigger incCount
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
 
 
    // stops and resets the current timer
    $scope.stopTimer = function(task) {
        var current_time = new Date(); 
        var last_started = task.progress[task.progress.length - 1].timerLastStarted;
        task.progress[task.progress.length - 1].progress = current_time - last_started;
        task.isTimerRunning = false;
        TaskService.updateTask(task);
        
        $scope.$broadcast('timer-stopped', $scope.counter);
        $timeout.cancel(mytimeout);
    };
    
 
    // triggered, when the timer stops, you can do something here, maybe show a visual indicator or vibrate the device
    $scope.$on('timer-stopped', function(event, remaining) {
            console.log('You stopped!!');
    });
});
