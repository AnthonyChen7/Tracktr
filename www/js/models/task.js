/**
 * Task object
 */

/**
 * Task constructor from SQLite representation
 */ 
var Task = function(task) {
  this.id = task.id;
  this.name = task.name;
  this.isActive = task.isActive;
  this.frequency = task.frequency;
  this.isTime = task.isTime;
  this.isCount = task.isCount;
  this.goal = task.goal;
  this.icon = task.icon;
  this.isTimerRunning = task.isTimerRunning
  this.creationDate = task.creationDate;

  // Instantiate days
  this.days = new Day(task.days);
  
  // Instantiate progress
  this.progress = [];
  (task.progress).forEach(function(p) {
    this.progress.push(new Progress(p));
  }, this);
  
}