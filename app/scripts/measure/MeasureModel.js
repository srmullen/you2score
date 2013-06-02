define(["base/BaseModel", "../notes/NoteModel", "./NoteCollection"], function (BaseModel, NoteModel, NoteCollection) {
	"use strict"

	var MeasureModel = BaseModel.extend({

		count: 4,

		noteVal: 4,

		number: null, // might just want to make this the id

		clef: "treble",

		noteCollection: new NoteCollection(),

		// Add a note to the models note collection
		// should take parameters or an already existing note.
		addNote: function () {
			var note = new NoteModel();
			this.noteCollection.add(note);
		}
	});
	return MeasureModel;
});