define(["base/PaperBaseView", 
	"models/MeasureModel", 
	"views/NoteView",
	"text!svg/treble.svg"], 
function (PaperBaseView, MeasureModel, NoteView, treble) {

	var MeasureView = PaperBaseView.extend({

		// All number used for drawing should be created during initialization.
		// May want to make them static properties eventually
		initialize: function (options) {
			this.barLength = 2000;
			this.lineSpacing = 80;
			this.lines = this.createLines(this.barLength, this.lineSpacing);
			this.group = new paper.Group();
			this.clefBase = this.getClefBase(this.model.get("clef"));
		},

		createLines: function (barLength, lineSpacing) {
			var line,
				lineArray = [];
			for (var i = 0; i < 5; i++) {
				line = new paper.Path.Line(new paper.Point(0, i * lineSpacing), new paper.Point(barLength, i * lineSpacing));
				lineArray.push(line);
			}

			return lineArray;
		},

		drawElement: function () {
			
			this.drawMeasure(this.lines);

			this.drawBar("both");

			this.drawClef();

			this.drawNotes(); // just concentrate on the clef for now;

			// scaling a group also scales its children.
			// elements not added to the group will not be scaled.
			this.group.scale(0.25); 
			this.group.strokeColor = 'black';
			this.group.position = new paper.Point(400, 130); // This should probably be up to parent view

			// All methods beginning with draw should return themselves to facilitate chaining
			return this; 
		},

		/*
		 * Adds a note to the NoteCollection of the MeasureModel.
		 */
		addNote: function (note) {
			this.model.addNote(note);
		},

		/**
		 *	Iterates over the NoteCollection and draws the notes.
		 */
		drawNotes: function () {
			// Get the notes from the model and draw them
			var that = this;
			// Iterate over notes in the NoteCollection and create a View for them
			this.model.get('notes').each(function (note) { 
				var noteView = new NoteView({model: note}); // maybe a PaperView doesn't need and el?
															// probably won't hurt to give it the canvas though
				
				xPos = that.calculateNoteXpos(note);
				yPos = that.calculateNoteYpos(note, that.lineSpacing/2);
				
				noteView.drawElement(that.clefBase, xPos, yPos);

				that.group.addChild(noteView.group);
			});

			return this;
		},

		calculateNoteYpos: function (note, step) {
			var octave = note.get('pitch').octave;
			var degree = note.get('pitch').degree;
			diffY = (this.clefBase.degree + (this.clefBase.octave * 7)) - (degree + (octave * 7));
			return diffY * step;
		},

		calculateNoteXpos: function (note) {
			return 0; // cause not implemented yet
		},

		drawMeasure: function (lineArray) {

			this.group.addChildren(this.lines);

			return this;
		},

		drawClef: function () {
			$('#svgContainer').append(treble); // put the svg in the dom
			var svgItem = paper.project.importSVG(document.getElementById('trebleSVG'));
			svgItem.scale(0.45);

			// the position should probably be a percentage of the barLength
			svgItem.position = this.lines[2].firstSegment.point.add([120, 0]);
			this.group.addChild(svgItem);

			// Flag indicating that a clef has been drawn on this measure
			// It can be used to determine x-offset for drawing notes.
			this.clefDrawn = true;

			return this;
		},

		drawBar: function (side) {
			var leftBar, rightBar, topPoint, bottomPoint;
			
			if (side === "left") {

				topPoint = this.lines[0].firstSegment.point;
				bottomPoint = this.lines[4].firstSegment.point;
				leftBar = new paper.Path.Line(topPoint, bottomPoint);
				this.group.addChild(leftBar);

			} else if (side === "right") {

				topPoint = this.lines[0].lastSegment.point;
				bottomPoint = this.lines[4].lastSegment.point;
				rightBar = new paper.Path.Line(topPoint, bottomPoint);
				this.group.addChild(rightBar);
				
			} else if (side === "both") {

				topPoint = this.lines[0].firstSegment.point;
				bottomPoint = this.lines[4].firstSegment.point;
				leftBar = new paper.Path.Line(topPoint, bottomPoint);

				topPoint = this.lines[0].lastSegment.point;
				bottomPoint = this.lines[4].lastSegment.point;
				rightBar = new paper.Path.Line(topPoint, bottomPoint);
				this.group.addChildren([leftBar, rightBar]);
			}

			return this;
		},

		getClefBase: function (clef) {
			return {
				"treble": {pitch: "C", degree: 0, octave: 5, point: this.lines[1].firstSegment.point.add([0, 40])}
			}[clef];
		}

	});
	return MeasureView;
});