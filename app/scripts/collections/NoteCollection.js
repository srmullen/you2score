define(["base/BaseCollection"], function (BaseCollection) {

	var NoteCollection = BaseCollection.extend({

		initialize: function () {
			console.log("Initializing NoteCollection");
		},

		// Should be able to take an array of notes, a single note, or no notes.
		addNotes: function (notes) {

		},

		removeNotes: function () {
			
		}
	});
	return NoteCollection;
});