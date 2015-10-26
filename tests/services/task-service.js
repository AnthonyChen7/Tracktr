describe('Task Service Unit Tests', function(){
  
    var TaskService;
    var DB;

    beforeEach(
        module('tracktr.services')    
    );

	  // Inject Task Service before each test 
    beforeEach(inject(function(_TaskService_, _DB_) {
      TaskService = _TaskService_;
      DB = _DB_;
    }));
    
    // Initialize the database before each test
    beforeEach(function(done) {
      DB.init(function() {
        done();
      });
    })
    
    
    // Nuke the database after each test
    afterEach(function(done) {
      DB.nuke(function() {
        done();
      });
    });



    it('can get an instance of my Taskservice', function() {
        expect(TaskService).toBeDefined();
    });
    
    
    
    
    it('can insert an inactive every day daily task', function(done) {
      TaskService.createTask(allTasks[0], function(err, id) {
        TaskService.getTaskById(id, function(err, task) {
          expect(id).toEqual(task.id);
            done();
          });
      });
    });
    
    it('can update a task with no progress', function(done) {
      // create a task with no progress
      TaskService.createTask(allTasks[1], function(err, id) {
        // Retrieve the task from the database
        TaskService.getTaskById(id, function(err, task) {
          // Update the task
          TaskService.updateTask(task, function() {
            done();
          });
        });
      });
    });


});

var allTasks = [   
    {
     name: 'Daily Everyday Not Active',
     isActive: 0,
     frequency: 0,
     isTime: 0,
     isCount: 1, 
     goal: 10,
     icon: 0,
     isTimerRunning: 0,
     creationDate: new Date(),
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
         date: new Date(),
         progress: 11,
         timerLastStarted: new Date()
       }
     ]
    },
    
    {
      id: 2,
     name: 'Daily Active Some days no progress',
     isActive: 1,
     frequency: 0,
     isTime: 0,
     isCount: 1, 
     goal: 2,
     icon: 0,
     isTimerRunning: 0,
     creationDate: new Date(),
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
       id: 3,
     name: 'Weekly Active Some days 2 progress',
     isActive: 1,
     frequency: 1,
     isTime: 0,
     isCount: 1, 
     goal: 10,
     icon: 0,
     isTimerRunning: 0,
     creationDate: new Date(),
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
         date: new Date(),
         progress: 10,
         timerLastStarted: new Date()
       },
        {
         id: '2',
         task_id: '2',
         date: new Date(),
         progress: 30,
         timerLastStarted: new Date()
       }
     ]
    },
    
    {
      id: 4,
     name: 'monthly Active Some days',
     isActive: 1,
     frequency: 2,
     isTime: 0,
     isCount: 1, 
     goal: 10,
     icon: 0,
     isTimerRunning: 0,
     creationDate: new Date(),
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
         date: new Date(),
         progress: 10,
         timerLastStarted: new Date()
       }
     ]
    },
    
    {
      id: 5,
     name: 'monthly Active no days',
     isActive: 1,
     frequency: 2,
     isTime: 0,
     isCount: 1, 
     goal: 10,
     icon: 0,
     isTimerRunning: 0,
     creationDate: new Date(),
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
         date: new Date(),
         progress: 10,
         timerLastStarted: new Date()
       }
     ]
    },
    
    {
      id: 6,
     name: 'monthly not Active one day',
     isActive: 0,
     frequency: 2,
     isTime: 0,
     isCount: 1, 
     goal: 10,
     icon: 0,
     isTimerRunning: 0,
     creationDate: new Date(),
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
         date: new Date(),
         progress: 10,
         timerLastStarted: new Date()
       }
     ]
    }
    
  ];