angular.module('tracktr.controllers')

.controller('FriendsController', function ($scope, $state, $ionicHistory, SharingService) {
	var authKey = window.localStorage['FBAUTHKEY'];
	
	$scope.isAuthenticated = (authKey != null);	
	
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
				$scope.isAuthenticated = true;				
			}
		});
	};
	
	$scope.logout = function() {
		try {
			
			SharingService.logoutFB();
			$scope.isAuthenticated = false;
			window.localStorage['FBAUTHKEY'] = null;
				
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
		SharingService.getPicture(function(err, url) {
			if(err) {
				console.log(err);
			} else {
				$scope.profile_url = url;
			}
			
		})
	};
	
	if($scope.isAuthenticated) {
		$scope.getName();
		$scope.getProfileURL();
	}

	
});