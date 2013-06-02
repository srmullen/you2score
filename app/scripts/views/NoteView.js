define(["base/PaperBaseView", "../models/NoteModel"], function (PaperBaseView, NoteModel) {

	var NoteView = PaperBaseView.extend({

		initialize: function () {
			console.log("Initializing Paper");
			paper.setup(this.el);

			var path = new paper.Path();

			path.strokeColor = "black";

			var start = new paper.Point(100, 100);

			path.moveTo(start);

			path.lineTo(start.add([200, -50]));

			paper.view.draw();
		}
	});
	return NoteView;
});