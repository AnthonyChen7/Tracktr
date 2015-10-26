angular.module('tracktr.controllers', [])

.controller('HomeController', function($scope, $state, TaskService) {
  
  
  var emptyArray = [];
	var currentDate = new Date();
	// var aDays = { id:1, sunday: 0, monday: 1, tuesday: 1, wednesday: 1, 
	// 	thursday: 0, friday: 1, saturday: 0 };
	// var tasks = 
  // [
  //   { 
  //    id: 1,
  //    name: "Read for 5 minutes",
  //    isActive: true,
  //    frequency: 0, 
  //    isCount: 1,
  //    isTime: 0,
  //    goal: 5,
  //    icon: 0, 
  //    count:0,
  //    isTimerRunning: false,
  //    creationDate: currentDate,
  //    progress: [{
  //       id: 1,
  //       task_id: 1,
  //       date: currentDate,
  //       progress: 0,
  //       timerLastStarted: currentDate
  //     }],
	// 	 days: { id:1, sunday: 0, monday: 1, tuesday: 1, wednesday: 1, 
	// 	thursday: 0, friday: 1, saturday: 0 }
  //   },
  //   { id:2,
  //     name: "Watch a Cosmos episode",
  //     isActive: true, 
  //     frequency: 0,
  //     isCount: 1,
  //     isTime: 0,
  //     goal: 60,
  //     icon: 0,
  //     count:0,
  //     isTimerRunning: false,
  //     creationDate: currentDate,
  //     progress: [{
  //       id: 2,
  //       task_id: 2,
  //       date: currentDate,
  //       progress: 5,
  //       timerLastStarted: currentDate
  //     }],
	// 	  days: { id:1, sunday: 0, monday: 1, tuesday: 1, wednesday: 1, 
	// 	thursday: 0, friday: 1, saturday: 0 } 
  //   }
  // ];
  
  $scope.allTasks;
        
  
  //Get all tasks from the DB
 TaskService.getAll(function(err,tasks){
    $scope.allTasks = tasks;
  });
  
  
  //Get the current tasks, from fitering the results from TaskService.getAll
  $scope.getCurrentTasks = function() {
    return $scope.currentTasks;
  };
 
  
  //Increment the count of count tasks
  $scope.incCount = function(task) {
    if(task.progress.length === 0) {
      $scope.startProgress(task);
    }
    task.progress[0].progress+=1;
    TaskService.updateTask(task, function(err){});
  };
  
  
  /*Start a new progress, if the task has an empty progress array
  * TODO: DB update progress in task does not work for now, come back and test!!
  */
  $scope.startProgress = function(task) {
    var progress = {
      task_id: task.id,
      date: new Date(),
      progress: 0,
      timerLastStarted: null
    };
      task.progress.push(progress);
      TaskService.updateTask(task);
  };
  
  
  //Determine if the task is active for the current day
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
  
  
  /** 
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
  
  
  /*TODO
  * calculate the time passed in timer task
  */
  $scope.processTimer = function() {
    var current_date = new Date();
  };
  
  
  /*Reload tasks every time home tab is entered
  */
  $scope.$on("$ionicView.enter", function(){
    TaskService.getAll(function(err,tasks){
      $scope.allTasks = tasks;
    }); 
  });
  
  
  /*Navigation for create button
  */
  $scope.navCreateClick = function() {
    $state.go('tab.create'); 
  };
  
})


/*Controller for timer
*TODO: does not handle hours for now, need to figure out how to not trigger incCount
*/
.controller('TimerCtrl', function($scope, $timeout) {
    $scope.counter = 0;
 
    var mytimeout = null; // the current timeoutID
    $scope.minutes = 0;
    $scope.seconds = 0;
 
    // actual timer method, counts down every second, stops on zero
    $scope.onTimeout = function() {

        $scope.counter++;
        var div = Math.floor($scope.counter/60);
        var rem = $scope.counter % 60;
        $scope.minutes = div;
        $scope.seconds = rem;
        mytimeout = $timeout($scope.onTimeout, 1000);
    };
    
 
    $scope.startTimer = function() {
        mytimeout = $timeout($scope.onTimeout, 1000);
    };
 
 
    // stops and resets the current timer
    $scope.stopTimer = function() {
        $scope.$broadcast('timer-stopped', $scope.counter);
        $scope.seconds = 0;
        $scope.minutes = 0;
        $scope.counter = 0;
        
        $timeout.cancel(mytimeout);
    };
    
 
    // triggered, when the timer stops, you can do something here, maybe show a visual indicator or vibrate the device
    $scope.$on('timer-stopped', function(event, remaining) {
            console.log('You stopped!!');
    });
    
    
    //Disable button after it is tapped
    $scope.isDisabled = function() {
      
    };
});
