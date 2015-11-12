angular.module('tracktr.controllers')
.controller("HabitAllController", function($scope, $state, $ionicPopup, TaskService) {

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
     
  $scope.tasks = [];
  $scope.options= [EDIT, VIEW_REPORT, DELETE];
  

  //Get all tasks from DB everytime this view is entered
  $scope.$on("$ionicView.enter", function(){
    TaskService.getAll(function(err,tasks){
    $scope.tasks = tasks;
    // for(var i = 0; i< $scope.tasks.length; i++){
    // TaskService.deleteTask($scope.tasks[i], function(err){});
    // }
  }); 
  });
  
  //Put in dummy data
  // for(var i = 0; i < tasks2.length; i++){
  //   TaskService.createTask(tasks2[i], function(err,id){
  //   });
  // }
   
  /**
   * Returns boolean to tell us
   * if options for the specified task is shown
   */
  $scope.isGroupShown = function(task){
    return $scope.shownGroup === task;
  };
  
  /**
   * Toggle task to show options
   */
  $scope.toggleGroup = function(task){
    if($scope.isGroupShown(task)){
      $scope.shownGroup = null;
    }else{
      $scope.shownGroup = task;
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
      $state.go('edit', {habitId:task.id});
    }else if(option === VIEW_REPORT){
      $state.go('charts', {taskId:task.id});
    }else{
    
    var confirmPopup = $ionicPopup.confirm({
      title: 'Delete Task?',
      template: 'Are you sure you want to delete this task?'
    });
    
    confirmPopup.then(function(confirm){
      
      if(confirm){
        TaskService.deleteTask(task, function(err){
          var index = $scope.tasks.indexOf(task);
          $scope.tasks.splice(index,1);
          $ionicPopup.alert({
            title: 'Success!',
            template: 'Task successfully deleted.'
          });
          
        });
      }
      
    });
     
    }
  };
  
  /**
   * Retrieves the data of the task
   */
  $scope.retrieveData=function(task){
    var result = "";
    
    if(task.isCount === true && task.isTime === false){
    result += task.getProgress() +  "/" + task.goal;
    result += " | " + $scope.getFrequency(task.frequency);
    }else if (task.isCount === false && task.isTime === true){
    result += $scope.getFrequency(task.frequency);                
    }
    
      
    if($scope.getDaysOfOccurence(task.days) != ""){
      result += " | "+ $scope.getDaysOfOccurence(task.days);
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
   * days is an object
   * 
   * Return the days of
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
   * days is an object
   * Checks if the selected task is
   * supposed to occur today.
   */
  $scope.doesTaskOccurToday = function(days){
    var today = new Date();
    var dayIndex = today.getDay();
    
    var  dayOfWeek = $scope.dayOfWeekAsString(dayIndex);
      for(var field in days){
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
  
  /**
   * Returns boolean to tell whether task should be displayed in current.
   * 
   * aTask is a valid task object
   */
  $scope.shouldDisplayInCurrent = function(aTask){
    
    var isActive = (aTask.isActive==1);
    
    //If task is weekly or monthly, it should automatically be displayed in current
    if(aTask.frequency === 0){
      //daily
      var result = $scope.doesTaskOccurToday(aTask.days) && isActive;
      return result;
    }else{
      //not daily
      return (true && isActive);
    }
  };
  
  /**
   * This method is called when
   * the user switches the task
   * to active/in-active
   */
  $scope.updateIsActive=function(task){
    TaskService.updateTask(task, function(err){});
  };
  
  /** 
   * Converts a day of week number to a string
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

