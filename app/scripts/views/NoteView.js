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
		drawElement: function (baseNote, xPos, yPos) {

			var outterRect = new paper.Rectangle({
				size: [100, 60]
			});
			var innerRect = new paper.Rectangle({
				point: outterRect.point.add(15, 3),
				size: [70, 55]
			});

			var head = new paper.Path.Ellipse(outterRect);
			var hole = new paper.Path.Ellipse(innerRect);

			var wholeNote = new paper.CompoundPath([head, hole]);
			wholeNote.fillColor = 'black';
			this.group.addChild(wholeNote);
						
			// calculate the notes position
			// var yPos = this.getYPosition(baseNote, 40);

			// should actually be baseNote's position.add([position, 0])
			this.group.position = baseNote.point.add([0, yPos]);
		},

		/**
		 *	@param step - the pixel distance between notes on the staff.
		 *	@return - the vertical position of the note.
		 */
		getYPosition: function (baseNote, step) {
			var octave = this.model.get('pitch').octave;
			var degree = this.model.get('pitch').degree;
			diffY = (baseNote.degree + (baseNote.octave * 7)) - (degree + (octave * 7));
			return diffY * step;
		},

		getXPosition: function () {

		},

		updatePosition: function (event) {
			// console.log(event.point);

			this.circle.position = event.point;
		}
	});
	return NoteView;
});