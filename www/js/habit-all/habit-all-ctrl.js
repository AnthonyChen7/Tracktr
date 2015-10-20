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
 var EVERYDAY = "Every day";
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
     id: '0',
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
     id: '1',
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
     id: '2',
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
     id: '3',
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
     id: '4',
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
     id: '4',
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
  $scope.groups = [];
  
  //Put in dummy data
  // for(var i = 0; i < allTasks.length; i++){
  //   TaskService.createTask(allTasks[i], function(err,id){
      
  //   });
  // }
  
  //Retreive all tasks from db
  TaskService.getAll(function(err,tasks){
    $scope.items = tasks;
 
   /**
   * For each task, add option to
   * edit, view, delete
   */
      for(var i = 0; i< $scope.items.length; i++){
    $scope.groups[i]={
      task: $scope.items[i],
      options: [EDIT, VIEW_REPORT, DELETE]
    }
    
  }
  
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
          $scope.groups.splice(index,1);
          
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
  $scope.retrieveDescription=function(group){
    var result = "";
    result += "Goal: " + group.task.goal + " | "+$scope.getFrequency(group.task.frequency);
    // if(group.task.days.length != 0){
    //   result += " |"+ $scope.getDaysOfOccurence(group.task.days);
    // }
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
    if(days.length === 7){
      return " "+EVERYDAY;
    }else{
      for(var i in days){
        if(days[i] === 0){
          result+= " "+SUNDAY;
        }else if(days[i] === 1){
          result += " "+MONDAY;
        }else if(days[i] === 2){
          result += " "+TUESDAY;
        }else if(days[i] === 3){
          result += " "+WEDNESDAY;
        }else if(days[i] === 4){
          result += " "+THURSDAY;
        }else if(days[i] === 5){
          result += " "+FRIDAY;
        }else if(days[i] === 6){
          result += " "+SATURDAY;
        }
      }
      return result;
    }
  };
  
  $scope.convertToBoolean = function(integer){
    if(integer === 1){
      return true;
    }else{
      return false;
    }
  };
  
  /**
   * Retreives the progress of a task.
   * Returns an integer.
   */
  $scope.countProgress = function(progressArray){
    //TODO needs to be implemented
  };
  
  /**
   * days is an array of integer
   * Checks if the selected task is
   * supposed to occur today.
   */
  $scope.doesTaskOccurToday = function(days){
    // var today =  new Date();
    // var dayOfWeek = today.getDay();
    
    // if(days.indexOf(dayOfWeek) > -1){
    //   return true;
    // }else{
    //   return false;
    // }    
  };
  
  /**
   * Click handler for new habit button
   */
  $scope.navCreateClick = function() {
    $state.go('tab.create'); 
  }
	
});

