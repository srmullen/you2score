define(["base/BaseModel", "../collections/MeasureCollection"], function (BaseModel, MeasureCollection) {

	/**
	 * Attributes:
	 *	instrument	{String (for now)} - The instrument the staff is to be played by.
	 *	measures	{MeasureCollection[], MeasureCollection} - Array of MeasureModels, one for each line of music.
	 *  notes		{NoteCollection[], NoteCollection} - same number and order as measures
	 */
	var StaffModel = BaseModel.extend({
		
		defaults: {
			// If more than one, array from highest to lowest
			measures: new MeasureCollection(),
			notes: new NoteCollection()
		},

		initialize: function () {
			console.log("Initializing StaffModel");

		},

		// Not important right now. Implement in the future
		transpose: function (key) {}
	});
	return StaffModel;
});