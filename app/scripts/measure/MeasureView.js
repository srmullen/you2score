define(["base/BaseView", "notes/QuarterNoteView", "./NoteCollection", "text!./measure.tmpl"], 
function (BaseView, QuarterNote, NoteCollection, tmpl) {
	"use strict"

	var MeasureView = BaseView.extend({

		template: tmpl,

		noteCollection: new NoteCollection(),

		construct: function () {
			console.log("Initializing MeasureView");

			this.listenTo(this.noteCollection, "add", function () {
				console.log("Heard add on noteCollection");
			});
		},

		postPlaceAt: function () {


		},

		addNote: function () {
			this.addChildView(QuarterNote, {}, "#line1");
		}
	});
	return MeasureView;
});