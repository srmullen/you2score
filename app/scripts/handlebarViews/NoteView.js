define(["base/HandlebarsBaseView"], function (HandlebarsBaseView) {
	"use strict";

	var NoteView = HandlebarsBaseView.extend({

		construct: function () {
			console.log("Constructing NoteView");
		}
	});
	return NoteView;
});