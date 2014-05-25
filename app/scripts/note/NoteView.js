define(["base/PaperBaseView", 
		"./NoteModel",
		"engraver/NoteEngraver",
		"engraver/MeasureEngraver"], 
function (PaperBaseView, NoteModel, NoteEngraver, MeasureEngraver) {

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

		render: function (centerLine, lineSpacing) {
			// xPos and yPos are the center of the font item, not the noteHead. NoteEngraver will take care of handling the offset for now.
			var position = centerLine.add([this.xPos, this.yPos]);

			var noteHead = this.noteHead = NoteEngraver.drawHead(this.model.get("type"), position);

			this.group.addChild(noteHead);

			this.group.addChildren(MeasureEngraver.drawLegerLines(noteHead, centerLine, lineSpacing));
			
			this.group.addChildren(NoteEngraver.drawDots(noteHead, this.model.get("dotted")));
			
			this.group.addChildren(NoteEngraver.drawStacatoLegato(noteHead, this.model));
			
			this.group.addChildren(NoteEngraver.drawAccidental(noteHead, this.model.get("pitch").accidental));
			
			// this.drawGroupBounds(centerLine, stemDirection);

			return noteHead;
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

		// TextItem version
		// drawHead: function (centerLine, xPos, yPos) {
		// 	this.activateLayer(this.constants.layers.NOTE);

		// 	var type = this.model.get("type"), head, noteheadSymbol;

		// 	if (type >= 1) {
		// 		noteheadSymbol = PaperBaseView.constants.font.noteheads.whole;
		// 	} else if (type >= 1/2) {
		// 		noteheadSymbol = PaperBaseView.constants.font.noteheads.hollow;
		// 	} else {
		// 		noteheadSymbol = PaperBaseView.constants.font.noteheads.solid;
		// 	}

		// 	head = new paper.PointText({
		// 		content: noteheadSymbol,
		// 		fontFamily: 'gonville',
		// 		fontSize: 32,
		// 		fillColor: 'black'
		// 	});

		// 	this.head = head;
		// 	this.noteHandles = head;
		// 	this.group.addChild(head);
		// 	this.group.position = centerLine.add([xPos, yPos]);
		// 	head.selected = true;
		// },

		/*
		 * @centerLine - {Point} B line on treble clef, left-most point in the measure.
		 */
		drawStem: function (centerLine, octaveHeight, stemDirection) {
			this.activateLayer(this.constants.layers.NOTE);

			var head = this.noteHead;
			if (stemDirection === "up") {
				// draw stem up
				var rightPoint = this.noteHead.bounds.rightCenter;
				if (Math.abs(rightPoint.y - centerLine.y) < octaveHeight) { // needs to be extracted. drawFlag also need to
																			// know stem direction
					var stem = new paper.Path.Line(rightPoint, rightPoint.subtract([0, octaveHeight])); // draw octave length stem
				} else {
					// draw stem to center line
					var stem = new paper.Path.Line(this.noteHead.bounds.rightCenter, new paper.Point(this.noteHead.bounds.rightCenter.x, centerLine.y));
				}
				
			} else {
				// draw stem down
				// var leftPoint = this.noteHandles.segments[0].point;
				var leftPoint = this.noteHead.bounds.leftCenter;
				if (Math.abs(leftPoint.y - centerLine.y) < octaveHeight) {
					// draw octave length stem
					var stem = new paper.Path.Line(leftPoint, leftPoint.add([0, octaveHeight])); // draw octave length stem
				} else {
					// draw stem to center line
					var stem = new paper.Path.Line(leftPoint, new paper.Point(this.noteHead.bounds.leftCenter.x, centerLine.y));
				}				
			}

			// var circ = new paper.Shape.Circle(leftPoint || rightPoint, 5);
			// circ.strokeColor = 'red';
			// this.group.addChild(circ);

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

		// this method makes the assumption that a note is always being drawn on a line.
		getStemDirection: function (centerLine) {
			// return this.noteHandles.segments[2].point.y <= centerLine.y ? "down" : "up";
			return this.stemDirection || (this.yPos <= 0 ? "down" : "up"); // if stemDirection is already set on the view just return it
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