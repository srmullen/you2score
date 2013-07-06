define(["base/BaseCollection", "../models/NoteModel"], function (BaseCollection, NoteModel) {

	var NoteCollection = BaseCollection.extend({

		model: NoteModel,

		initialize: function () {
			console.log("Initializing NoteCollection");
		},

		/*
		 * @return {number} the sum of all note durations in the collection.
		 */
		getTotalDuration: function () {
			return this.reduce(function (n, m) {
				return n + m.get("duration");
			}, 0);
		},

		/*
		 * Adds a note to the end of the collection.
		 */
		addNote: function (note) {
			this.add(note);
		}

	});
	return NoteCollection;
});