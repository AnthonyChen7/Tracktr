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
    
    it('can insert a task with one progress', function(done) {
      var taskWithOneProgress = allTasks[0];
      
      // create a task with one progress
      TaskService.createTask(taskWithOneProgress, function(err, id) {
          
          // retrieve the task from the database
          TaskService.getTaskById(id, function(err, task) {
            
            // Compare Name
            expect(task.name).toEqual(taskWithOneProgress.name);
            // Compare task_id
            expect(task.days.task_id).toEqual(taskWithOneProgress.days.task_id);
            // Compare length of progress array
            expect(task.progress.length).toEqual(1);
            // Compare progress's task id
            expect(task.progress[0].task_id).toEqual(1);
            // Compare progress's progress value
            expect(task.progress[0].progress).toEqual(11);
            
            done();
          });
      });
    });
    
});

var allTasks = [   
    {
     name: 'Daily Everyday Not Active',
     isActive: false,
     frequency: false,
     isTime: false,
     isCount: true, 
     goal: 10,
     icon: 0,
     isTimerRunning: false,
     creationDate: new Date(),
     days: {
       id: 1,
       task_id: 1,
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
         id: 1,
         task_id: 1,
         date: new Date(),
         progress: 11,
         timerLastStarted: new Date()
       }
     ]
    },
    {
     name: 'Daily Everyday Not Active',
     isActive: false,
     frequency: false,
     isTime: false,
     isCount: true, 
     goal: 10,
     icon: 0,
     isTimerRunning: false,
     creationDate: new Date(),
     days: {
       id: 1,
       task_id: 1,
       sunday: true,
       monday: true,
       tuesday: true,
       wednesday: true,
       thursday: true,
       friday: true,
       saturday: true
     },
     progress: [
     ]
    }
];