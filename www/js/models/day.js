/**
 * Day object
 */

/**
 * Day constructor from SQLite representation
 */ 
var Day = function(day) {
	this.id = day.id;
	this.task_id = day.task_id;
	this.sunday = (day.sunday ? true : false);
	this.monday = (day.monday ? true : false);
	this.tuesday = (day.tuesday ? true : false);
	this.wednesday = (day.wednesday ? true : false);
	this.thursday = (day.thursday ? true : false);
	this.friday = (day.friday ? true : false);
	this.saturday = (day.saturday ? true : false);
}