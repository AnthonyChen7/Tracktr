     var someDate = new Date();
 var anotherDate = new Date();
 anotherDate.setDate(anotherDate.getDate() + 10);
 
 var prevSunday = new Date();
 prevSunday.setDate(prevSunday.getDate() - prevSunday.getDay());
 prevSunday.setHours(0,0,0,0);
 
 var nextSunday = new Date();
 nextSunday.setDate(nextSunday.getDate() + 7 - nextSunday.getDay());
 nextSunday.setHours(23,59,59,999); 
 
 var firstDayOfMonth = new Date(someDate.getFullYear(), someDate.getMonth(),1);
 firstDayOfMonth.setHours(0,0,0,0);
 var lastDayOfMonth = new Date(someDate.getFullYear(), someDate.getMonth()+1,0);
 lastDayOfMonth.setHours(23,59,59,999); 
 
 var someDayOfNextMonth = new Date(someDate.getFullYear(), someDate.getMonth()+1,5);
 
 var middleOfThisMonth = new Date(someDate.getFullYear(), someDate.getMonth(),10);
 
  var today = new Date();
    today.setHours(0,0,0,0);
    
    var lastSecondOfToday = new Date();
    lastSecondOfToday.setHours(23,59,59,999); 
 
 /**
 * Temporary list of tasks
 */
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
     creationDate: someDate.getTime(),
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
         date: someDate.getTime(),
         progress: 11,
         timerLastStarted: someDate.getTime()
       }
     ]
    },
    
    {//1
      id: 2,
     name: 'Daily Active Some days no progress',
     isActive: 1,
     frequency: 0,
     isTime: 0,
     isCount: 1, 
     goal: 2,
     icon: 0,
     isTimerRunning: 0,
     creationDate: someDate.getTime(),
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
    {//2
      id: 2,
     name: 'Daily Active Some days 2 progress in range',
     isActive: 1,
     frequency: 0,
     isTime: 0,
     isCount: 1, 
     goal: 2,
     icon: 0,
     isTimerRunning: 0,
     creationDate: someDate.getTime(),
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
        {
         id: '1',
         task_id: '1',
         date: someDate.getTime(),
         progress: 11,
         timerLastStarted: someDate.getTime()
       },
        {
         id: '1',
         task_id: '1',
         date: someDate.getTime(),
         progress: 11,
         timerLastStarted: someDate.getTime()
       }
     ]
    },
    
     {//3
       id: 3,
     name: 'Weekly Active Some days 2 progress in date range',
     isActive: 1,
     frequency: 1,
     isTime: 0,
     isCount: 1, 
     goal: 10,
     icon: 0,
     isTimerRunning: 0,
     creationDate: someDate.getTime(),
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
         date: someDate.getTime(),
         progress: 10,
         timerLastStarted: someDate.getTime()
       },
        {
         id: '2',
         task_id: '2',
         date: someDate.getTime(),
         progress: 30,
         timerLastStarted: someDate.getTime()
       }
     ]
    },
    
    {//4
      id: 4,
     name: 'monthly Active Some days',
     isActive: 1,
     frequency: 2,
     isTime: 0,
     isCount: 1, 
     goal: 10,
     icon: 0,
     isTimerRunning: 0,
     creationDate: someDate.getTime(),
     days: {
       id: '1',
       task_id: '1',
       sunday: 0,
       monday: 0,
       tuesday: 0,
       wednesday: 1,
       thursday: 0,
       friday: 0,
       saturday: 1
     },
     progress: [
       {
         id: '1',
         task_id: '1',
         date: someDate.getTime(),
         progress: 10,
         timerLastStarted: someDate.getTime()
       }
     ]
    },
    
    {//5
      id: 5,
     name: 'monthly Active no days',
     isActive: 1,
     frequency: 2,
     isTime: 0,
     isCount: 1, 
     goal: 10,
     icon: 0,
     isTimerRunning: 0,
     creationDate: someDate.getTime(),
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
         date: someDate.getTime(),
         progress: 10,
         timerLastStarted: someDate.getTime()
       }
     ]
    },
    
    {//6
      id: 6,
     name: 'monthly not Active one day',
     isActive: 0,
     frequency: 2,
     isTime: 0,
     isCount: 1, 
     goal: 10,
     icon: 0,
     isTimerRunning: 0,
     creationDate: someDate.getTime(),
     days: {
       id: '1',
       task_id: '1',
       sunday: 0,
       monday: 0,
       tuesday: 0,
       wednesday: 0,
       thursday: 1,
       friday: 0,
       saturday: 0
     },
     progress: [
       {
         id: '1',
         task_id: '1',
         date: someDate.getTime(),
         progress: 10,
         timerLastStarted: someDate.getTime()
       }
     ]
    },
    
    {//7
       id: 3,
     name: 'Weekly Active Some days 2 progress out of date range',
     isActive: 1,
     frequency: 1,
     isTime: 0,
     isCount: 1, 
     goal: 10,
     icon: 0,
     isTimerRunning: 0,
     creationDate: someDate.getTime(),
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
         date: anotherDate.getTime(),
         progress: 10,
         timerLastStarted: someDate.getTime()
       },
        {
         id: '2',
         task_id: '2',
         date: anotherDate.getTime(),
         progress: 30,
         timerLastStarted: someDate.getTime()
       }
     ]
    },
    
    {//8
       id: 3,
     name: 'Weekly Active Some days 2 progress 1 out of date range & 1 in range',
     isActive: 1,
     frequency: 1,
     isTime: 0,
     isCount: 1, 
     goal: 10,
     icon: 0,
     isTimerRunning: 0,
     creationDate: someDate.getTime(),
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
         date: anotherDate.getTime(),
         progress: 10,
         timerLastStarted: someDate.getTime()
       },
        {
         id: '2',
         task_id: '2',
         date: someDate.getTime(),
         progress: 30,
         timerLastStarted: someDate.getTime()
       }
     ]
    },
    
    {//9
       id: 3,
     name: 'Weekly Active Some days 2 progress both at prev Sunday',
     isActive: 1,
     frequency: 1,
     isTime: 0,
     isCount: 1, 
     goal: 10,
     icon: 0,
     isTimerRunning: 0,
     creationDate: someDate.getTime(),
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
         date: prevSunday.getTime(),
         progress: 10,
         timerLastStarted: someDate.getTime()
       },
        {
         id: '2',
         task_id: '2',
         date: prevSunday.getTime(),
         progress: 30,
         timerLastStarted: someDate.getTime()
       }
     ]
    },
    
    {//10
       id: 3,
     name: 'Weekly Active Some days 2 progress both at next Sunday',
     isActive: 1,
     frequency: 1,
     isTime: 0,
     isCount: 1, 
     goal: 10,
     icon: 0,
     isTimerRunning: 0,
     creationDate: someDate.getTime(),
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
         date: nextSunday.getTime(),
         progress: 10,
         timerLastStarted: someDate.getTime()
       },
        {
         id: '2',
         task_id: '2',
         date: nextSunday.getTime(),
         progress: 30,
         timerLastStarted: someDate.getTime()
       }
     ]
    },
    
    {//11
      id: 5,
     name: 'monthly Active first day of month',
     isActive: 1,
     frequency: 2,
     isTime: 0,
     isCount: 1, 
     goal: 10,
     icon: 0,
     isTimerRunning: 0,
     creationDate: someDate.getTime(),
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
         date: firstDayOfMonth.getTime(),
         progress: 10,
         timerLastStarted: someDate.getTime()
       }
     ]
    },
    
    {//12
      id: 5,
     name: 'monthly Active last day of month',
     isActive: 1,
     frequency: 2,
     isTime: 0,
     isCount: 1, 
     goal: 10,
     icon: 0,
     isTimerRunning: 0,
     creationDate: someDate.getTime(),
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
         date: lastDayOfMonth.getTime(),
         progress: 10,
         timerLastStarted: someDate.getTime()
       }
     ]
    },
    
     {//13
      id: 5,
     name: 'monthly Active some day of next month',
     isActive: 1,
     frequency: 2,
     isTime: 0,
     isCount: 1, 
     goal: 10,
     icon: 0,
     isTimerRunning: 0,
     creationDate: someDate.getTime(),
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
         date: someDayOfNextMonth.getTime(),
         progress: 10,
         timerLastStarted: someDate.getTime()
       }
     ]
    },
    //14
    {
      id: 5,
     name: 'daily progress that occured prev Sunday',
     isActive: 1,
     frequency: 0,
     isTime: 0,
     isCount: 1, 
     goal: 10,
     icon: 0,
     isTimerRunning: 0,
     creationDate: someDate.getTime(),
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
         date: prevSunday.getTime(),
         progress: 10,
         timerLastStarted: someDate.getTime()
       }
     ]
    },
    //15
    {
      id: 5,
     name: 'daily progress that occured today at time 00:00:00',
     isActive: 1,
     frequency: 0,
     isTime: 0,
     isCount: 1, 
     goal: 10,
     icon: 0,
     isTimerRunning: 0,
     creationDate: someDate.getTime(),
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
         date: today.getTime(),
         progress: 10,
         timerLastStarted: someDate.getTime()
       }
     ]
    },
    //16
    {
      id: 5,
     name: 'daily progress that occured today at time 23:59:99',
     isActive: 1,
     frequency: 0,
     isTime: 0,
     isCount: 1, 
     goal: 10,
     icon: 0,
     isTimerRunning: 0,
     creationDate: someDate.getTime(),
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
         date: lastSecondOfToday.getTime(),
         progress: 10,
         timerLastStarted: someDate.getTime()
       }
     ]
    },
    //17
    {
      id: 5,
     name: 'daily progress that occured today at time 23:59:99',
     isActive: 1,
     frequency: 0,
     isTime: 0,
     isCount: 1, 
     goal: 10,
     icon: 0,
     isTimerRunning: 0,
     creationDate: someDate.getTime(),
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
         date: nextSunday.getTime(),
         progress: 10,
         timerLastStarted: someDate.getTime()
       }
     ]
    },
    //18
     {
      id: 6,
     name: 'monthly middle of month',
     isActive: 0,
     frequency: 2,
     isTime: 0,
     isCount: 1, 
     goal: 10,
     icon: 0,
     isTimerRunning: 0,
     creationDate: someDate.getTime(),
     days: {
       id: '1',
       task_id: '1',
       sunday: 0,
       monday: 0,
       tuesday: 0,
       wednesday: 0,
       thursday: 1,
       friday: 0,
       saturday: 0
     },
     progress: [
       {
         id: '1',
         task_id: '1',
         date: middleOfThisMonth.getTime(),
         progress: 10,
         timerLastStarted: someDate.getTime()
       }
     ]
    }
];