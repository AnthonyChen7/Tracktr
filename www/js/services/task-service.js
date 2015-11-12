/**
 * Task Service  which is responsible for all CRUD operations on the SQLite Database.
 */
angular.module('tracktr.services') 
.factory('TaskService', function(DB) {
  
  var self = this;

  // TASK PREPARED STATEMENTS
  var SELECT_ALL_TASK_PREPARED_STATEMENT = 
              'SELECT id, name, isActive, frequency, isTime, isCount, goal, icon, isTimerRunning, creationDate, isShared ' + 
              'FROM task';
  var SELECT_TASK_BY_ID_PREPARED_STATEMENT = 
              'SELECT id, name, isActive, frequency, isTime, isCount, goal, icon, isTimerRunning, creationDate, isShared ' + 
              'FROM task ' + 
              'WHERE id=?';
  var INSERT_TASK_PREPARED_STATEMENT = 
              'INSERT INTO task (name, isActive, frequency, isTime, ' +
              'isCount, goal, icon, isTimerRunning, creationDate, isShared) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  var UPDATE_TASK_PREPARED_STATEMENT = 
              'UPDATE task ' +
              'SET name=?, isActive=?, frequency=?, isTime=?, isCount=?, goal=?, icon=?, isTimerRunning=?, creationDate=?, isShared=? ' +
              'WHERE id=?';
  var DELETE_TASK_PREPARED_STATEMENT = 
              'DELETE FROM task ' + 
              'WHERE id=?'

  // DAYS PREPARED STATEMENTS
  var SELECT_DAYS_PREPARED_STATEMENT = 
              'SELECT id, task_id, sunday, monday, tuesday, wednesday, thursday, friday, saturday ' + 
              'FROM days_of_week ' + 
              'WHERE task_id=?';
  var INSERT_DAYS_PREPARED_STATEMENT = 
              'INSERT INTO days_of_week (task_id, sunday, monday, tuesday, wednesday, thursday, friday, saturday) ' +
              'VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  var UPDATE_DAYS_PREPARED_STATEMENT = 
              'UPDATE days_of_week ' +
              'SET task_id=?, sunday=?, monday=?, tuesday=?, wednesday=?, thursday=?, friday=?, saturday=? ' +
              'WHERE id=?';
  var DELETE_DAYS_PREPARED_STATEMENT = 
              'DELETE FROM days_of_week ' + 
              'WHERE task_id=?'

  // PROGRESS PREPARED STATEMENTS      
  var SELECT_PROGRESS_PREPARED_STATEMENT = 
              'SELECT id, task_id, date, progress, timerLastStarted ' + 
              'FROM progress ' + 
              'WHERE task_id=?';    
  var INSERT_PROGRESS_PREPARED_STATEMENT = 
              'INSERT INTO progress (task_id, date, progress, timerLastStarted) ' + 
              'VALUES (?, ?, ?, ?)'; 
  var UPDATE_PROGRESS_PREPARED_STATEMENT = 
              'UPDATE progress ' +
              'SET task_id=?, date=?, progress=?, timerLastStarted=? ' +
              'WHERE id=?';
  var DELETE_PROGRESS_PREPARED_STATEMENT = 
              'DELETE FROM progress ' + 
              'WHERE task_id=?'

  
                        
  /**
   * Insert a Task object into the database.
   * 
   * Parameters:
   *  - task: The task to insert. 
   * 
   * Callback:
   *  error: error if an error occured, null otherwise.
   *  id: the id used to uniquely identify the task in the database. 
   * 
   */
  self.createTask = function(task, callback) {
    var progressCount = task.progress.length;
    var progressCnter = 0;
    
    DB.query(INSERT_TASK_PREPARED_STATEMENT, insertTaskQueryAttr(task))
      .then(function(task_result) { 
        var task_id = task_result.insertId;
        task.days.task_id = task_id; // assign the task's new id to it's days.
        DB.query(INSERT_DAYS_PREPARED_STATEMENT, insertDaysQueryAttr(task.days))
          .then(function(days_result) {
            
            // No progress
            if(task.progress.length == 0) {
              callback(null, task_id);
              return;
            }
            
            angular.forEach(task.progress, function(progress) {
              progress.task_id = task_id;
              DB.query(INSERT_PROGRESS_PREPARED_STATEMENT, insertProgressQueryAttr(progress))
                .then(function(){
                  progressCnter++;
                  if(progressCnter === progressCount) {
                    callback(null, task_id);
                  }    
                });
              
            });
          });
      });
  };
  
  /**
   * Update a task in the database.
   * 
   * Note that this method knows which task to update by the id.
   * 
   * Paramaters:
   *  - task: The updated task.
   */
  self.updateTask = function(task, callback) {
   var progressSize = task.progress.length;
   var progressUpdatedCount = 0;
   
    var updateTaskQueryAttrs = insertTaskQueryAttr(task);
    updateTaskQueryAttrs.push(parseInt(task.id, 10));      // add the task id for updating   
        
    var updateDaysQueryAttrs = insertDaysQueryAttr(task.days);
    updateDaysQueryAttrs.push(parseInt(task.days.id, 10)); // add the day id for updating
    
    // Update the task
    DB.query(UPDATE_TASK_PREPARED_STATEMENT, updateTaskQueryAttrs)
      .then(function(task_result){      
          // Update Days
          DB.query(UPDATE_DAYS_PREPARED_STATEMENT, updateDaysQueryAttrs)
            .then(function(result) {
              // Update progress
              if(progressSize == 0) {
                if(callback) callback(null);
              }
              
              angular.forEach(task.progress, function(progress){
                var updateProgressQueryAttrs = insertProgressQueryAttr(progress);
                updateProgressQueryAttrs.push(progress.id);

                DB.query(UPDATE_PROGRESS_PREPARED_STATEMENT, updateProgressQueryAttrs)
                  .then(function() {
                    progressUpdatedCount++;
                      
                    if(progressUpdatedCount == progressSize) {
                      if(callback) callback(null);
                    }
                  });  
              }); 
          });                    
    });
  };
  
  
  /**
   * Add a new progress item to the task in the database.
   * 
   * Note: This method will not update the task argument.
   * 
   * Callback takes the inserted id.
   */
  self.addProgressToTask = function(task, progress, callback) {
    var insertProgressQueryAttrs = insertProgressQueryAttr(progress);
    
    DB.query(INSERT_PROGRESS_PREPARED_STATEMENT, insertProgressQueryAttrs)
      .then(function(result) {
        if(callback) callback(result.insertId);
      });
  }
  
  /**
   * Delete the task from the database.
   * 
   * Note that this method knows which task to delete by the id.
   * 
   * Parameters:
   *  - task: The task to delete
   */
  self.deleteTask = function(task, callback) {
    // Delete the task
    DB.query(DELETE_TASK_PREPARED_STATEMENT, [task.id])
      .then(function() {
        // Delete the days associated to task
        DB.query(DELETE_DAYS_PREPARED_STATEMENT, [task.id])
          .then(function() {
          
            // Delete the progress associated to tasks      
            DB.query(DELETE_PROGRESS_PREPARED_STATEMENT, [task.id])
              .then(function() {
                callback();
              });
          });
        });
    
  };


  /**
   * Retrieve all of the tasks from the database.
   * 
   * Callback:
   *  error: error if an error occured, null otherwise.
   *  tasks: an array of all the tasks in the database.
   */
  self.getAll = function(callback) {
    var populatedCount = 0;
    var totalTaskCount = 0;
    
    var allTasks = [];
    
    DB.query(SELECT_ALL_TASK_PREPARED_STATEMENT, [])
    .then(function(result) {
      // Retrieve all of the tasks in the database
      allTasks = DB.fetchAll(result);
      totalTaskCount = allTasks.length;
      
      // No tasks in database
      if(totalTaskCount === 0) {
        callback(null, []);
        return;
      }
      
      // Populate allTasks
      angular.forEach(allTasks, function(task) {
      
        DB.query(SELECT_DAYS_PREPARED_STATEMENT, [task.id])
          .then(function(result) {
            task.days = DB.fetch(result);
            
            
            DB.query(SELECT_PROGRESS_PREPARED_STATEMENT, [task.id])
              .then(function(result) {
                task.progress = DB.fetchAll(result);  
                populatedCount++;
                
                // Return the tasks when all of them have been populated.
                if(populatedCount === totalTaskCount) {
                  // Construct new Tasks under the Task Prototypes
                  var newTasks = sqlTaskToTasks(allTasks);
                  callback(null, newTasks);                
                }
              });
            });
       });          
    });
  };
  
  /**
   * Retrieve a task from the database by id.
   * 
   * Parameters:
   *  - id: The id to query the database with for a task.
   * 
   * Callback:
   *  error: error if an error occured, null otherwise.
   *  task: the task identified by the id.
   */
  self.getTaskById = function(id, callback) {
    var some_task;
               
    DB.query(SELECT_TASK_BY_ID_PREPARED_STATEMENT, [id])
      .then(function(result) {
        
        some_task = DB.fetch(result);
        
        // Return early if it does not exist in the database.
        if(some_task == null) {
          callback(null, null);
          return;
        }
        
        DB.query(SELECT_DAYS_PREPARED_STATEMENT, [id])
          .then(function(result) {
            some_task.days = DB.fetch(result);
            
            DB.query(SELECT_PROGRESS_PREPARED_STATEMENT, [id])
              .then(function(result) {
                some_task.progress = DB.fetchAll(result);
                
                // Construct a new Task under the Task prototype    
                var newTask = new Task(some_task);
                callback(null, newTask);
              });
          });    
      });
  };
  
  /**
   * - PRIVATE - 
   * Convert a Task object into an array of attributes that is suitable for SQL Queries.
   * 
   */
  var insertTaskQueryAttr = function(task) {
    
    return [task.name, 
            (task.isActive) ? 1 : 0, 
            task.frequency, 
            (task.isTime) ? 1 : 0, 
            (task.isCount) ? 1 : 0,
            task.goal, 
            task.icon, 
            (task.isTimerRunning) ? 1 : 0, 
            task.creationDate.getTime() ,
            task.isShared
            ];
  };
  
  /**
   * - PRIVATE - 
   * Convert a Day object into an array of attributes that is suitable for SQL Queries.
   * 
   */
  var insertDaysQueryAttr = function(days) {
      return [days.task_id,
              (days.sunday) ? 1 : 0,
              (days.monday) ? 1 : 0,
              (days.tuesday) ? 1 : 0,
              (days.wednesday) ? 1 : 0,
              (days.thursday) ? 1 : 0,
              (days.friday) ? 1 : 0,
              (days.saturday) ? 1 : 0];
  };
  
  /**
   * - PRIVATE - 
   * Convert a Progress object into an array of attributes that is suitable for SQL Queries.
   * 
   */
  var insertProgressQueryAttr = function(progress) {
    return [progress.task_id,
            progress.date.getTime(),
            progress.progress,
            progress.timerLastStarted ? progress.timerLastStarted.getTime() : 0 ];
  };
  
  /**  
   * All tasks returned from the database are read-only. 
   * In order to do writes to the task properties in memory,
   * they must be newly constructed under the Task prototype.
   * 
   * This method takes the collection of SQL tasks and returns 
   * writable tasks.
   *  
   * Parameters:
   *  - tasks: The array of SQL retrieved tasks
   * Returns:
   *  Newly constructed task objects which can be written to.
   */
  var sqlTaskToTasks = function(tasks) {
    var constructedTasks = [];
    
    // Take each task from the SQL retrieved tasks and 
    // use it to construct a new task under the Task prototype.
    angular.forEach(tasks, function(task) {
      var constructedTask = new Task(task);
      constructedTasks.push(constructedTask);
    });
      
    return constructedTasks;
  }
  
  return self;
});