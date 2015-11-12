angular.module('tracktr.controllers')

.controller('FriendsController', function ($scope, $state, $ionicHistory, SharingService) {
	
	$scope.isAuthenticated = SharingService.isAuthenticated();
	
	
	$scope.goBack = function() {
		$ionicHistory.goBack();
	};
	
	$scope.fbAuthentication = function() {
		SharingService.authenticateFB(function(err) {
			if(err) {
				console.error(err);
			} else {
				$scope.getName();
				$scope.getProfileURL();
				$scope.getFriends();
				$scope.isAuthenticated = true;				
			}
		});
	};
	
	$scope.logout = function() {
		try {
			
			SharingService.logoutFB();
			$scope.isAuthenticated = false;
				
		} catch (err) {
			console.log(err);		
		}
		
	}
	
	$scope.getName = function() {
		SharingService.getName(function(err, name) {
			if(err) {
				console.log(err);
			} else {
				$scope.name = name;	
			}
			
		});
	};
	
	$scope.getProfileURL = function() {
		SharingService.getPicture(SharingService.getAuthData().id, function(err, url) {
			if(err) {
				console.log(err);
			} else {
				$scope.profile_url = url;
			}
			
		})
	};
	
	$scope.getFriends = function() {
		SharingService.getFriends(function(err, friends) {
			if(err) {
				console.log(err);
			} else {
				$scope.friends = friends;
				$scope.getFriendsTasks();
			}
		});
	};
	
	$scope.getFriendsTasks = function() {
		angular.forEach($scope.friends, function(friend) {
			friend.sharedTasks = SharingService.getOneFriendsTasks(friend);
		});
	} 
	
	if(SharingService.isAuthenticated()) {
		$scope.getName();
		$scope.getProfileURL();
		$scope.getFriends();
	}

	
});