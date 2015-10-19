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
        {name: 'isTimerRunning', type: 'boolean'}
        
      ]
    },
    {
      name: 'day_of_week',
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
        {name: 'date',             type: 'text'},
        {name: 'progress',         type: 'integer'},
        {name: 'timerLastStarted', type: 'text'}
      ]
    },
  ],
    
  seed_data: []    

});


