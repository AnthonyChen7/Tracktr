angular.module('tracktr.services') 
.factory('SharingService', function($http, $firebaseArray, TaskService) {
	var self = this;
	
	//============================================================//
	//					Constants
	//============================================================//
	
	// Authentication
	var FIREBASE_URL = "https://blazing-inferno-5411.firebaseio.com";
	var FB_AUTH_KEY  = "FBAUTHKEY";
	var PROFILE_URL  = "FBPROFILEURL";
	var FB_NAME      = "FBNAME";
	var ref          = new Firebase(FIREBASE_URL);
	
	
	// Sharing 
	var tasksRef      = new Firebase("https://blazing-inferno-5411.firebaseio.com/tasks");
  	var tasksRefArray = $firebaseArray(tasksRef);
	
	//============================================================//
	//					Service Methods
	//============================================================//
	
	/**
	 * Retrieve FB friends' IDs in an array
	 * @Param callback callback that takes err and response
	 */
	self.getFriends = function(callback) {
		// use fb api to get array of friends
		// return array of friends
		graphAPI("friends", {}, self.getAuthData().id,function(err, response) {
			if(err) {
				callback(err, null);
				return;
			}
			
			var friendsArray = response.data.data;
			var friendsSize = friendsArray.length;
			var receivedPicturesCount = 0;
			angular.forEach(friendsArray, function(friend) {
				self.getPicture(friend.id, function(err, url) {
					friend.picture_url = url;
					receivedPicturesCount++;
					
					if(receivedPicturesCount == friendsSize) {
						callback(null, response.data.data);			
					}	
				});
			});
		});
	};
	
	/**
	 * Retreive a friend's shared tasks in an array
	 */
	self.getOneFriendsTasks = function(friend) {
		// use the friend id to contact firebase and get their shared tasks
		// return the shared tasks
	};
	
	/**
	 * Upload a single task to share with friends
	 * @Param callback callback method taking err as an argument if there is an error.
	 */
	self.uploadTask = function(task, callback) {
		// upload task with current user id to firebase
		if(!isAuthenticated) {
			callback("Not Authenticated while trying to upload to firebase");
			return;
		}
		
		var fbID = self.getAuthData().id;
		
		// Add our facebook ID to the task
		task.fbID = fbID;
		console.log(task.fbID);
		tasksRefArray.$add(task).then(function(ref) {
			console.log("asdf");
			var id = ref.key();
			// Add the key of the task in firebase to the task
			task.firebaseRefID = id;			
			// Update the task.
			TaskService.updateTask(task, function(err) {
				callback(null);
			});
		});	
	};
	
	/**
	 * Remove the task from being shared with friends
	 * @Param callback callback method taking err as an argument if there is an error.
	 */
	self.removeTask = function(task, callback) {
		// remove the task if it exists in firebase
		if(!isAuthenticated) {
			callback("Not Authenticated while trying to delete from firebase");
			return;
		}
		
		var taskToDelete;
		// Find the task in tasksRefArray so we can delete it
		angular.forEach(tasksRefArray, function(refTask) {
			
			if(refTask.$id === task.firebaseRefID) {
				taskToDelete = refTask;
			}
		});
		// Delete the found task 
		tasksRefArray.$remove(taskToDelete).then(function(ref) {
			if(ref.key() === taskToDelete.firebaseRefID) {
				callback(null);
			} else {
				callback("Delete Failure");
			}
		});
	};
	
	/**
	 * Retrieve our shared tasks in an array of tasks
	 */
	self.getSharedTasks = function() {
		// retreive from firebase our shared tasks
	}

	
	/**
	 * Authenticate the user through facebook
	 */
	self.authenticateFB = function(callback) {
		ref.authWithOAuthPopup("facebook", function(error, authData) {
		if (error) {
			console.error("Login Failed!", error.message);
			callback(error);
		} else {
			// the access token will allow us to make Open Graph API calls
			window.localStorage[FB_AUTH_KEY] = JSON.stringify(authData.facebook);
			callback(null);
		}
		}, {
			rememberMe: true,
			scope: "user_friends" // the permissions requested
		});
	};
	
	/**
	 * Log the user out of facebook
	 * Throws exception if user is not logged in.
	 */
	self.logoutFB = function() {
		if(window.localStorage[FB_AUTH_KEY] == null) {
			throw "Not logged in";
		}
		
		ref.unauth();
		window.localStorage[FB_AUTH_KEY] = null;
	};
	
	//============================================================//
	//					Graph API Requests
	//============================================================//
	
	
	/**
	 * Retrieve the name of the user logged in and set it into local storage
	 * callback(err, name: String)
	 */
	self.getName = function(callback){
		/* make the API call */
		graphAPI('/', {}, self.getAuthData().id, function(err, response) {
			if(response) {
				window.localStorage[FB_NAME] = response.data.name;
				callback(null, response.data.name);	
			} else {
				callback(err, null);
			}
			
		});
	}
	
	/**
	 * Retrieve the url to user's profile photo and set it into local storage
	 * calback(err, url: String)
	 */
	self.getPicture = function(id, callback) {
		var params = 
			{
				redirect: false,
				type: 'normal'
			}
		graphAPI('picture', params, id, function(err, response) {
			if(response) {
				var url = response.data.data.url;
				window.localStorage[PROFILE_URL] = url;
				callback(null, response.data.data.url);	
			} else {
				callback(err, null);
			}
			
		});
	}
	
	//============================================================//
	//					Helper Methods
	//============================================================//
	
	/**
	 * Make a call to the graph api.
	 * redirect: whether or not to redirect: boolean
	 * @Param id facebook id
	 * Takes a callback(err, response)
	 */
	function graphAPI(path, params, id, callback) {
		var authData = self.getAuthData();
		
		// return if the user is not logged in
		if(authData == null) {
			callback("User is not logged in!!!", null);
			return;
		}
		
		// Set basic parameters for the request
		var requestParams = 
			{
				access_token: authData.accessToken,
			}
		
		// Set the rest of the parameters dependent on the request type
		for (var key in params) {
			if (params.hasOwnProperty(key)) {
				requestParams[key] = params[key];
			}
		}   

		var url = 'https://graph.facebook.com/'+ id +'/'+ path;	

		// Perform the http GET request and callback
		$http({
			method: 'GET',
			url: url,
			params: requestParams
		}).then(function(response) {
			callback(null, response);
		}, function(error) {
			callback(error, null);
		});
	};
	
	/**
	 * Return a boolean determining whether or not
	 * the current user is authenticated
	 */
	function isAuthenticated() {
		return (window.localStorage[FB_AUTH_KEY] == null);
	}
	
	
	/**
	 * Return the auth data
	 */
	self.getAuthData = function() {
		var authData = window.localStorage[FB_AUTH_KEY];
		
		if(authData) {
			return JSON.parse(authData);
		} else {
			return null;
		}
	}
	
	return self;
});