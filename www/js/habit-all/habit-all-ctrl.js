angular.module('tracktr.controllers')
.controller("HabitAllController", function($scope, $state, $ionicPopup, $ionicFilterBar, TaskService) {

/**
 * Constants  
 **/  
 var EDIT = "Edit";
 var VIEW_REPORT = "View Report";
 var DELETE = "Delete";
 var DAILY = "Daily";
 var MONTHLY = "Monthly";
 var WEEKLY = "Weekly";
 var MONDAY = "M";
 var TUESDAY = "T";
 var WEDNESDAY = "W";
 var THURSDAY = "Th";
 var FRIDAY = "F";
 var SATURDAY = "Sa";
 var SUNDAY = "Su";

 var someDate = new Date();
  
/**
 * Temporary list of tasks
 */
var allTasks = [   
    {
      id: 1,
     name: 'Daily Everyday Not Active',
     isActive: 0,
     frequency: 0,
     isTime: 0,
     isCount: 1, 
     goal: 10,
     icon: 0,
     isTimerRunning: 0,
     creationDate: someDate,
     days: {
       id: '1',
       task_id: '1',
       sunday: 0,
       monday: 0,
       tuesday: 0,
       wednesday: 0,
       thursday: 0,
       friday: 0,
       saturday: 0
     },
     progress: [
       {
         id: '1',
         task_id: '1',
         date: someDate,
         progress: 10,
         timerLastStarted: someDate
       }
     ]
    },
    
    {
      id: 2,
     name: 'Daily Active Some days',
     isActive: 1,
     frequency: 0,
     isTime: 0,
     isCount: 1, 
     goal: 10,
     icon: 0,
     isTimerRunning: 0,
     creationDate: someDate,
     days: {
       id: '1',
       task_id: '1',
       sunday: 1,
       monday: 1,
       tuesday: 0,
       wednesday: 1,
       thursday: 0,
       friday: 0,
       saturday: 0
     },
     progress: [
       {
         id: '1',
         task_id: '1',
         date: someDate,
         progress: 10,
         timerLastStarted: someDate
       }
     ]
    },
    
     {
       id: 3,
     name: 'Weekly Active Some days',
     isActive: 1,
     frequency: 1,
     isTime: 0,
     isCount: 1, 
     goal: 10,
     icon: 0,
     isTimerRunning: 0,
     creationDate: someDate,
     days: {
       id: '1',
       task_id: '1',
       sunday: 1,
       monday: 1,
       tuesday: 1,
       wednesday: 1,
       thursday: 0,
       friday: 0,
       saturday: 1
     },
     progress: [
       {
         id: '1',
         task_id: '1',
         date: someDate,
         progress: 10,
         timerLastStarted: someDate
       }
     ]
    },
    
    {
      id: 4,
     name: 'monthly Active Some days',
     isActive: 1,
     frequency: 2,
     isTime: 0,
     isCount: 1, 
     goal: 10,
     icon: 0,
     isTimerRunning: 0,
     creationDate: someDate,
     days: {
       id: '1',
       task_id: '1',
       sunday: 0,
       monday: 0,
       tuesday: 0,
       wednesday: 1,
       thursday: 0,
       friday: 0,
       saturday: 1
     },
     progress: [
       {
         id: '1',
         task_id: '1',
         date: someDate,
         progress: 10,
         timerLastStarted: someDate
       }
     ]
    },
    
    {
      id: 5,
     name: 'monthly Active no days',
     isActive: 1,
     frequency: 2,
     isTime: 0,
     isCount: 1, 
     goal: 10,
     icon: 0,
     isTimerRunning: 0,
     creationDate: someDate,
     days: {
       id: '1',
       task_id: '1',
       sunday: 0,
       monday: 0,
       tuesday: 0,
       wednesday: 0,
       thursday: 0,
       friday: 0,
       saturday: 0
     },
     progress: [
       {
         id: '1',
         task_id: '1',
         date: someDate,
         progress: 10,
         timerLastStarted: someDate
       }
     ]
    },
    
    {
      id: 6,
     name: 'monthly not Active one day',
     isActive: 0,
     frequency: 2,
     isTime: 0,
     isCount: 1, 
     goal: 10,
     icon: 0,
     isTimerRunning: 0,
     creationDate: someDate,
     days: {
       id: '1',
       task_id: '1',
       sunday: 0,
       monday: 0,
       tuesday: 0,
       wednesday: 0,
       thursday: 1,
       friday: 0,
       saturday: 0
     },
     progress: [
       {
         id: '1',
         task_id: '1',
         date: someDate,
         progress: 10,
         timerLastStarted: someDate
       }
     ]
    }
    
  ];  
  
  $scope.items = [];
  $scope.options= [EDIT, VIEW_REPORT, DELETE];
  
  //Put in dummy data
  // for(var i = 0; i < allTasks.length; i++){
  //    TaskService.createTask(allTasks[i], function(err,id){
  //    });
  // }
  
  //Retreive all tasks from db
  TaskService.getAll(function(err,tasks){
    $scope.items = tasks;
    // for(var i = 0; i< $scope.items.length; i++){
    // TaskService.deleteTask($scope.items[i], function(err){});
    // }
  });

    
  /**
   * Returns boolean to tell us
   * if options are shown
   */
  $scope.isGroupShown = function(group){
    return $scope.shownGroup === group;
  };
  
  /**
   * Toggle tasks to show options
   */
  $scope.toggleGroup = function(group){
    if($scope.isGroupShown(group)){
      $scope.shownGroup = null;
    }else{
      $scope.shownGroup = group;
    }
  };
  
  /**
   * Option is a string
   * task is a task
   * Based on options selected,
   * it will bring user to the correct page
   */
  $scope.buttonHandler = function(option, task){
    if(option === EDIT){
      $state.go('tab.edit', {habitId:task.id});
    }else if(option === VIEW_REPORT){
      $state.go('tab.charts');
    }else{
    
    var confirmPopup = $ionicPopup.confirm({
      title: 'Delete Task',
      template: 'Are you sure you want to delete this task?'
    });
    
    confirmPopup.then(function(confirm){
      
      if(confirm){
        TaskService.deleteTask(task, function(err){
          var index = $scope.items.indexOf(task);
          $scope.items.splice(index,1);
          $ionicPopup.alert({
            title: 'Success',
            template: 'Task successfully deleted.'
          });
          
        });
      }
      
    });
     
    }
  };
  
  /**
   * Retrieves the description of the task
   */
  $scope.retrieveDescription=function(item){
    var result = "";
    result += $scope.countProgress(item.progress) +  "/" + item.goal + " | " + $scope.getFrequency(item.frequency);
        
    if($scope.getDaysOfOccurence(item.days) != ""){
      result += " | "+ $scope.getDaysOfOccurence(item.days);
    }
    return result;
  };
  
  /**
   * frequencyId is an integer
   * Returns the frequency of a task as a string
   */
  $scope.getFrequency = function(frequencyId){
    if(frequencyId === 0){
      return DAILY;
    }
    else if(frequencyId===1){
      return WEEKLY;
    }else{
      return MONTHLY;
    }
  };
  
  /**
   * days is an array of integer
   * 
   * Return the number of days of
   * occurence of a task as a string
   */
  $scope.getDaysOfOccurence= function(days){
    var result = "";
    if(days.sunday === true){
      result += SUNDAY + " ";
    }
    
    if(days.monday === true){
      result += MONDAY+ " ";
    }
    
    if(days.tuesday === true){
      result += TUESDAY+ " ";
    }
    
    if(days.wednesday === true){
      result += WEDNESDAY+ " ";
    }
    
    if(days.thursday === true){
      result += THURSDAY+ " ";
    }
    
    if(days.friday === true){
      result += FRIDAY+ " ";
    }
    
    if(days.saturday === true){
      result += SATURDAY+ " ";
    }
    
    return result;
  };
    
  /**
   * Retreives the progress of a task.
   * Returns an integer.
   */
  $scope.countProgress = function(progressArray){
    var result = 0;
    for(var i = 0; i < progressArray.length; i++){
      result += progressArray[i].progress;
    }
    return result;
  };
  
  /**
   * days is an array of integer
   * Checks if the selected task is
   * supposed to occur today.
   */
  $scope.doesTaskOccurToday = function(days){
    var today = new Date();
    var dayIndex = today.getDay();
    
    var  dayOfWeek = $scope.dayOfWeekAsString(dayIndex);
      
      for(field in days){
        if(field === dayOfWeek){
          if(days[field]===true){
            return true;
          }else{
            return false;
          }
        }
      }
      return false;
  };
  
  $scope.updateIsActive=function(item){
    TaskService.updateTask(item, function(err){});
  };
  
  /** 
   * Converts a day number to a string
  */
  $scope.dayOfWeekAsString = function(dayIndex){
    return ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"][dayIndex];
  };
  
  /**
   * Click handler for new habit button
   */
  $scope.navCreateClick = function() {
    $state.go('tab.create'); 
  }
	
});

