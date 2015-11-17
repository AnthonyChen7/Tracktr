angular.module('tracktr.config', [])
.constant('DB_CONFIG', {
  name: 'DB',
  tables: [
    {
      name: 'task',
      columns: [
        {name: 'id',             type: 'integer primary key'},
        {name: 'name',           type: 'text'},
        {name: 'isActive',       type: 'integer'},
        {name: 'frequency',      type: 'integer'},
        {name: 'isTime',         type: 'integer'},
        {name: 'isCount',        type: 'integer'},
        {name: 'goal',           type: 'integer'},
        {name: 'icon',           type: 'integer'},
        {name: 'isTimerRunning', type: 'integer'},
        {name: 'creationDate',   type: 'text'},
        {name: 'isShared',       type: 'integer'},
        {name: 'fbID',           type: 'text'},
        {name: 'firebaseRefID',  type: 'text'}
      ]
    },
    {
      name: 'days_of_week',
      columns: [
        {name: 'id',             type: 'integer primary key'},
        {name: 'task_id',        type: 'integer'},
        {name: 'sunday',         type: 'integer'},
        {name: 'monday',         type: 'integer'},
        {name: 'tuesday',        type: 'integer'},
        {name: 'wednesday',      type: 'integer'},
        {name: 'thursday',       type: 'integer'},
        {name: 'friday',         type: 'integer'},
        {name: 'saturday',       type: 'integer'}
      ]
    },
    {
      name: 'progress',
      columns: [
        {name: 'id',               type: 'integer primary key'},
        {name: 'task_id',          type: 'integer'},
        {name: 'date',             type: 'text'},
        {name: 'progress',         type: 'integer'},
        {name: 'timerLastStarted', type: 'text'}
      ]
    },
  ],
    
  seed_data: [
    {
     id: '1',
     name: 'TASK 1',
     isActive: 1,
     frequency: 1,
     isTime: 0,
     isCount: 1, 
     goal: 10,
     icon: 0,
     isTimerRunning: 0,
     creationDate: '1435821133001',
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
         date: '1435821133001',
         progress: 10,
         timerLastStarted: '1435821133001'
       }
     ]
    }
  ]    

});


