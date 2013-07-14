define(["base/BaseModel", "../collections/MeasureCollection", "./MeasureModel", "../collections/NoteCollection"], 
function (BaseModel, MeasureCollection, MeasureModel, NoteCollection) {

	/**
	 * Attributes:
	 *	instrument	{String (for now)} - The instrument the staff is to be played by.
	 *	meter		{Object} - To give to the measures
	 *	measures	{MeasureCollection[]} - Array of MeasureModels, one for each line of music.
	 *  notes		{NoteCollection[]} - same number and order as measures
	 */
	var StaffModel = BaseModel.extend({

		initialize: function (attributes, options) {
			console.log("Initializing StaffModel");
			// Set a MeasureCollection if one wasn't passed in the attributes
			if (!this.get("measures")) {
				this.set({measures: []}); 
			}

			// Set a NoteCollection if one wasn't passed in the attributes
			if (!this.get("notes")) {
				this.set({notes: []});
			}
		},

		parse: function (data, options) {
			// make sure notes and measures are defined
			data.measures = data.measures || [];
			data.notes = data.notes || [];
			
			this.set({
				instrument: data.instrument,
				measures: _.map(data.measures, function (coll) {
					return new MeasureCollection(coll, {parse: true});
				})
				// Ignore notes for now.
				// notes: _.map(data.notes, function (coll) {
				// 	return new NoteCollection(coll);
				// })
			});
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
		 * Convienience method for getting a nested measure.
		 * @return MeasureModel at the specified index.
		 */
		getMeasure: function (i, j) {
			return this.getLine(i).at(j);
		},

		/*
		 * Gets an entire MeasureCollection.
		 */
		getLine: function (index) {
			return this.get("measures")[index];
		},

		/*
		 * @param line - The MeasureCollection to insert into the measures array
		 * @param index - The optional index to insert at
		 */
		addLine: function (line, index) {
			if (typeof index === 'undefined') {
				this.get("measures").push(line);
			} else {
				this.get("measures").splice(index, 0, line);
			}
		},

		// Not important right now. Implement in the future
		transpose: function (key) {}
	});
	return StaffModel;
});