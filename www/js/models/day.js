/**
 * Day object
 */

/**
 * Day constructor from SQLite representation
 */ 
var Day = function(day) {
	this.id = day.id;
	this.task_id = day.task_id;
	this.sunday = (day.sunday == 1);
	this.monday = (day.monday == 1);
	this.tuesday = (day.tuesday == 1);
	this.wednesday = (day.wednesday == 1);
	this.thursday = (day.thursday == 1);
	this.friday = (day.friday == 1);
	this.saturday = (day.saturday == 1);
}