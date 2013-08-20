define(["base/PaperBaseView", "../models/NoteModel"], function (PaperBaseView, NoteModel) {

	var NoteView = PaperBaseView.extend({

		initialize: function () {
			console.log("Initializing NoteView");
			this.group = new paper.Group();
			this.pitch = this.model.get('pitch');

			this.clef = this.options.cleff || "treble";
			// this.headSize = [this.$el.width() / 45, this.$el.height() / 125]; // FIXME: divisions are hacks
		},

		render: function () {
			return this;
		},

		// FIXME: baseNote feels kinda wrong. seems like it should just need the
		// x position and y position
		drawHead: function (baseNote, xPos, yPos) {
			var type = this.model.get("type");

			var outerRect = new paper.Rectangle({
				// size: this.headSize
				size: [13, 10] // 10 is the lineSpacing
			});
			var head = new paper.Path.Ellipse(outerRect);
			this.noteHandles = head;

			// draw the hole in the note head
			if (type >= 1/2) {
				var innerRect = new paper.Rectangle({
					point: outerRect.point.add(2.5, 2),
					size: [8, 6] // FIXME: Arbitrary numbers. Should be based on outerRect size.
				});
				var hole = new paper.Path.Ellipse(innerRect);
				head = new paper.CompoundPath([head, hole]);
			}
			head.fillColor = 'black';

			this.group.addChild(head);
			this.group.position = baseNote.point.add([xPos, yPos]);

			return this;
		},

		/*
		 * @centerLine - {Point} B line on treble clef, left-most point in the measure.
		 */
		drawStem: function (centerLine, octaveHeight) {
			var type = this.model.get("type");
			var head = this.group.lastChild; // FIXME: this works because draw head is called right before in MeasureView
			// draw the stem
			if (type < 1) {
				if (this.noteHandles.segments[2].point.y > centerLine.y) {
					// draw stem up
					var rightPoint = this.noteHandles.segments[2].point;
					if (Math.abs(rightPoint.y - centerLine.y) < octaveHeight) {
						var stem = new paper.Path.Line(rightPoint, rightPoint.subtract([0, octaveHeight])); // draw octave length stem
					} else {
						// draw stem to center line
						var stem = new paper.Path.Line(this.noteHandles.segments[2].point, new paper.Point(this.noteHandles.segments[2].point.x, centerLine.y));
					}
					
				} else {
					// draw stem down
					var leftPoint = this.noteHandles.segments[0].point;
					if (Math.abs(leftPoint.y - centerLine.y) < octaveHeight) {
						// draw octave length stem
						var stem = new paper.Path.Line(leftPoint, leftPoint.add([0, octaveHeight])); // draw octave length stem
					} else {
						// draw stem to center line
						var stem = new paper.Path.Line(leftPoint, new paper.Point(this.noteHandles.segments[0].point.x, centerLine.y));
					}
				}

				stem.strokeColor = 'black';
				stem.strokeWidth = 2;
				this.group.addChild(stem);
			}

			return this;
		},

		drawFlag: function () {

			return this;
		},

		drawAccidental: function () {

		},

		drawSharp: function () {

		},

		drawFlat: function () {

		},

		/*
		 * @centerLine {Point} the leftmost point of the center line in the measure.
		 * @lineSpaceing {Integer} distance between lines in a measure.
		 */
		drawLegerLines: function (centerLine, lineSpacing) {
			// get the distance from the center line.
			var distance = this.noteHandles.segments[2].point.y - centerLine.y;
			var legerLines = [];

			if (Math.abs(distance) >= lineSpacing * 3) {
				// var highLine = new paper.Path.Line(this.noteHandles.segments[0].point.subtract(10,0), this.noteHandles.segments[2].point.add(10,0))
				for (var i = 0; i < (distance - (lineSpacing * 2)) / lineSpacing; i++) {
					// var highLine = new paper.Path.Line(this.noteHandles.segments[0].point.subtract(10,0), this.noteHandles.segments[2].point.add(10,0))
					// legerLines.push(new paper.Path(centerLine.subtract(10, lineSpacing * (-3 + i)), centerLine.add(10, lineSpacing * (3 + i))))
					legerLines.push(new paper.Path.Line(new paper.Point(this.noteHandles.segments[0].point.x - 10, centerLine.y + (lineSpacing * 3) + i), new paper.Point(this.noteHandles.segments[2].point.x + 10, centerLine.y + (lineSpacing * 3) + i)))
				}
			}

			if (legerLines) {
				// legerLines.strokeColor = 'black';
				this.group.addChildren(legerLines);
				this.group.strokeColor = 'black';
			}
			return this
		},

		updatePosition: function (event) {

			this.circle.position = event.point;
		}
	});
	return NoteView;
});