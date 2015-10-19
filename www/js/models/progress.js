/**
 * Progress object
 */

/**
 * Progress constructor from SQLite representation
 */ 
var Progress = function(progress) {
	this.id = progress.id;
	this.task_id = progress.task_id;
	this.day = new Date(progress.date);
	this.progress = progress.integer;
	this.timerLastStarted = new Date(progress.date);
}