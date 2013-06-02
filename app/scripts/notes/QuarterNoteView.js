define(
["notes/AbstractNoteView",
 "text!./quarterNote.tmpl"], 
function (AbstractNoteView, tmpl) {

	"use strict"

	var QuarterNoteView = AbstractNoteView.extend({

		template: tmpl,

		construct: function () {
			console.log("Initializing QuarterNoteView");
		}
	});
	return QuarterNoteView;
});