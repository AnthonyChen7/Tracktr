angular.module('tracktr.directives',[])
.directive('taskInfo',function(){
	return{
		restrict: 'E',
		templateUrl: 'js/directives/task-info/task-info.html'
	};
});