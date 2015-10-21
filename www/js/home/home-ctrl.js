angular.module('tracktr.controllers', [])

.controller('HomeController', function($scope, $state, TaskService) {
  
  
  var emptyArray = [];
	var currentDate = new Date();
	var aDays = { id:1, sunday: 0, monday: 1, tuesday: 1, wednesday: 1, 
		thursday: 0, friday: 1, saturday: 0 };
	var tasks = 
  [
    { 
     id: 1,
     name: "Read for 5 minutes",
     isActive: true,
     frequency: 0, 
     isCount: 1,
     isTime: 0,
     goal: 5,
     icon: 0, 
     count:0,
     isTimerRunning: false,
     creationDate: currentDate,
     progress: [{
        id: 1,
        task_id: 1,
        date: currentDate,
        progress: 0,
        timerLastStarted: currentDate
      }],
		 days: { id:1, sunday: 0, monday: 1, tuesday: 1, wednesday: 1, 
		thursday: 0, friday: 1, saturday: 0 }
    },
    { id:2,
      name: "Watch a Cosmos episode",
      isActive: true, 
      frequency: 0,
      isCount: 1,
      isTime: 0,
      goal: 60,
      icon: 0,
      count:0,
      isTimerRunning: false,
      creationDate: currentDate,
      progress: [{
        id: 2,
        task_id: 2,
        date: currentDate,
        progress: 5,
        timerLastStarted: currentDate
      }],
		  days: { id:1, sunday: 0, monday: 1, tuesday: 1, wednesday: 1, 
		thursday: 0, friday: 1, saturday: 0 } 
    }
  ];
  
  $scope.allTasks;
  
  
  //  $scope.allTasks; 
        
  
  //Get all tasks from the DB
 TaskService.getAll(function(err,tasks){
    $scope.allTasks = tasks;
    // for(var i = 0; i< $scope.tasks.length; i++){
    // TaskService.deleteTask($scope.tasks[i], function(err){});
    // }
  });
  
 //Put in dummy data
  for(var i = 0; i < tasks.length; i++){
    // TaskService.createTask(tasks[i], function(err,id){
    // });
  }
  
  // $scope.currentTasks = tasks;
  
  //Get the current tasks, from fitering the results from TaskService.getAll
  $scope.getCurrentTasks = function() {
    return $scope.currentTasks;
  };
  
  // $scope.getProgress = function(id) {
  //   for(i = 0; i < $scope.progress; i++) {
  //     if(id === $scope.progress[i].id) {
  //       return $scope.progress[i].progress;
  //     }
  //   }
  // };
  
  
  //Increment the count of count tasks
  $scope.incCount = function(task) {
    task.progress[0].progress+=1;
    TaskService.updateTask(task, function(err){});
  };
  
  $scope.navCreateClick = function() {
    $state.go('tab.create'); 
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
  
  */
  
});
