angular.module('tracktr.controllers')
  .controller("HabitAllController", function ($scope, $state, $ionicPopup, TaskService, SharingService) {

/*
each controller needs to have it's own scope
which is where you save all your variables for your controller
that way your HTML can access it
$state is for the views, you don't need to worry about it
*/

    /**
     * Constants  
     **/
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

    //Get all tasks from DB everytime this view is entered
    $scope.$on("$ionicView.enter", function () {
      TaskService.getAll(function (err, tasks) {

        $scope.tasks = tasks;
        
        // If nothing in the database.
        if ($scope.tasks.length == 0) {
          //Put in dummy data

          // for(var i = 0; i < tasks2.length; i++){
          //   TaskService.createTask(tasks2[i], function(err,id){
          //   });
          // }
        }
        // Delete everything
        // for(var i = 0; i< $scope.tasks.length; i++){
        // TaskService.deleteTask($scope.tasks[i], function(err){});
        // }
      });
    });
    
    
    
    /**
     * Retrieves the data of the task
     */
    $scope.retrieveData = function (task) {
      var result = "";
      if (task.isCount === true && task.isTime === false) {
        result += task.getProgress() + "/" + task.goal;
        result += " | " + $scope.getFrequency(task.frequency);
      } else if (task.isCount === false && task.isTime === true) {
        //task.getTotalTime is already been properly formatted
        result += (task.getTotalTime()) + "/" + $scope.properFormat(task.getGoalTime());
        result += " | " + $scope.getFrequency(task.frequency);
      }

      if ($scope.getDaysOfOccurence(task.days) != "" && task.frequency == 0) {
        result += " | " + $scope.getDaysOfOccurence(task.days);
      }
      return result;
    };
    
    /**
     * Properly format the time to display hh:mm:ss
     * 
     * timeString is a String
     */
    $scope.properFormat = function(timeString) {
      var timeArray = timeString.split(":");
      var properTimeString = "";
      properTimeString += pad(timeArray[0]);
      properTimeString += ":" + timeArray[1];
      properTimeString += ":" + timeArray[2]
      return properTimeString;
    };
  
    /**
     * Returns the frequency of a task as a string
     * 
     * frequencyId is an integer
     */
    $scope.getFrequency = function (frequencyId) {
      if (frequencyId === 0) {
        return DAILY;
      }
      else if (frequencyId === 1) {
        return WEEKLY;
      } else {
        return MONTHLY;
      }
    };
  
    /**
     * Return the days of
     * occurence of a task as a string
     * 
     * days is an object
     */
    $scope.getDaysOfOccurence = function (days) {
      var result = "";
      if (days.sunday === true) {
        result += SUNDAY + " ";
      }

      if (days.monday === true) {
        result += MONDAY + " ";
      }

      if (days.tuesday === true) {
        result += TUESDAY + " ";
      }

      if (days.wednesday === true) {
        result += WEDNESDAY + " ";
      }

      if (days.thursday === true) {
        result += THURSDAY + " ";
      }

      if (days.friday === true) {
        result += FRIDAY + " ";
      }

      if (days.saturday === true) {
        result += SATURDAY + " ";
      }

      return result;
    };
      
    /**
     * Checks if the selected task is
     * supposed to occur today.
     * 
     * days is an object
     */
    $scope.doesTaskOccurToday = function (days) {
      var today = new Date();
      var dayIndex = today.getDay();
      var dayOfWeek = $scope.dayOfWeekAsString(dayIndex);
      
      for (var field in days) {
        if (field === dayOfWeek) {
          if (days[field] === true) {
            return true;
          } else {
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
    $scope.shouldDisplayInCurrent = function (aTask) {
      var isActive = (aTask.isActive == 1);
    
      //If task is weekly or monthly, it should automatically be displayed in current
      if (aTask.frequency === 0) {
        var result = $scope.doesTaskOccurToday(aTask.days) && isActive;
        return result;
      } else {
        return isActive;
      }
    };
  
    /**
     * This method is called when
     * the user switches the task
     * to active/in-active
     */
    $scope.updateIsActive = function (task) {
      TaskService.updateTask(task, function (err) { });
    };
  
    /** 
     * Converts a day of week number to a string
    */
    $scope.dayOfWeekAsString = function (dayIndex) {
      return ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][dayIndex];
    };
  
    /**
     * Click handler for new habit button
     */
    $scope.navCreateClick = function () {
      $state.go('tab.create');
    }
  });

