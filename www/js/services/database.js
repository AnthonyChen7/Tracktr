angular.module('tracktr.services', ['tracktr.config'])
.factory('DB', function($q, DB_CONFIG, $rootScope) {
  var self = this;
  self.db = null;
  
  /**
   * Initialize the Database by nuking all tables, create the database tables, and seeding them.
   * 
   */
  self.init = function(callback) {
    self.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', 5*1024*1024);
    //self.nuke(function(){
    
      var numTables = DB_CONFIG.tables.length;  // Total number of tables to be created
      var numCreatedTables = 0;                 // Current number of tables created
      
      angular.forEach(DB_CONFIG.tables, function(table) {
        var columns = [];
        
        angular.forEach(table.columns, function(column) {
          columns.push(column.name + ' ' + column.type);
        });
        
        var createQuery = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
        var taskQuery = 'SELECT * FROM task';
        
        // Create the tables
        self.query(createQuery).then(function() {
          numCreatedTables++;
          if(numCreatedTables === numTables) {
            callback(); 
            // // Get all tasks and seed the database if it is empty
            // self.query(taskQuery).then(function(data) {
            //   var rows = self.fetchAll(data);
            //   if(rows.length === 0) {
            //     //self.seed(DB_CONFIG.seed_data);  
            //     callback();
            //   }
            // });  
          }
        });
      });
    
    //});
    
    
  };
  
  /**
   * Execute a query on the SQLite Database.
   * 
   * Parameters:
   *  - query: A SQL prepared statement
   *  - bindings: prepared statement bindings
   * 
   * Return:
   *  - A results object containing query results. 
   */ 
  self.query = function(query, bindings) {
    bindings = typeof bindings !== 'undefined' ? bindings : [];
    var deferred = $q.defer();
    self.db.transaction(function(transaction) {
      transaction.executeSql(query, bindings, function(transaction, result) {
        deferred.resolve(result);
        $rootScope.$apply();
      }, function(transaction, error) {
        deferred.reject(error);
      });
    });
    
    return deferred.promise;
  };
  
  /**
   * Convert a SQL Results Object into an array of objects
   * 
   * Parameters:
   *  - sqlResultsObject: A SQL Results Object returned from a query.
   * 
   * Returns:
   *  An array of objects representing the resultsObject
   */
  self.fetchAll = function(sqlResultsObject) {
    var output = [];
    
    for (var i = 0; i < sqlResultsObject.rows.length; i++) {
      output.push(sqlResultsObject.rows.item(i));
    }
    
    return output;
  };
  
  /**
   * Convert a SQL Results Object from a query returning a single row 
   * into a JS Object.
   * 
   * If the Results Object contains more than one row, return the first.
   * 
   * Parameters:
   *  - sqlResultsObject: A SQL Results Object returned from a query.
   * 
   * Returns:
   *  A JS object representing the resultsObject.
   */
  self.fetch = function(sqlResultsObject) {
    return sqlResultsObject.rows.item(0);
  };
  
  
  
  /**
   * - PRIVATE - 
   * Nuke the database, i.e. drop all tables
   */
  self.nuke = function(callback) {
    var tableCount = DB_CONFIG.tables.length;
    var tableCnter = 0;
    
    angular.forEach(DB_CONFIG.tables, function(table) {
      var query = 'DROP TABLE IF EXISTS ' + table.name;
      self.query(query)
        .then(function() {
          tableCnter++;

          if(tableCount == tableCnter) {
            callback();
          }
        });
    });
  };
  
  
  var INSERT_TASK_PREPARED_STATEMENT = 
              'INSERT INTO task (name, isActive, frequency, isTime, ' +
              'isCount, goal, icon, isTimerRunning, creationDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  var INSERT_DAYS_PREPARED_STATEMENT = 
              'INSERT INTO days_of_week (task_id, sunday, monday, tuesday, wednesday, thursday, friday, saturday) ' +
              'VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
              
  var INSERT_PROGRESS_PREPARES_STATEMENT = 
              'INSERT INTO progress (task_id, date, progress, timerLastStarted) ' + 
              'VALUES (?, ?, ?, ?)';
  /**
   * - PRIVATE -
   * Seed the database with dummy data
   */
  self.seed = function(seed_data) {
    var i = 0; // To add progress and days without knowing the parent task id 
    angular.forEach(seed_data, function(some_task) {
      self.query(INSERT_TASK_PREPARED_STATEMENT, [some_task.name, some_task.isActive, some_task.frequency, some_task.isTime,
         some_task.isCount, some_task.goal, some_task.icon, some_task.isTimerRunning, some_task.creationDate])
          .then(function(result){
            
            self.query(INSERT_DAYS_PREPARED_STATEMENT, [i, some_task.days.sunday, some_task.days.monday, some_task.days.tuesday, some_task.days.wednesday,
              some_task.days.thursday, some_task.days.friday, some_task.days.saturday])
              .then(function(result) {
                angular.forEach(some_task.progress, function(progress) {
                  self.query(INSERT_PROGRESS_PREPARES_STATEMENT, [i, progress.date, progress.progress, progress.timerLastStarted]);
                });
              });
          });
      i++;
    });
  };
  
  
  
  return self;
  
});