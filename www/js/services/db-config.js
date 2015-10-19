angular.module('tracktr.config', [])
.constant('DB_CONFIG', {
  name: 'DB',
  tables: [
    {
      name: 'task',
      columns: [
        {name: 'id',             type: 'integer primary key'},
        {name: 'name',           type: 'text'},
        {name: 'isActive',       type: 'boolean'},
        {name: 'frequency',      type: 'integer'},
        {name: 'isTime',         type: 'boolean'},
        {name: 'isCount',        type: 'boolean'},
        {name: 'goal',           type: 'integer'},
        {name: 'icon',           type: 'integer'},
        {name: 'isTimerRunning', type: 'boolean'},
        {name: 'creationDate',   type: 'text'}
      ]
    },
    {
      name: 'days_of_week',
      columns: [
        {name: 'id',             type: 'integer primary key'},
        {name: 'task_id',        type: 'integer'},
        {name: 'sunday',         type: 'boolean'},
        {name: 'monday',         type: 'boolean'},
        {name: 'tuesday',        type: 'boolean'},
        {name: 'wednesday',      type: 'boolean'},
        {name: 'thursday',       type: 'boolean'},
        {name: 'friday',         type: 'boolean'},
        {name: 'saturday',       type: 'boolean'}
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
     isActive: true,
     frequency: 1,
     isTime: false,
     isCount: true, 
     goal: 10,
     icon: 0,
     isTimerRunning: false,
     creationDate: new Date(),
     days: {
       id: '1',
       task_id: '1',
       sunday: true,
       monday: true,
       tuesday: true,
       wednesday: true,
       thursday: true,
       friday: true,
       saturday: true
     },
     progress: [
       {
         id: '1',
         task_id: '1',
         date: new Date(),
         progress: 10,
         timerLastStarted: new Date()
       }
     ]
    }
  ]    

});


