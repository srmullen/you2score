define(["base/HandlebarsBaseView",
	"./NoteView"], function (HandlebarsBaseView, NoteView) {
	"use strict";

	var MeasureView = HandlebarsBaseView.extend({

		construct: function () {
			console.log("Constructing MeasureView");
			this.createNotesView(this.model.get("notes"));
		},

		createNotesView: function (notesCollection) {
			notesCollection.each(function (model) {
				this.addChildView(NoteView, {model: model});
			}, this);
		}
	});
	return MeasureView;
});