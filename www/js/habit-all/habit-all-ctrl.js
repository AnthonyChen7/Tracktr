angular.module('tracktr.controllers')

// .controller("HabitAllController", function($scope, $state) {
  .controller("HabitAllController", function($scope, $state, $ionicPopup) {
    
 var EDIT = "Edit";
 var VIEW_REPORT = "View Report";
 var DELETE = "Delete";
  

  var allTasks = [{
      id: 0,
      name: 'Daily Everyday Not Active',
      isActive: false,
      frequency: 0, //daily
      days: [0,1,2,3,4,5,6,7],
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
      id: 2,
      name: 'monthly Active Some days',
      isActive: true,
      frequency: 2, //monthly
      days: [2,4],
      goal: 5,
      record: [5]
    }
  ];  
  
  $scope.items = allTasks;
  
  $scope.groups = [];
  
  for(var i = 0; i< $scope.items.length; i++){
    $scope.groups[i]={
      name: $scope.items[i],
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
      $state.go('tab.edit');
    }else if(option == VIEW_REPORT){
      $state.go('tab.charts');
    }else{
      var popUp = $ionicPopup.alert({
      title: "Alert!",
      template: "To be implemented...."
    });
    }
    
    
    
  };
  
  $scope.someFunction=function(group){
    var result = "";
    result += "Goal: " + group.name.goal;
    return result;
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

