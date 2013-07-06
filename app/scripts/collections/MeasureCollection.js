define(["base/BaseCollection", "../models/MeasureModel"], function (BaseCollection, MeasureModel) {

	var MeasureCollection = BaseCollection.extend({

		model: MeasureModel,
		
		initialize: function () {
			// Add a measure if none are passed in
			if (this.isEmpty()) this.add(new MeasureModel());
		},

		/*
		 * Adds a measure to the measure collection.
		 */
		addMeasure: function (measure) {
			this.add(measure);
		},

		/*
		 * Gets the mesure at the given index.
		 */
		getMeasure: function (index) {
			return this.at(index);
		},

		/*
		 * Not sure this method is needed or a good idea.
		 * @param note {NoteModel}
		 * Adds a note to the first MeasureModel with free space. If there is not enough
		 * free space it will create a new measure.
		 */
		addNote: function (note) {
			var measure = this.find(function (msr) {
				return msr.canAdd(note);	
			});

			measure.addNote(note);
		}
	});
	return MeasureCollection;
});