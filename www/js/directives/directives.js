var appDirs = angular.module('tracktr.directives',[]);

appDirs.directive('progressCircle1', function() {
	var directive = {};
	directive.restrict = 'E';
	directive.compile = function(element, attributes) {
		return {
			pre: function($scope, element, attributes) {
				element.html("<div class='progress-circle' id='circle-" + $scope.task.id + "'></div>");
			},
			
			post: function($scope, element, attributes) {
				$scope.drawCircle($scope.task);
        	}
		};
	}
	return directive;
});

appDirs.directive('progressCircle2', function() {
	var directive = {};
	directive.restrict = 'E';
	directive.compile = function(element, attributes) {
		return {
			pre: function($scope, element, attributes) {
				var nextId = $scope.task.id + 1;
				element.html("<div class='progress-circle' id='circle-" + nextId + "'></div>");
			},
			
			post: function($scope, element, attributes) {
				var nextId = $scope.task.id;
				$scope.drawCircle($scope.allTasks[nextId]);
        	}
		};
	}
	return directive;
});

appDirs.directive('taskIcon1', function() { 
	var directive = {};
	directive.restrict = 'E';
	directive.compile = function(element, attributes) {
		return {
			pre: function($scope, element, attributes) {
				
			},
			
			post: function($scope, element, attributes) {
				var iconClass = $scope.getIconClass($scope.task.icon);
				element.html("<i class='" + iconClass + " icon-colored' id='icon-" + $scope.task.id + "'></i>");
        	}
		};
	}
	return directive;  
});

appDirs.directive('taskIcon2', function() { 
	var directive = {};
	directive.restrict = 'E';
	directive.compile = function(element, attributes) {
		return {
			pre: function($scope, element, attributes) {
				
			},
			
			post: function($scope, element, attributes) {
				var nextId = $scope.task.id;
				var nextId2 = $scope.task.id + 1;
				var iconClass = $scope.getIconClass($scope.allTasks[nextId].icon);
				element.html("<i class='" + iconClass + " icon-colored' id='icon-" + nextId2 + "'></i>");
        	}
		};
	}
	return directive;  
});

appDirs.directive('taskInfo',function(){
	return{
		restrict: 'E',
		templateUrl: 'js/directives/task-info/task-info.html',
		controller: 'TaskInfoController'
	};
});

appDirs.directive('sharedTaskInfo',function(){
	return{
		restrict: 'E',
		templateUrl: 'js/directives/shared-task-info/shared-task-info.html',
		controller: 'SharedTaskInfoController'
	};
});