define(["base/BaseModel", "../collections/MeasureCollection"], function (BaseModel, MeasureCollection) {

	/**
	 * Attributes:
	 *	instrument	{String (for now)} - The instrument the staff is to be played by.
	 *	measures	{MeasureCollection[], MeasureCollection} - Array of MeasureModels, one for each line of music.
	 */
	var StaffModel = BaseModel.extend({

		locked: false,
		
		defaults: {
			// There needs to be a mesure collection for each span
			// Not yet sure of how I want to deal with this.
			measures: new MeasureCollection(),

			// Span is the number of lines in the staff, (example. grand staff would be 2)
			span: 1
		},

		initialize: function () {
			console.log("Initializing StaffModel");
		}
	});
	return StaffModel;
});