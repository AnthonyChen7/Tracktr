angular.module('tracktr.controllers', [])

  .controller('HomeController', function ($scope, $state, TaskService, $timeout, $http) {

    $scope.icons = [
      { class: "icon ion-star icon-custom", code: 0, value: false },
      { class: "icon ion-heart icon-custom", code: 1, value: false },
      { class: "icon ion-wrench icon-custom", code: 2, value: false },
      { class: "icon ion-hammer icon-custom", code: 3, value: false },
      { class: "icon ion-edit icon-custom", code: 4, value: false },
      { class: "icon ion-map icon-custom", code: 5, value: false },
      { class: "icon ion-chatbubble icon-custom", code: 6, value: false },
      { class: "icon ion-beer icon-custom", code: 7, value: false },
      { class: "icon ion-wineglass icon-custom", code: 8, value: false },
      { class: "icon ion-coffee icon-custom", code: 9, value: false },
      { class: "icon ion-icecream icon-custom", code: 10, value: false },
      { class: "icon ion-pizza icon-custom", code: 11, value: false },
      { class: "icon ion-calculator icon-custom", code: 12, value: false },
      { class: "icon ion-camera icon-custom", code: 13, value: false },
      { class: "icon ion-iphone icon-custom", code: 14, value: false },
      { class: "icon ion-cash icon-custom", code: 15, value: false },
      { class: "icon ion-university icon-custom", code: 16, value: false },
      { class: "icon ion-trophy icon-custom", code: 17, value: false },
      { class: "icon ion-bonfire icon-custom", code: 18, value: false },
      { class: "icon ion-lightbulb icon-custom", code: 19, value: true },
    ];
    
    var DAILY = "Daily";
    var MONTHLY = "Monthly";
    var WEEKLY = "Weekly";

    $scope.allTasks;
    $scope.date = new Date().getDate();

    $scope.$on('$ionicView.enter', function () {
      TaskService.getAll(function (err, tasks) {
         $scope.allTasks = tasks;
       });
    });

    $scope.drawCircle = function(task) {
      var circleContainer = document.getElementById('circle-' + task.id);
      var circle = new ProgressBar.Circle(circleContainer, {
        color: '#FC5B3F',
        // color: '#FFA07A',
        strokeWidth: 5,
        // fill: '#FFA07A',
        
        trailColor: '#eee',
        trailWidth: 5,
        duration: 500,
        // easing: 'easeInOut',
        text: {
          // value: '0',
          style: {
            // color: '#FC5B3F' 
            // color: '#FF8C00'
            // color: 'white',
            // background: 'white' 
          }
        },
        step: function(state, bar) {
          if (task.isCount) {
            // bar.setText((bar.value() * 100).toFixed(0));
            bar.setText($scope.retrieveDataForCircle(task));
            // bar.setText('+');
          } else {
            setInterval(function() {
              var countTimeInSecs = ($scope.countTime(task, 1) + ($scope.countTime(task, 2) * 60) + ($scope.countTime(task, 3) * 60 * 60))/60;
        
              var progressTimerInSecs = ($scope.progressTimer(task, 1) + ($scope.progressTimer(task, 2) * 60) + ($scope.progressTimer(task, 3) * 60 * 60))/60;
        
              if ((countTimeInSecs + progressTimerInSecs)/task.goal > 1) {
                progressRatio = 1;
              } else {
                progressRatio = (countTimeInSecs + progressTimerInSecs)/task.goal;
              }
          }, 1000);
          bar.setText($scope.displayProgressTimer(task));
          }
        }
      });
      
      circleContainer.onclick = function() { 
        if (!task.isCount && !task.isTimerRunning) {
          $scope.startTimer(task); 
        } else if (!task.isCount && task.isTimerRunning) {
          $scope.stopTimer(task); 
        } else {
          $scope.incCount(task);
          var progressRatio = 0;
          if ($scope.retrieveDataForCircle(task)/task.goal > 1) {
            progressRatio = 1;
          } else {
            progressRatio = $scope.retrieveDataForCircle(task)/task.goal;
          }
          circle.animate(progressRatio);
         }
      }
      
      var progressRatio = 0;
      if (task.isCount) {
        if ($scope.retrieveDataForCircle(task)/task.goal > 1) {
          progressRatio = 1;
        } else {
          progressRatio = $scope.retrieveDataForCircle(task)/task.goal;
        }    
        
        circle.animate(progressRatio);  
      } else {      
        setInterval(function() {
          var countTimeInSecs = ($scope.countTime(task, 1) + ($scope.countTime(task, 2) * 60) + ($scope.countTime(task, 3) * 60 * 60))/60;
        
          var progressTimerInSecs = ($scope.progressTimer(task, 1) + ($scope.progressTimer(task, 2) * 60) + ($scope.progressTimer(task, 3) * 60 * 60))/60;
        
          if ((countTimeInSecs + progressTimerInSecs)/task.goal > 1) {
            progressRatio = 1;
          } else {
            progressRatio = (countTimeInSecs + progressTimerInSecs)/task.goal;
          }
        
          circle.animate(progressRatio);
        }, 1000);
        
      }

      
    };

    $scope.getIconClass = function (iconNum) {
      return $scope.icons[iconNum].class;
    }

    $scope.retrieveDataForCircle = function (task) {
      if (task.isCount === true) {
        return task.getProgress();
      } else {
        return $scope.getFrequency(task.frequency);
      }
    };
    
    $scope.getFrequency = function(frequencyId){
      if (frequencyId === 0) {
        return DAILY;
      } else if (frequencyId === 1) {
        return WEEKLY;
      } else {
        return MONTHLY;
      }
    };

    /*
     * Increment the count for count tasks
     */
    $scope.incCount = function (task) {
      if (task.isCount) {
        var newProgress = $scope.startProgress(task);
        task.progress.push(newProgress);
        TaskService.addProgressToTask(task, newProgress);
      }
    };
    
  
    /*
     * Start a new count progress for every count 
     */
    $scope.startProgress = function (task) {
      return {
        task_id: task.id,
        date: new Date(),
        progress: 1,
        timerLastStarted: null
      };
    };
  
  
    // /*
    //  * Count the total progress of the task 
    //  */
    // $scope.countProgress = function(task){
    //   var result = 0;
    //   if(task.isCount) {
    //      for(var i = 0; i < task.progress.length; i++){
    //        result += task.progress[i].progress;
    //      }
    //   }
    //   return result;
    // };
  
  
    /*
     * Count the total progress of the task 
     * TODO: implement to display count progress for current goal "period"
     */
    $scope.countProgress = function (task) {
      var result = 0;
      var current_date = new Date();
      if (task.isCount) {
        result = task.getProgress();
      }
      return result;
    };
  
  
    /*
     * Count the amount time spent on the task
     * @Param format is the output format, 1:seconds, 2:minutes, 3:hours
     */
    $scope.countTime = function (task, format) {
      var result = 0;
      if (task.isTime) {
        for (var i = 0; i < task.progress.length; i++) {
          result += task.progress[i].progress;
        }
      }
      switch (format) {
        case 1:
          result = $scope.toSeconds(result);
          break;
        case 2:
          result = $scope.toMinutes(result);
          break;
        case 3:
          result = $scope.toHours(result);
          break;
      }
      return result;
    };
  
  
    /*
     * Convert milliseconds into seconds
     */
    $scope.toSeconds = function (num) {
      num = Math.floor(num / 1000);
      return num % 60;
    };
  
  
    /*
     * Convert milliseconds into minutes
     */
    $scope.toMinutes = function (num) {
      num = Math.floor(num / 60000);
      return num % 60;
    };
  
  
    /*
     * Convert milliseconds into hours
     */
    $scope.toHours = function (num) {
      num = Math.floor(num / 3600000);
      return num;
    };
  
    
    $scope.shouldShowTaskOnHome = function(task) {
      
      var shouldShow = 
             task.isActive && ( 
             $scope.isTaskActiveToday(task) ||
             $scope.isTaskWeekly(task)      ||
             $scope.isTaskMonthly(task) );
      
      return shouldShow;    
    }
    
    
    /*
     * Determine if the task is active for the current day
     */
    $scope.isTaskActiveToday = function (task) {
      var today = new Date();
      var dayIndex = today.getDay();
      var days = task.days;
      var dayOfWeek = $scope.dayOfWeekAsString(dayIndex);
      var isActive = task.isActive;
      for (field in days) {
        if (field === dayOfWeek) {
          if (days[field] === true && isActive === true) {
            return true;
          } else {
            return false;
          }
        }
      }
      return false;
    };
  
  
  
    /*
     * Return true if it is a weekly task
     */
    $scope.isTaskWeekly = function (task) {
      if (task.frequency === 1)
        return true;
      else
        return false;
    };
  
  
    /*
     * Return true if it is a monthly task
     */
    $scope.isTaskMonthly = function (task) {
      if (task.frequency === 2)
        return true;
      else
        return false;
    };
  
    /*
     * Converts a day of week number to a string
     */
    $scope.dayOfWeekAsString = function (dayIndex) {
      return ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][dayIndex];
    };
  
  
    /*
     * update all the tasks
     */
    $scope.updateAll = function (allTasks) {
      for (i = 0; i < allTasks.lenth; i++) {
        TaskService.updateTask(allTasks[i]);
      }
    };
 
  
    /*
     * Count the current progress, and express it in seconds
     * @Param format is the output format, 1:seconds, 2:minutes, 3:hours
     */
    $scope.progressTimer = function (task, format) {
      if (task.isTimerRunning) {
        var current = new Date();
        var difference = current - task.progress[task.progress.length - 1].timerLastStarted;
        switch (format) {
          case 1:
            difference = $scope.toSeconds(difference);
            break;
          case 2:
            difference = $scope.toMinutes(difference);
            break;
          case 3:
            difference = $scope.toHours(difference);
            break;
        }
        return difference;
      }
      else {
        return 0;
      }
    };
   
   /**
    * Displays the current progress of time based task in format:
    h:mm:ss
    */
   $scope.displayProgressTimer = function(task){
     var hours = $scope.progressTimer(task,3);
     var minutes = $scope.progressTimer(task,2);
     var seconds = $scope.progressTimer(task,1);
     
     return hours+":"+pad(minutes)+":"+pad(seconds);
   };

    /*
     * Count the current progress, and express it in seconds
     */
    $scope.progressTimerInSeconds = function (task) {
      if (task.isTimerRunning) {
        var current = new Date();
        var difference = current - task.progress[task.progress.length - 1].timerLastStarted;
        return Math.floor(difference / 1000) % 60;
      } else {
        return 0;
      }
    };
  
  
    /*
     * Count the current progress, and express it in minutes
     */
    $scope.progressTimerInMinutes = function (task) {
      if (task.isTimerRunning) {
        var current = new Date();
        var difference = current - task.progress[task.progress.length - 1].timerLastStarted;
        return Math.floor(difference / 60000) % 60;
      } else {
        return 0;
      }
    };
  
  
    /*
     * Count the current progress, and express it in hours
     */
    $scope.progressTimerInHours = function (task) {
      if (task.isTimerRunning) {
        var current = new Date();
        var difference = current - task.progress[task.progress.length - 1].timerLastStarted;
        return Math.floor(difference / 3600000);
      } else {
        return 0;
      }
    };
  
  
    /*
     *Navigation for create button
     */
    $scope.navCreateClick = function () {
      $state.go('create');
    };
    
    $scope.clickCircleDiv = function(task) {
      document.getElementById("icon-" + task.id).style.color = '#FC5B3F';
    }
    
    $scope.releaseCircleDiv = function(task) {
      document.getElementById("icon-" + task.id).style.color = '#eee';
    }
    
    $scope.counter = 0;

    var mytimeout = null; // the current timeoutID


    $scope.onTimeout = function () {
      mytimeout = $timeout($scope.onTimeout, 1000);
    };
 
   
    /*
     * Start the timer, create a new progress array entry 
     */
    $scope.startTimer = function (task) {
      var newProgress = {
        task_id: task.id,
        date: new Date(),
        progress: 0,
        timerLastStarted: new Date()
      };
      //  task.progress.push(progress);
      //  task.isTimerRunning = true;
      //  TaskService.updateTask(task);
      // var newProgress = $scope.startProgress(task);
      // newProgress.timerLastStarted = new Date();
      task.progress.push(newProgress);

      TaskService.addProgressToTask(task, newProgress, function (progressId) {
        task.progress[task.progress.length - 1].id = progressId;
      });

      task.isTimerRunning = true;
      TaskService.updateTask(task);

      mytimeout = $timeout($scope.onTimeout, 1000);
    };
 
 
    /*
     * Stop and reset the current timer
     */
    $scope.stopTimer = function (task) {
      var current_time = new Date();
      var last_started = task.progress[task.progress.length - 1].timerLastStarted;
      task.progress[task.progress.length - 1].progress = current_time.getTime() - last_started.getTime();
      // task.progress[task.progress.length - 1].progress = 12345;
      task.isTimerRunning = false;
      TaskService.updateTask(task);

      $scope.$broadcast('timer-stopped', $scope.counter);
      $timeout.cancel(mytimeout);
    };
    
 
    /*
     * Triggered when the timer stops
     */
    $scope.$on('timer-stopped', function (event, remaining) {
      console.log('You stopped!!');
    });
  });