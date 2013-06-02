define(["base/BaseCollection", "../notes/NoteModel"], function (BaseCollection, NoteModel) {
	"use strict"

	var NoteCollection = BaseCollection.extend({
		model: NoteModel
	});
	return NoteCollection;
});