/**
 * Day object
 */

/**
 * Day constructor from SQLite representation
 */ 
var Day = function(day) {
	this.id = day.id;
	this.task_id = day.task_id;
	this.sunday = day.sunday;
	this.monday = day.monday;
	this.tuesday = day.tuesday;
	this.wednesday = day.wednesday;
	this.thursday = day.thursday;
	this.friday = day.friday;
	this.saturday = day.saturday;
}