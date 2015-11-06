angular.module('tracktr.controllers')

.controller("HabitChartsController", function($scope, $stateParams, TaskService) {
	$scope.testBoolean = true;
  $scope.taskId = $stateParams.taskId;
	console.log($scope.taskId);
	$scope.labels = ['Nov. 1', 'Nov. 2', 'Nov. 3', 'Nov. 4', 'Nov. 5', 'Nov. 6', 'Nov. 7','Nov. 8','Nov. 9','Nov. 10','Nov. 11','Nov. 12','Nov. 13'];
  $scope.series = ['Series A', 'Series B'];

  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.task_progress = [];
  $scope.progress=[[]];
 
  
  $scope.loadProgress = function() {
    TaskService.getTaskById($scope.taskId, function(err, task) { 
      $scope.task = task;
      
      for(var i = 0; i < task.progress.length; i++) {
        $scope.progress[0][i] = task.progress[i].progress;
        console.log("progress " + i + " is " + $scope.progress[0][i]);
      }
    });
  };
});