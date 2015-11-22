angular.module('tracktr.controllers')
  .controller('TaskInfoController', function ($scope, $state, $ionicHistory, SharingService, TaskService, $ionicPopup) {

    var EDIT = "Edit";
    var VIEW_REPORT = "View Report";
    var DELETE = "Delete";
    var SHARE = "Share";
    $scope.options = [EDIT, VIEW_REPORT, DELETE, SHARE];
  
    /**
     * Retrieve the name based on the fbID field.
     */
    $scope.getImportedName = function (task) {
      if (!task.isImported) {
        return;
      }

      SharingService.getName(task.fbID, function (err, name) {
        task.friendName = name;
      });
    }
  
    /**
     * Returns boolean to tell us
     * if options for the specified task is shown
     */
    $scope.isGroupShown = function (task) {
      return $scope.shownGroup === task;
    };
  
    /**
     * Toggle task to show options
     */
    $scope.toggleGroup = function (task) {
      if ($scope.isGroupShown(task)) {
        $scope.shownGroup = null;
      } else {
        $scope.shownGroup = task;
      }
    };

    /**
     * Option is a string
     * task is a task
     * Based on options selected,
     * it will bring user to the correct page
     */
    $scope.buttonHandler = function (option, task) {
      if (option === EDIT) {
        $state.go('edit', { habitId: task.id });
      } else if (option === VIEW_REPORT) {
        $state.go('charts', { taskId: task.id });
      } else if (option === SHARE) {
        var newShareState = !task.isShared;

        if (newShareState) {
          if (SharingService.isAuthenticated()) {
            // prompt user to share          
            var sharePopup = $ionicPopup.confirm({
              title: 'Share',
              template: 'Would you like to share this with your friends?'
            }).then(function (confirm) {
              if (confirm) {
                // now set to shared, so send it to firebase
                task.isShared = true;
                TaskService.updateTask(task, function (err) {
                  // Upload the task to firebase.
                  SharingService.uploadTask(task, function (err) {
                    if (err) {
                      console.log(err);
                    }
                  })
                });
              }
            });
          } else {
            $scope.notifyUnauthenticated();
          }
        } else {
          if (SharingService.isAuthenticated()) {
            var sharePopup = $ionicPopup.confirm({
              title: 'Unshare',
              template: 'Would you like to unshare this with your friends?'
            }).then(function (confirm) {
              if (confirm) {
                // no longer shared, tear it down from firebase
                task.isShared = false;
                TaskService.updateTask(task, function (err) {
                  // Delete the task from firebase
                  SharingService.removeTask(task, function (err) {
                    if (err) {
                      console.log(err);
                    }
                  })
                });
              }
            });
          } else {
            $scope.notifyUnauthenticated();
          }
        }

      } else {

        var confirmPopup = $ionicPopup.confirm({
          title: 'Delete Task?',
          template: 'Are you sure you want to delete this task?'
        });

        confirmPopup.then(function (confirm) {

          if (confirm) {
            TaskService.deleteTask(task, function (err) {
              var index = $scope.tasks.indexOf(task);
              $scope.tasks.splice(index, 1);
              $ionicPopup.alert({
                title: 'Success!',
                template: 'Task successfully deleted.'
              });

            });
          }

        });

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

    $scope.notifyUnauthenticated = function () {
      $ionicPopup.confirm({
        title: "Authentication Error",
        template: "Please Login through Facebook before sharing"
      }).then(function (confirm) {
        // TODO: navigate to authentication page;
      });
    }
  });