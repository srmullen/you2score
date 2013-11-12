define(["base/BaseModel", 
		"note/NoteCollection"], 
function (BaseModel, NoteCollection) {

	/**
	 * Atributes:
	 *	key {string} - the key of the measure
	 *	accidentals {Object?} - note to accidental mapping (I can't remember what I wanted this for)
	 *	clef {string} - which clef is the measure written in
	 *	meter {Object} - example {upper: 3, lower: 4} it might be a good idea to use where in 
	 *		the futher there could be Backbone objects. Should be same object as in its containing staff
	 *		except when deviating from the norm.
	 *	notes {NoteCollection} - Collection of notes in the measure
	 *	barLength {number} - the length the bar is to be drawn. (not a musical feature, should probably go in rendering specific model)
	 *
	 * Properties: Properties can often be calculated from the attributes and don't need to be stored in the DB
	 *	remainingDuration - {Number} the maximum duration of a note that can be place in the measure.
	 */
	var MeasureModel = BaseModel.extend({

		name: "MeasureModel",

		initialize: function () {
			console.log("Initializing MeasureModel");

			if (this.get("notes") === undefined) {
				this.set({notes: new NoteCollection});
			}

			// calculate the remaining duration and set it as a property
			// TORESEARCH: might actually be less expensive to calulate just when it's needed
			this.remainingDuration = this.calculateRemainingDuration();

			this.on("change:meter", function () {
				this.remainingDuration = this.calculateRemainingDuration();
			});

			// listen to events from the NoteCollection
			this.listenTo(this.get("notes"), "add remove", function () {
				this.remainingDuration = this.calculateRemainingDuration();
			});
		},

		parse: function (data, options) {
			console.log("Parsing MeasureModel");
			this.set({
				key: data.key, 
				accidentals: data.accidentals,
				clef: data.clef,
				meter: data.meter,
				notes: new NoteCollection(data.notes, {parse: true})
			});
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

		removeNote: function (note) {
			this.get('notes').remove(note);
		},

		/**
		 * @param note {NoteModel} the note in question
		 * @return {boolean} true if the note can be added to the Measure, false otherwise
		 */
		canAdd: function (note) {
			if (this.get("meter") === undefined) return true;
			if (this.remainingDuration >= note.get("duration")) return true;
			return false;
		},

		/*
		 * Calculates the maximum note length that can be added to the note collection.
		 */
		calculateRemainingDuration: function () {
			var meter = this.get("meter");
			if (!meter) return Infinity;
			return this.calculateTotalDuration() - this.get("notes").getTotalDuration();
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