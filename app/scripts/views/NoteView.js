define(["base/PaperBaseView", "../models/NoteModel"], function (PaperBaseView, NoteModel) {

	var NoteView = PaperBaseView.extend({

		initialize: function () {
			console.log("Initializing NoteView");
			this.group = new paper.Group();
			this.pitch = this.model.get('pitch');
		},

		drawElement: function (position) {

			var noteHead, stem, flag;

			var outterRect = new paper.Rectangle({
				size: [100, 60]
			});
			var innerRect = new paper.Rectangle({
				point: outterRect.point.add(15, 3),
				size: [70, 55]
			});

			var head = new paper.Path.Ellipse(outterRect);
			var hole = new paper.Path.Ellipse(innerRect);

			head.fillColor = 'black';
			hole.fillColor = 'white'; // would really like to cut out the middle rather than make it white
			this.group.addChildren([head, hole]);
			
			// this.group.scale(0.25); // this doesn't need to be scaled here now that is part of the measure group.
			
			// group.position = new paper.Point().add(position);
			this.group.position = position;
		},

		updatePosition: function (event) {
			// console.log(event.point);

			this.circle.position = event.point;
		}
	});
	return NoteView;
});