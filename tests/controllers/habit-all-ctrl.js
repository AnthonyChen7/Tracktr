describe("Habit All Controller Tests", function(){
  
  var someDate = new Date();
 var anotherDate = new Date();
 anotherDate.setDate(anotherDate.getDate() + 10);
 
 var prevSunday = new Date();
 prevSunday.setDate(prevSunday.getDate() - prevSunday.getDay());
 
 var nextSunday = new Date();
 nextSunday.setDate(nextSunday.getDate() + 7 - nextSunday.getDay());
 
 var firstDayOfMonth = new Date(someDate.getFullYear(), someDate.getMonth(),1);
 var lastDayOfMonth = new Date(someDate.getFullYear(), someDate.getMonth()+1,0);
 
 var someDayOfNextMonth = new Date(someDate.getFullYear(), someDate.getMonth()+1,5);
    
    var scope;
    var task;
    var  days;

var allTasks = [   
    {
      //0
     name: 'Daily Everyday Not Active',
     isActive: 0,
     frequency: 0,
     isTime: 0,
     isCount: 1, 
     goal: 10,
     icon: 0,
     isTimerRunning: 0,
     creationDate: someDate,
     days: {
       id: '1',
       task_id: '1',
       sunday: 1,
       monday: 1,
       tuesday: 1,
       wednesday: 1,
       thursday: 1,
       friday: 1,
       saturday: 1
     },
     progress: [
       {
         id: '1',
         task_id: '1',
         date: someDate,
         progress: 11,
         timerLastStarted: someDate
       }
     ]
    },
    
    {
      //1
      id: 2,
     name: 'Daily Active Some days no progress',
     isActive: 1,
     frequency: 0,
     isTime: 0,
     isCount: 1, 
     goal: 2,
     icon: 0,
     isTimerRunning: 0,
     creationDate: someDate,
     days: {
       id: '1',
       task_id: '1',
       sunday: 1,
       monday: 1,
       tuesday: 0,
       wednesday: 1,
       thursday: 0,
       friday: 0,
       saturday: 0
     },
     progress: [
       
     ]
    },
    {
      //2
     name: 'Daily 2 progress',
     isActive: 0,
     frequency: 0,
     isTime: 0,
     isCount: 1, 
     goal: 10,
     icon: 0,
     isTimerRunning: 0,
     creationDate: someDate,
     days: {
       id: '1',
       task_id: '1',
       sunday: 1,
       monday: 1,
       tuesday: 1,
       wednesday: 1,
       thursday: 1,
       friday: 1,
       saturday: 1
     },
     progress: [
       {
         id: '1',
         task_id: '1',
         date: someDate,
         progress: 11,
         timerLastStarted: someDate
       },
       {
         id: '1',
         task_id: '1',
         date: someDate,
         progress: 11,
         timerLastStarted: someDate
       }
     ]
    },
    
     {
       //3
       id: 3,
     name: 'Weekly Active Some days 2 progress in date range',
     isActive: 1,
     frequency: 1,
     isTime: 0,
     isCount: 1, 
     goal: 10,
     icon: 0,
     isTimerRunning: 0,
     creationDate: someDate,
     days: {
       id: '1',
       task_id: '1',
       sunday: 1,
       monday: 1,
       tuesday: 1,
       wednesday: 1,
       thursday: 0,
       friday: 0,
       saturday: 1
     },
     progress: [
       {
         id: '1',
         task_id: '1',
         date: someDate,
         progress: 10,
         timerLastStarted: someDate
       },
        {
         id: '2',
         task_id: '2',
         date: someDate,
         progress: 30,
         timerLastStarted: someDate
       }
     ]
    },
    
    {
      //4
       id: 3,
     name: 'Weekly Active Some days 2 progress out of date range',
     isActive: 1,
     frequency: 1,
     isTime: 0,
     isCount: 1, 
     goal: 10,
     icon: 0,
     isTimerRunning: 0,
     creationDate: someDate,
     days: {
       id: '1',
       task_id: '1',
       sunday: 1,
       monday: 1,
       tuesday: 1,
       wednesday: 1,
       thursday: 0,
       friday: 0,
       saturday: 1
     },
     progress: [
       {
         id: '1',
         task_id: '1',
         date: anotherDate,
         progress: 10,
         timerLastStarted: someDate
       },
        {
         id: '2',
         task_id: '2',
         date: anotherDate,
         progress: 30,
         timerLastStarted: someDate
       }
     ]
    },
    
    {
       id: 3,
     name: 'Weekly Active Some days 2 progress 1 out of date range & 1 in range',
     isActive: 1,
     frequency: 1,
     isTime: 0,
     isCount: 1, 
     goal: 10,
     icon: 0,
     isTimerRunning: 0,
     creationDate: someDate,
     days: {
       id: '1',
       task_id: '1',
       sunday: 1,
       monday: 1,
       tuesday: 1,
       wednesday: 1,
       thursday: 0,
       friday: 0,
       saturday: 1
     },
     progress: [
       {
         id: '1',
         task_id: '1',
         date: anotherDate,
         progress: 10,
         timerLastStarted: someDate
       },
        {
         id: '2',
         task_id: '2',
         date: someDate,
         progress: 30,
         timerLastStarted: someDate
       }
     ]
    },
    
    {
       id: 3,
     name: 'Weekly Active Some days 2 progress both at prev Sunday',
     isActive: 1,
     frequency: 1,
     isTime: 0,
     isCount: 1, 
     goal: 10,
     icon: 0,
     isTimerRunning: 0,
     creationDate: someDate,
     days: {
       id: '1',
       task_id: '1',
       sunday: 1,
       monday: 1,
       tuesday: 1,
       wednesday: 1,
       thursday: 0,
       friday: 0,
       saturday: 1
     },
     progress: [
       {
         id: '1',
         task_id: '1',
         date: prevSunday,
         progress: 10,
         timerLastStarted: someDate
       },
        {
         id: '2',
         task_id: '2',
         date: prevSunday,
         progress: 30,
         timerLastStarted: someDate
       }
     ]
    },
    
    {
       id: 3,
     name: 'Weekly Active Some days 2 progress both at next Sunday',
     isActive: 1,
     frequency: 1,
     isTime: 0,
     isCount: 1, 
     goal: 10,
     icon: 0,
     isTimerRunning: 0,
     creationDate: someDate,
     days: {
       id: '1',
       task_id: '1',
       sunday: 1,
       monday: 1,
       tuesday: 1,
       wednesday: 1,
       thursday: 0,
       friday: 0,
       saturday: 1
     },
     progress: [
       {
         id: '1',
         task_id: '1',
         date: nextSunday,
         progress: 10,
         timerLastStarted: someDate
       },
        {
         id: '2',
         task_id: '2',
         date: nextSunday,
         progress: 30,
         timerLastStarted: someDate
       }
     ]
    },
    
    {
      id: 5,
     name: 'monthly Active first day of month',
     isActive: 1,
     frequency: 2,
     isTime: 0,
     isCount: 1, 
     goal: 10,
     icon: 0,
     isTimerRunning: 0,
     creationDate: someDate,
     days: {
       id: '1',
       task_id: '1',
       sunday: 0,
       monday: 0,
       tuesday: 0,
       wednesday: 0,
       thursday: 0,
       friday: 0,
       saturday: 0
     },
     progress: [
       {
         id: '1',
         task_id: '1',
         date: firstDayOfMonth,
         progress: 10,
         timerLastStarted: someDate
       }
     ]
    },
    
    {
      id: 5,
     name: 'monthly Active last day of month',
     isActive: 1,
     frequency: 2,
     isTime: 0,
     isCount: 1, 
     goal: 10,
     icon: 0,
     isTimerRunning: 0,
     creationDate: someDate,
     days: {
       id: '1',
       task_id: '1',
       sunday: 0,
       monday: 0,
       tuesday: 0,
       wednesday: 0,
       thursday: 0,
       friday: 0,
       saturday: 0
     },
     progress: [
       {
         id: '1',
         task_id: '1',
         date: lastDayOfMonth,
         progress: 10,
         timerLastStarted: someDate
       }
     ]
    },
    
     {
      id: 5,
     name: 'monthly Active some day of next month',
     isActive: 1,
     frequency: 2,
     isTime: 0,
     isCount: 1, 
     goal: 10,
     icon: 0,
     isTimerRunning: 0,
     creationDate: someDate,
     days: {
       id: '1',
       task_id: '1',
       sunday: 0,
       monday: 0,
       tuesday: 0,
       wednesday: 0,
       thursday: 0,
       friday: 0,
       saturday: 0
     },
     progress: [
       {
         id: '1',
         task_id: '1',
         date: someDayOfNextMonth,
         progress: 10,
         timerLastStarted: someDate
       }
     ]
    }  
  ];
    
    // load the controller's module
     beforeEach(module('tracktr.controllers'));

    // beforeEach(inject(function($rootScope, $controller) {
    //     scope = $rootScope.$new();
    //     $controller('HabitAllController', {$scope: scope});
    // }));
    
    
    it("Test count no progress", function(){ 
      var task = new Task(allTasks[1]);
      var result = task.getProgress();
      expect(result).toBe(0);
    });
    
    it("Test count one daily progress", function(){ 
      var task = new Task(allTasks[0]);
      var result = task.getProgress();
      expect(result).toBe(11);
    });
    
    it("Test count two daily progress", function(){ 
      var task = new Task(allTasks[2]);
      var result = task.getProgress();
      expect(result).toBe(11+11);
    });
    
    it("Test weekly task; out of date range", function(){ 
      var task = new Task(allTasks[4]);
      var result = task.getProgress();
      expect(result).toBe(0);
    });
    
    //test within date range
});