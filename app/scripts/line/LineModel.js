define(["base/BaseModel"],
function (BaseModel) {

	var LineModel = BaseModel.extend({

		name: "LineModel",

		/*
		 * Attributes:
		 * 	width: Float between 0 and 1. Percentage of the page the line takes up.
		 * 	spacing: distance between the note lines
		 *	measures: {number} Number of measures to render on the line.
		 */

		 defaults: {
		 	width: 0.9,
		 	spacing: 10,
		 	measuresAllotted: 4
		 }
	});
	return LineModel;
});