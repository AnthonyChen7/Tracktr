/**
 * Progress object
 */

/**
 * Progress constructor from SQLite representation
 */ 
var Progress = function(progress) {
	this.id = progress.id;
	this.task_id = progress.task_id;
	this.date = new Date(parseInt(progress.date, 10));
	this.progress = progress.progress;
	this.timerLastStarted = new Date(parseInt(progress.timerLastStarted, 10));
}