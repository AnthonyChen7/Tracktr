/**
 * Task object
 */

/**
 * Task constructor from SQLite representation
 */ 
var Task = function(task) {
  this.id = task.id;
  this.name = task.name;
  this.isActive = (task.isActive == 1);
  this.frequency = task.frequency;
  this.isTime = (task.isTime == 1);
  this.isCount = (task.isCount == 1);
  this.goal = task.goal;
  this.icon = task.icon;
  this.isTimerRunning = (task.isTimerRunning == 1);
  this.creationDate = new Date(parseInt(task.creationDate, 10));

  // Instantiate days 
  this.days = new Day(task.days);
  
  // Instantiate progress
  this.progress = [];
  (task.progress).forEach(function(p) {
    this.progress.push(new Progress(p));
  }, this);
  
}

/**
 * aTask is a task object
 * Returns the progress (integer) based on the frequency
 */
Task.prototype.getProgress = function(){
  var aTask = this;
  var result = 0;
  
  if(aTask.frequency === 0){
    //Daily
    for(var i = 0; i < aTask.progress.length ; i++){
      result += aTask.progress[i].progress;
    }
  }else if(aTask.frequency === 1){
    //weekly
    
    var today = new Date();
    today.setHours(0,0,0,0);
    
    var lastSunday = new Date(today);
    lastSunday.setDate(lastSunday.getDate() - lastSunday.getDay());
    
    var nextSunday = new Date(today);
    nextSunday.setDate(nextSunday.getDate() + 7 - nextSunday.getDay());
    
    for(var i = 0; i < aTask.progress.length ; i++){
      
      if(lastSunday.getTime() <= aTask.progress[i].date.getTime() && aTask.progress[i].date.getTime() <= nextSunday.getTime()){
      result += aTask.progress[i].progress;
      }
    }
  }
  else if(aTask.frequency == 2){
    //monthly
    var today = new Date();
    var firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(),1);
    var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1);
    
    for(var i = 0; i < aTask.progress.length ; i++){
      
      if(firstDayOfMonth.getTime() <= aTask.progress[i].date.getTime() && aTask.progress[i].date.getTime() <= lastDayOfMonth.getTime()){
      result += aTask.progress[i].progress;
      } 
    }
  }
    
  return result;
}

/*
   * Count the amount time spent on the task
   * @Param format is the output format, 1:seconds, 2:minutes, 3:hours
   */
Task.prototype.countTime = function(format) {
    var task = this;
    var result = 0;
    if(task.isTime) {
      for(var i = 0; i < task.progress.length; i++) {
        result += task.progress[i].progress;
      }
    }
    switch(format) {
       case 1: 
         result = toSeconds(result);
         break;   
       case 2: 
         result = toMinutes(result);
         break;
       case 3: 
         result = toHours(result);
         break;
    }
    return result;
  };
  
  /*
   * Convert milliseconds into seconds
   */
   function toSeconds(num) {
    num = Math.floor(num / 1000);
    return num % 60;
  };
  
  
  /*
   * Convert milliseconds into minutes
   */
  function toMinutes(num) {
    num = Math.floor(num / 60000);
    return num % 60;
  };
  
  
  /*
   * Convert milliseconds into hours
   */
  function toHours(num) {
    num = Math.floor(num / 3600000);
    return num;
  };
  
  /**
   * Returns a string that states that task's goal time in the format
   *  x hours x minute
   */
  Task.prototype.getGoalTime = function(){
    var aTask = this;
    var hours = Math.floor(aTask.goal / 60);
    var minutes = aTask.goal % 60;
    
    var result = "Goal: " +hours + " Hours " + minutes + " Minutes " + "0 Seconds";
    
    return result;
  }
  
