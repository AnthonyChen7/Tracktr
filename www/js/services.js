angular.module('tracktr.services', [])

.factory('Tasks', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var tasks = [{
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

  return {
    all: function() {
      return tasks;
    },
    remove: function(task) {
      tasks.splice(tasks.indexOf(task), 1);
    },
    get: function(taskId) {
      for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
          return tasks[i];
        }
      }
      return null;
    }
  };
});
