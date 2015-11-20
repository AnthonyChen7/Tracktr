/**
 * Task object
 */

/**
 * Task constructor from SQLite or Firebase representation
 */ 
var Task = function(task) {
  this.id = task.id;
  this.name = task.name;
  this.isActive = (task.isActive ? true : false);
  this.frequency = task.frequency;
  this.isTime = (task.isTime ? true : false);
  this.isCount = (task.isCount ? true : false);
  this.goal = task.goal;
  this.icon = task.icon;
  this.isTimerRunning = (task.isTimerRunning ? true : false);
  this.creationDate = new Date(parseInt(task.creationDate, 10));
  this.isShared = (task.isShared ? true : false);
  this.fbID = task.fbID;
  this.firebaseRefID = task.firebaseRefID;
  this.isFromFB = (task.isFromFB ? true : false);
  this.isImported = (task.isImported ? true : false);

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
 * @Param format is the output format, 1:seconds, 2:minutes, 3:hours
 * For count tasks, simply use task.getProgress() with no parameters
 */
Task.prototype.getProgress = function(format){
  var aTask = this;
  var result = 0;
  
  if(aTask.frequency === 0){
    //Daily
    var today = new Date();
    today.setHours(0,0,0,0);
    var lastSecondOfToday = new Date();
    lastSecondOfToday.setHours(23,59,59,999);   
    for(var i = 0; i < aTask.progress.length ; i++){
       if(today.getTime() <= aTask.progress[i].date.getTime() && aTask.progress[i].date.getTime() <= lastSecondOfToday.getTime()) {
         result += aTask.progress[i].progress;
       }
    }
  }else if(aTask.frequency === 1){
    //weekly
    
    var today = new Date();
    
    var lastSunday = new Date(today);
    lastSunday.setDate(lastSunday.getDate() - lastSunday.getDay());
    lastSunday.setHours(0,0,0,0);
    
    var nextSunday = new Date(today);
    nextSunday.setDate(nextSunday.getDate() + 7 - nextSunday.getDay());
    nextSunday.setHours(23,59,59,999);  
    
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
    firstDayOfMonth.setHours(0,0,0,0);
    var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1);
    lastDayOfMonth.setHours(23,59,59,999);  
    
    for(var i = 0; i < aTask.progress.length ; i++){
      
      if(firstDayOfMonth.getTime() <= aTask.progress[i].date.getTime() && aTask.progress[i].date.getTime() <= lastDayOfMonth.getTime()){
      result += aTask.progress[i].progress;
      } 
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
}

/*
   * Count the amount time spent on the task
   * @Param format is the output format, 1:seconds, 2:minutes, 3:hours
   */
Task.prototype.countTime = function(format) {
    var aTask = this;
    var result = 0;
    if(aTask.isTime) {
      // for(var i = 0; i < task.progress.length; i++) {
      //   result += task.progress[i].progress;
      // }
      if(aTask.frequency === 0){
    //Daily
    var today = new Date();
    today.setHours(0,0,0,0);
    var lastSecondOfToday = new Date();
    lastSecondOfToday.setHours(23,59,59,999);   
    for(var i = 0; i < aTask.progress.length ; i++){
       if(today.getTime() <= aTask.progress[i].date.getTime() && aTask.progress[i].date.getTime() <= lastSecondOfToday.getTime()) {
         result += aTask.progress[i].progress;
       }
    }
  }else if(aTask.frequency === 1){
    //weekly
    
    var today = new Date();
    
    var lastSunday = new Date(today);
    lastSunday.setDate(lastSunday.getDate() - lastSunday.getDay());
    lastSunday.setHours(0,0,0,0);
    
    var nextSunday = new Date(today);
    nextSunday.setDate(nextSunday.getDate() + 7 - nextSunday.getDay());
    nextSunday.setHours(23,59,59,999);  
    
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
    firstDayOfMonth.setHours(0,0,0,0);
    var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1);
    lastDayOfMonth.setHours(23,59,59,999);  
    
    for(var i = 0; i < aTask.progress.length ; i++){
      
      if(firstDayOfMonth.getTime() <= aTask.progress[i].date.getTime() && aTask.progress[i].date.getTime() <= lastDayOfMonth.getTime()){
      result += aTask.progress[i].progress;
      } 
    }
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
   *  h:mm:ss
   */
  Task.prototype.getGoalTime = function(){
    var aTask = this;
    var hours = Math.floor(aTask.goal / 60);
    var minutes = aTask.goal % 60;
    
    var result = hours + ":"+ pad(minutes) + ":" + "00";
    
    return result;
  }
  
    /**
   * Returns a string that states that task's total time in the format
   *  h:mm:ss
   */
  Task.prototype.getTotalTime = function(){
    var aTask = this;
    var hours = aTask.getProgress(3);
    var minutes = aTask.getProgress(2);
    var seconds = aTask.getProgress(1);
    
    var result = hours + ":"+ pad(minutes) + ":" + pad(seconds);
    return result;
  }
  
   /*
   * Return true if it is a weekly task
   */
  Task.prototype.isTaskWeekly = function() {
    var task = this;
    if(task.frequency === 1)
       return true;
    else 
       return false;
  };
  
  
  /*
   * Return true if it is a monthly task
   */
  Task.prototype.isTaskMonthly = function() {
    var task = this;
    if(task.frequency === 2)
       return true;
    else 
       return false;
  };
  
  /*
   * Return true if it is a daily  task
   */
  Task.prototype.isTaskDaily = function() {
    var task = this;
    if(task.frequency === 0)
       return true;
    else 
       return false;
  };
  
/**
 * Puts a 0 before the number if its < 10
 * Returns a string
 */
function pad(num){
  var result = "";
  if(num < 10){
    result += "0"+num;
    return result;
  }else{
    result += num;
    return result;
  }
};

/**
 * Firebase does not store everything that we want it to.
 * 1. dates to numbers
 */
Task.prototype.prepareForFirebase = function() {
  this.creationDate = this.creationDate.getTime();

  for(var i = 0; i < this.progress.length; i++) {
    var progress = this.progress[i];
    
    progress.date = progress.date.getTime();
    progress.timerLastStarted = progress.timerLastStarted.getTime();
  }
  
}

/**
 * Opposite of prepareForFirebase
 */
Task.prototype.parseFromFirebase = function() {
  this.creationDate = new Date(this.creationDate);

  for(var i = 0; i < this.progress.length; i++) {
    var progress = this.progress[i];
    
    progress.date = new Date(progress.date);
    progress.timerLastStarted = new Date(progress.timerLastStarted);
  }

}

function parseFromFirebase(task) {
  
   task.creationDate = new Date(task.creationDate);
  
  for(var i = 0; i < task.progress.length; i++) {
    var progress = task.progress[i];
    
    progress.date = new Date(progress.date)
    progress.timerLastStarted = new Date(progress.timerLastStarted);
  }
}

