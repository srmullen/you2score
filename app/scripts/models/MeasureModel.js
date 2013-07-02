define(["base/BaseModel", "../collections/NoteCollection"], function (BaseModel, NoteCollection) {

	/**
	 * Atributes:
	 *	key {string} - the key of the measure
	 *	accidentals {Object?} - note to accidental mapping (I can't remember what I wanted this for)
	 *	clef {string} - which clef is the measure written in
	 *	meter {Object} - example {upper: 3, lower: 4} it might be a good idea to use where in 
	 *		the futher there could be Backbone objects.
	 *	notes {NoteCollection} - Collection of notes in the measure
	 *
	 * Properties: Properties can often be calculated from the attributes and don't need to be stored in the DB
	 *	remainingDuration - {Number} the maximum duration of a note that can be place in the measure.
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

			// calculate the remaining duration and set it as a property
			// TORESEARCH: might actually be less expensive to calulate just when it's needed
			this.remainingDuration = this.calculateRemainingDuration();
		},

		// Can only add one note at a time.
		// Multiple notes should only need to be added when MeasureModel is initialized.
		/**
		 * @param note {NoteModel} - the NoteModel to be added to the NoteCollection
		 */
		addNote: function (note) {
			if (this.canAdd(note)) {
				this.get('notes').add(note);
				this.remainingDuration = this.calculateRemainingDuration(); // might want to listen for the add event
			}
		},

		/**
		 * @param note {NoteModel} the note in question
		 * @return {boolean} true if the note can be added to the Measure, false otherwise
		 */
		canAdd: function (note) {
			if (this.get("meter") === undefined) return true;
			if (this.get("remainingDuration") < note.get("duration")) return true;
			return false;
		},

		/*
		 * Calculates the maximum note length that can be added to the note collection.
		 */
		calculateRemainingDuration: function () {
			if (!this.get("meter")) return Infinity;
		},

		calculateTotalDuration: function () {
			var meter = this.get("meter");
			if (meter) { 
				return meter.upper / meter.lower;
			} else {
				return Infinity;
			}
		}
	});
	return MeasureModel;
});