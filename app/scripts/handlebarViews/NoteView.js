define(["base/HandlebarsBaseView"], function (HandlebarsBaseView) {

	var NoteView = HandlebarsBaseView.extend({

		construct: function () {
			console.log("Constructing NoteView");
		}
	});
	return NoteView;
});