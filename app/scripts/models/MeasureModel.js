define(["base/BaseModel", "../collections/NoteCollection"], function (BaseModel, NoteCollection) {

	/**
	 * Atributes:
	 *	key {string} - the key of the measure
	 *	accidentals {Object?} - note to accidental mapping (I can't remember what I wanted this for)
	 *	clef {string} - which clef is the measure written in
	 *	meter {Object} - example {upper: 3, lower: 4} it might be a good idea to use where in 
	 *		the futher there could be Backbone objects.
	 *	notes {NoteCollection} - Collection of notes in the measure
	 */
	var MeasureModel = BaseModel.extend({

		// clef might be better as an attribute of StaffModel, and can be overwritten for
		// individual measure when it needs to be
		// defaults: {
		// 	clef: "treble",
		// },
		
		initialize: function () {
			console.log("Initializing MeasureModel");

			if (this.get("notes") === undefined) {
				this.set({notes: new NoteCollection});
			}
		},

		// Can only add one note at a time.
		// Multiple notes should only need to be added when MeasureModel is initialized.
		/**
		 * @param note {NoteModel} - the NoteModel to be added to the NoteCollection
		 */
		addNote: function (note) {
			if (this.canAdd(note)) {
				this.get('notes').add(note);
			}
		},

		/**
		 * @param note {NoteModel} the note in question
		 * @return {boolean} true if the note can be added to the Measure, false otherwise
		 */
		canAdd: function (note) {
			if (this.get("meter") === undefined) return true;
		}
	});
	return MeasureModel;
});