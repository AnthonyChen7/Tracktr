angular.module('tracktr.controllers')


   .controller("HabitAllController", function($scope, $state, $ionicPopup, $ionicFilterBar) {
    
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
  

  var allTasks = [{
      id: 0,
      name: 'Daily Everyday Not Active',
      isActive: false,
      frequency: 0, //daily
      days: [0,1,2,3,4,5,6],
      goal: 5,
      record: [5]
    }, {
      id: 1,
      name: 'Daily Active Some days',
      isActive: true,
      frequency: 0, //daily
      days: [0,1,3],
      goal: 5,
      record: [5]
    }, {
          id: 2,
      name: 'Weekly Active Some days',
      isActive: true,
      frequency: 1, //weekly
      days: [0,1,3],
      goal: 5,
      record: [5,5]
    }, {
      id: 3,
      name: 'monthly Active Some days',
      isActive: true,
      frequency: 2, //monthly
      days: [2,4],
      goal: 5,
      record: [5]
    },
    {
      id: 4,
      name: 'monthly Active no days',
      isActive: true,
      frequency: 2, //monthly
      days: [],
      goal: 5,
      record: [5]
    },
    {
      id: 5,
      name: 'monthly Active one day',
      isActive: true,
      frequency: 2, //monthly
      days: [4],
      goal: 5,
      record: [5]
    }
  ];  
  
  $scope.items = allTasks;
  
  $scope.groups = [];
  
  for(var i = 0; i< $scope.items.length; i++){
    $scope.groups[i]={
      task: $scope.items[i],
      options: [EDIT, VIEW_REPORT, DELETE]
    };
  }
  
  $scope.isGroupShown = function(group){
    return $scope.shownGroup === group;
  };
  
  $scope.toggleGroup = function(group){
    if($scope.isGroupShown(group)){
      $scope.shownGroup = null;
    }else{
      $scope.shownGroup = group;
    }
  };
  
  $scope.buttonHandler = function(option, task){
    var result = "";
    if(option == EDIT){
      $state.go('tab.edit', {habitId:task.id});
    }else if(option == VIEW_REPORT){
      $state.go('tab.charts');
    }else{
      var popUp = $ionicPopup.alert({
      title: "Warning!",
      template: "This feature isn't implemented yet!"
    });
    }
  };
  
  $scope.retrieveDescription=function(group){
    var result = "";
    result += "Goal: " + group.task.goal + " | "+$scope.getFrequency(group.task.frequency);
    
    if(group.task.days.length != 0){
      result += " |"+ $scope.getDaysOfOccurence(group.task.days);
    }
    
    return result;
  };
  
  $scope.getFrequency = function(frequencyId){
    if(frequencyId == 0){
      return DAILY;
    }
    else if(frequencyId==1){
      return WEEKLY;
    }else{
      return MONTHLY;
    }
  };
  
  $scope.getDaysOfOccurence= function(days){
    var result = "";
    if(days.length == 7){
      return " "+EVERYDAY;
    }else{
      for(var i in days){
        if(days[i] == 0){
          result+= " "+SUNDAY;
        }else if(days[i] == 1){
          result += " "+MONDAY;
        }else if(days[i] == 2){
          result += " "+TUESDAY;
        }else if(days[i] == 3){
          result += " "+WEDNESDAY;
        }else if(days[i] == 4){
          result += " "+THURSDAY;
        }else if(days[i] == 5){
          result += " "+FRIDAY;
        }else if(days[i] == 6){
          result += " "+SATURDAY;
        }
      }
      return result;
    }
  };
  
  
  $scope.countProgress = function(progressArray){
    //TODO needs to be implemented
  };
  
  /**
   * Click handler for new habit button
   */
  $scope.navCreateClick = function() {
    $state.go('tab.create'); 
  }
	
});

