// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('tracktr', ['ionic', 'tracktr.config', 'tracktr.controllers', 'tracktr.services'])

.run(function($ionicPlatform, DB) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
    
    // Initialize the Database
    DB.init();
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: '/tabs.html'
  })
  
  // Each tab has its own nav history stack:
  
  // Tab views
  .state('tab.all', {
    url: '/all',
    views: {
      'tab-all': {
        templateUrl: 'js/habit-all/habit-all.html',
        controller: 'HabitAllController'
      }
    }
  })
  
  .state('tab.charts', {
    url: '/charts',
    views: {
      'tab-charts': {
        templateUrl: 'js/habit-charts/habit-charts.html',
        controller: 'HabitChartsController'
      }
    }
  })
  
  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'js/home/home.html',
        controller: 'HomeController'
      }
    }
  })
  
  .state('tab.create', {
    url: '/create',
    views: {
      'tab-home': {
        templateUrl: 'js/habit-create/habit-create.html',
        controller: 'HabitCreateController'  
      }
    }
  })
  
  .state('tab.edit', {
    url: '/edit/:habitId',
    views: {
      'tab-home': {
        templateUrl: 'js/habit-edit/habit-edit.html',
        controller: 'HabitEditController'
      } 
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});
