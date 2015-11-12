angular.module('tracktr.controllers')

.controller('SharedTaskInfoController', function ($scope, $state, $ionicHistory, SharingService, $ionicPopup, TaskService) {

  var VIEW_REPORT = "View Report";
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
  
  $scope.options= [ VIEW_REPORT];
  
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
    
     if(option === VIEW_REPORT){
      $state.go('charts', {taskId:task.id});  
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
});