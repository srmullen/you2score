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
		//
		// FIXME: Realizing it is not so simple just to merge from the NotesCollection.
		// Should be more stict with what can be done in the beginning and give the
		// user more freedom as features are developed. It will be easier to just add
		// notes at the measure level right now.
		notesIntoMeasures: function () {
			var notes = this.get("notes"),
				measures = this.get("measures");
			// no need to do anymore work if there are no notes to merge
			if (notes.isEmpty()) return;


			// if (measures.isEmpty()) {
			// 	this.addMeasure(new MeasureModel());
			// }

			// should verify before this point that notes can be added.
			notes.forEach(function (note) {
				measures.addNote(note);
			});
		},

		/*
		 * Adds a note to the end of the staff model unmerged NoteCollection.
		 */
		addNote: function (note) {
			this.get("notes").addNote(note);
		},

		/*
		 * Removes a note from a collection. Doesn't destory it.
		 */
		removeNote: function (note) {
			this.get("notes").remove(note);
		},

		/*
		 * Add a measure to the end of the measure collection.
		 * @param measure - the measure to add
		 * @param index - optional, the location to insert the measure
		 */
		addMeasure: function (measure, index) {
			this.get("measures").add(measure);
		},

		/*
		 * @return MeasureModel at the specified index.
		 */
		getMeasure: function (index) {
			return this.get("measures").at(index);
		},

		// Not important right now. Implement in the future
		transpose: function (key) {}
	});
	return StaffModel;
});