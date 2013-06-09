define(["base/PaperBaseView", "../models/NoteModel"], function (PaperBaseView, NoteModel) {

	var NoteView = PaperBaseView.extend({

		initialize: function () {
			console.log("Initializing NoteView");
			this.group = new paper.Group();
			this.pitch = this.model.get('pitch');
		},

		// FIXME: baseNote feels kinda wrong. seems like it should just need the
		// x position and y position
		drawHead: function (baseNote, xPos, yPos) {
			var type = this.model.get("type");

			var outerRect = new paper.Rectangle({
				size: [100, 60]
			});
			var head = new paper.Path.Ellipse(outerRect);
			this.noteHandles = head;

			// draw the hole in the note head
			if (type >= 1/2) {
				var innerRect = new paper.Rectangle({
					point: outerRect.point.add(15, 3),
					size: [70, 55]
				});
				var hole = new paper.Path.Ellipse(innerRect);
				head = new paper.CompoundPath([head, hole]);
			}
			head.fillColor = 'black';

			this.group.addChild(head);
			this.group.position = baseNote.point.add([xPos, yPos]);

			return this;
		},

		drawStem: function (centerLine) {
			var type = this.model.get("type");
			var head = this.group.lastChild;
			// draw the stem
			if (type < 1) {
				if (this.noteHandles.segments[2].point.y > centerLine.point.y) {
					// draw stem up
					var rightPoint = this.noteHandles.segments[2].point;
					if (Math.abs(rightPoint.y - centerLine.point.y) < 280) {
						// FIXME: 280 is a hack, should be 7 times the distance of a note step
						var stem = new paper.Path.Line(rightPoint, rightPoint.subtract([0, 280])); // draw octave length stem
					} else {
						// draw stem to center line
						var stem = new paper.Path.Line(this.noteHandles.segments[2].point, centerLine.point.add(this.noteHandles.segments[2].point.x, 0));
					}
					
				} else {
					// draw stem down
					var leftPoint = this.noteHandles.segments[0].point;
					if (Math.abs(leftPoint.y - centerLine.point.y) < 280) {
						// draw octave length stem
						var stem = new paper.Path.Line(leftPoint, leftPoint.add([0, 280])); // draw octave length stem
					} else {
						// draw stem to center line
						var stem = new paper.Path.Line(leftPoint, centerLine.point.add(this.noteHandles.segments[0].point.x, 0));
					}
				}

				stem.fillColor = 'black';
				stem.strokeWidth = 2;
				this.group.addChild(stem);
			}

			return this;
		},

		drawFlag: function () {

			return this;
		},

		// getYposition is now being calculated in the measure view
		/**
		 *	@param step - the pixel distance between notes on the staff.
		 *	@return - the vertical position of the note.
		 */
		// getYPosition: function (baseNote, step) {
		// 	var octave = this.model.get('pitch').octave;
		// 	var degree = this.model.get('pitch').degree;
		// 	diffY = (baseNote.degree + (baseNote.octave * 7)) - (degree + (octave * 7));
		// 	return diffY * step;
		// },

		getXPosition: function () {

		},

		updatePosition: function (event) {
			// console.log(event.point);

			this.circle.position = event.point;
		}
	});
	return NoteView;
});