define(["base/PaperBaseView", 
		"./NoteModel"], 
function (PaperBaseView, NoteModel) {

	// May want to make NoteView only responsible for drawing the Note Head (and accidentals).
	// Stems and flags are dependent on the notes they are grouped with as well, so that should
	// be moved to BeatGroupView, or maybe the NoteCollectionView kept by BeatGroupView.
	var NoteView = PaperBaseView.extend({

		name: "NoteView",

		initialize: function () {
			console.log("Initializing NoteView");

			this.activateLayer("note");
			this.group = new paper.Group();

			this.model = this.model || new NoteModel();
			

			this.pitch = this.model.get('pitch');

			this.headSize = [this.config.note.head.width, this.config.note.head.height];
			// this.accidental = this.getAccidental(this.model);

			this.length = this.calculateLength(this.model);
			// Default values for x and y. Should be moved somewhere else.
			// if these are kept as 0, then centerLine is just the position of the note head.
			this.xPos = 0;
			this.yPos = 0;

			this.options.context.highlighter.addView(this);

		},

		/*
		 * Should have the option to render on a measure or just at any given position.
		 * Here's another point where the RenderModel could come in handy.
		 *
		 * This method is for a note to render itself. It can also be rendered by NoteCollectionView.
		 */
		render: function (centerLine, lineSpacing) {
			this.activateLayer(this.constants.layers.NOTE);
			var octaveHeight = lineSpacing ? lineSpacing * 3.5 : this.config.lineSpacing * 3.5,
				stemDirection;

			this.drawHead(centerLine, this.xPos, this.yPos);

			// if stemDirection isn't a default property on the model, then get it.
			// stemDirection could be defaulted as part of the renderModel (if and when it ever exists)
			if (this.model.get("type") < 1) {
				if (!this.stemDirection) {
					stemDirection = this.getStemDirection(centerLine);
				} else {
					stemDirection = this.stemDirection	
				};
			};

			if (stemDirection) {
				this.drawStem(centerLine, octaveHeight, stemDirection);
				this.drawFlag(stemDirection);
			};

			this.drawLegerLines(centerLine, lineSpacing);

			this.drawAccidental();

			this.drawGroupBounds(centerLine, stemDirection);

			return this;
		},

		drawGroupBounds: function (centerLine, stemDirection) {
			this.activateLayer(this.constants.layers.NOTE);

			var yOffset = 0,
				height = this.headSize[1];

			if (this.stem) {
				yOffset = this.stem.length / 2;
				yOffset = (stemDirection === "up") ? -yOffset : yOffset;
				height = this.stem.length + this.headSize[0];
			};

			var rectangle = new paper.Rectangle({
				center: centerLine.add(this.xPos, this.yPos + yOffset),
				size: [this.config.note.minWidth, height]
			});

			rectangle = new paper.Path.Rectangle(rectangle);
			rectangle.fillColor = "white"; // create a fill so the center can be clicked 
			rectangle.opacity = 0.0;
			this.group.insertChild(0, rectangle);
		},

		drawHead: function (centerLine, xPos, yPos) {
			this.activateLayer(this.constants.layers.NOTE);

			var type = this.model.get("type");

			var outerRect = new paper.Rectangle({
				size: this.headSize
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

			this.head = head;
			this.group.addChild(head);
			this.group.position = centerLine.add([xPos, yPos]);

			return this;
		},

		/*
		 * @centerLine - {Point} B line on treble clef, left-most point in the measure.
		 */
		drawStem: function (centerLine, octaveHeight, stemDirection) {
			this.activateLayer(this.constants.layers.NOTE);

			var head = this.head;
			if (stemDirection === "up") {
				// draw stem up
				var rightPoint = this.noteHandles.segments[2].point;
				if (Math.abs(rightPoint.y - centerLine.y) < octaveHeight) { // needs to be extracted. drawFlag also need to
																			// know stem direction
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

			this.stem = stem; // maybe stem should be returned instead, but only if it's not going to be an expectation that all draw methods return this
			return this;
		},

		// drawFlag: function (stemDirection) {

		// 	var type = this.model.get("type");

		// 	if (type === 1/8) {
		// 		var flagPoint; // point on flag not connected to the stem.
		// 		if (stemDirection === "up") {
		// 			flagPoint = this.stem.segments[1].point.add(10, 20);
		// 		} else {
		// 			flagPoint = this.stem.segments[1].point.add(10, -20);
		// 		}
		// 		var flag = new paper.Path(this.stem.segments[1].point, flagPoint);
		// 		flag.strokeColor = 'black';
		// 		flag.strokeWidth = 2;
		// 		this.group.addChild(flag);
		// 	}

		// 	return this;
		// },

		drawFlag: function (stemDirection) {

			var type = this.model.get("type");

			if (type === 1/8) {
				var flagSvg = paper.project.importSVG(document.getElementById('eigthFlagSVG')), flagPoint;
					flagSvg.scale(0.5);

				if (stemDirection === "up") {
					// flagPoint = this.stem.segments[1].point.add(10, 20);
					flagPoint = this.stem.segments[1].point.add(-2, 25);
				} else {
					flagPoint = this.stem.segments[1].point.add(10, -20);
				}
				flagSvg.position = flagPoint;
				
				this.group.addChild(flagSvg);
			}

			return this;
		},

		/*
		 * Draw the duration dots on the note
		 */
		drawDots: function () {
			var dots = this.model.get("dotted");

			if (dots) {
				var distance = this.headSize[0] / 2, // how far away to draw the dot from the head
					point = this.head.segments[2].point,
					dot;

				for (var i = 0; i < dots; i++) {
					point = point.add(distance, 0);
					dot = new paper.Path.Circle(point, 2);
					dot.fillColor = 'black';
					this.group.addChild(dot); // TODO: might need a way to refer to the dots later
				}
			}
		},

		/*
		 * Draw the stacato and legato marks
		 */
		drawStacatoLegato: function () {
			var stacato, legato;

			if (this.model.get("legato")) {
				legato = new paper.Path.Line();
			}

			if (this.model.get("stacato")) {
				stacato = new paper.Path.Circle();
			}
		},

		// FIXME: should be able to draw more than one accidental
		drawAccidental: function () {

			var accidental = this.model.get("pitch").accidental;
			if (accidental === "#") {
				this.drawSharp();
			} else if (accidental === "b") {
				this.drawFlat();
			}

			return this;
		},

		drawSharp: function () {
			var sharpSvg = paper.project.importSVG(document.getElementById('sharpSvg'));
			sharpSvg.scale(0.07);
			sharpSvg.position = this.noteHandles.segments[2].point.add(10, 0);
			this.group.addChild(sharpSvg);
		},

		drawFlat: function () {
			var flatSvg = paper.project.importSVG(document.getElementById('flatSvg'));
			flatSvg.scale(0.05);
			flatSvg.position = this.noteHandles.segments[2].point.add(10, -5);
			this.group.addChild(flatSvg);
		},

		/*
		 * @centerLine {Point} the leftmost point of the center line in the measure.
		 * @lineSpaceing {Integer} distance between lines in a measure.
		 */
		drawLegerLines: function (centerLine, lineSpacing) {
			// should this be drawn on the note or line layer?
			this.activateLayer(this.constants.layers.NOTE);

			// get the distance from the center line.
			var distance = this.noteHandles.segments[2].point.y - centerLine.y;
			var legerLines = [];
			var yPositionFunc = this.getYpositionFunc(distance, centerLine.y, lineSpacing);

			if (Math.abs(distance) >= lineSpacing * 3) {
				for (var i = 0; i <= (Math.abs(distance) - (lineSpacing * 3)) / lineSpacing; i++) {
					var yPos = yPositionFunc(i);
					var point1 = new paper.Point(this.noteHandles.segments[0].point.x - 10, yPos);
					var point2 = new paper.Point(this.noteHandles.segments[2].point.x + 10, yPos);
					legerLines.push(new paper.Path.Line(point1, point2));
				}
			}

			if (legerLines.length) {
				this.group.addChildren(legerLines);
				this.group.strokeColor = 'black';
			}
			return this
		},

		// this method makes the assumption that a note is always being drawn on a line.
		getStemDirection: function (centerLine) {
			// return this.noteHandles.segments[2].point.y <= centerLine.y ? "down" : "up";
			return this.stemDirection || (this.yPos <= 0 ? "down" : "up"); // if stemDirection is already set on the view just return it
		},

		/*
		 * Given a number, returns a function that returns the y position of a leger line
		 * given which leger, the center y position, and the line spacing.
		 */
		getYpositionFunc: function (num, centerY, lineSpacing) {
			if (num >= 0) {
				return function (i) {
					return centerY + (lineSpacing * (3 + i))
				}
			} else {
				return function (i) {
					return centerY - (lineSpacing * (3 + i))
				}
			}
		},

		// FIXME: This method is unused. I don't remember what it was for.
		// updatePosition: function (event) {

		// 	this.circle.position = event.point;
		// },

		getAccidentalWidth: function (acdl) {
			// var acdl = model.get("pitch").accidental;
			var width = 0;
			if (acdl === "#") {
				width = $("#sharpSvg").attr("width") * 0.07;
			} else if (acdl === "b") {
				width = $("#flatSvg").attr("width") * 0.05;
			}

			return width;
		},

		// Probably shouldn't be absolute lengths, but relative to the standard measure layout.
		// This depends on knowledge of the meter and beat groups and whatnot.
		// Might need to specify somehow the beat groups that notes fall into.
		// Should probably be handled by NoteCollection.
		// Should make a NoteCollectionView.
		calculateLength: function (model) {
			var length = 0,
				accidental = model.get("pitch").accidental;

			// Investigate accidentalWidth. Seems like it might be too big compared to headsize.
			var	headWidth = this.headSize[0],
				accidentalWidth = this.getAccidentalWidth(accidental);

			return headWidth + accidentalWidth;
		}
	});
	return NoteView;
});