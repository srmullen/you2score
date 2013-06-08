define(["base/PaperBaseView", "../models/NoteModel"], function (PaperBaseView, NoteModel) {

	var NoteView = PaperBaseView.extend({

		initialize: function () {
			console.log("Initializing NoteView");
			this.group = new paper.Group();
			this.pitch = this.model.get('pitch');
		},

		/**
		* @params baseNote / baseOctave - the degree and octave from which
		* to calculate this notes position
		*/
		drawElement: function (baseNote) {

			var positionY,
				step = 40; // half of the arbitrary 80px between each line.

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
			
			// calculate the notes position
			var octave = this.model.get('pitch').octave;
			var degree = this.model.get('pitch').degree;
			positionY = ((baseNote.octave - octave) * 8 * step); // this only considers octave,
																 // also need to add in degree

			// should actually be baseNote's position.add([position, 0])
			this.group.position = baseNote.point.add([0, positionY]);
		},

		updatePosition: function (event) {
			// console.log(event.point);

			this.circle.position = event.point;
		}
	});
	return NoteView;
});