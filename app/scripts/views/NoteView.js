define(["base/PaperBaseView", "../models/NoteModel"], function (PaperBaseView, NoteModel) {

	var NoteView = PaperBaseView.extend({

		initialize: function () {
			console.log("Initializing Paper");
			
			var noteHead, stem, flag;

			// paper.setup(this.el);
			
			// Whole Note
			// var noteGroup = new Group();

			var outterRect = new paper.Rectangle({
				point: [160, 160],
				size: [100, 60]
			});
			var innerRect = new paper.Rectangle({
				point: [175, 163],
				size: [70, 55]
			});

			// var wholeNote = new paper.Group([outterRect, innerRect]);
			var head = new paper.Path.Ellipse(outterRect);
			var hole = new paper.Path.Ellipse(innerRect);

			head.fillColor = 'black';
			hole.fillColor = 'white';
			var group = new paper.Group([head, hole]);
			group.scale(0.25);

			// paper.view.draw();

		},

		updatePosition: function (event) {
			// console.log(event.point);

			this.circle.position = event.point;
		}
	});
	return NoteView;
});