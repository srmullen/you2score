define(["base/BaseModel", "../collections/NoteCollection"], function (BaseModel, NoteCollection) {

	/**
	 * Atributes:
	 *	key {string} - the key of the measure
	 *	accidentals {Object?} - note to accidental mapping
	 *	clef {string} - which clef is the measure written in
	 *	meter {Object} - example {upper: 3, lower: 4} it might be a good idea to use where in 
	 *		the futher there could be Backbone objects.
	 */
	var MeasureModel = BaseModel.extend({

		defaults: {
			key: "C",
			clef: "treble",
			meter: {upper: 4, lower: 4},
			notes: new NoteCollection()
		},
		
		initialize: function () {
			console.log("Initializing MeasureModel");
		},


		// Can only add one note at a time.
		// Multiple notes should only need to be added when MeasureModel is initialized.
		addNote: function (nt) {

		}
	});
	return MeasureModel;
});