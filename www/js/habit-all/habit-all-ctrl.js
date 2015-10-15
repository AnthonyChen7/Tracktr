angular.module('tracktr.controllers', ['tasks'] ) // 'tasks' is causing error

.controller("HabitAllController", function($scope, $state) {
  
  /**
   * Click handler for new habit button
   */
  $scope.navCreateClick = function() {
    $state.go('tab.create'); 
  }
	
});

(function(){
  
var app = angular.module('tasks',[]);

app.controller('TasksAllController', function($scope){
  
  this.tasks = allTasks;
  
  $scope.items = allTasks;
  
});

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
  
})();

