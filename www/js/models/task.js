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

function countProgress(aTask){
  var result = 0;
  
  if(aTask.frequency === 0){
    //Daily
    for(var i = 0; i < aTask.progress.length ; i++){
      result += aTask.progress[i].progress;
    }
  }
  
  return result;
}