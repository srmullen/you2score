define(["base/BaseModel", "../collections/MeasureCollection", "./MeasureModel", "../collections/NoteCollection"], 
function (BaseModel, MeasureCollection, MeasureModel, NoteCollection) {

	/**
	 * Attributes:
	 *	instrument	{String (for now)} - The instrument the staff is to be played by.
	 *	measures	{MeasureCollection[], MeasureCollection} - Array of MeasureModels, one for each line of music.
	 *  notes		{NoteCollection[], NoteCollection} - same number and order as measures
	 */
	var StaffModel = BaseModel.extend({

		initialize: function () {
			console.log("Initializing StaffModel");

			// Set a MeasureCollection if one wasn't passed in the attributes
			if (this.get("measures") === undefined) {
				this.set({measures: new MeasureCollection()}); 
			}

			// Set a NoteCollection if one wasn't passed in the attributes
			if (this.get("notes") === undefined) {
				this.set({notes: new NoteCollection()});
			}
		},

		// Copies the notes in the note collection into the correct Measure
		notesIntoMeasures: function () {
			// no need to do anymore work if there are no notes to merge
			if (this.get("notes").isEmpty()) return;

			if (this.get("measures").isEmpty()) {
				this.addMeasure(new MeasureModel());
			}
		},

		addNote: function (note) {
			this.get("notes").add(note);
		},

		addMeasure: function (measure) {
			this.get("measures").add(measure);
		},

		// Not important right now. Implement in the future
		transpose: function (key) {}
	});
	return StaffModel;
});