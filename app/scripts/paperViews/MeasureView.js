define(["base/PaperBaseView", 
	"../models/MeasureModel", 
	"./NoteView",
	"text!svg/treble.svg"], 
function (PaperBaseView, MeasureModel, NoteView, treble) {

	var MeasureView = PaperBaseView.extend({

		childViews: [],

		// All number used for drawing should be created during initialization.
		// May want to make them static properties eventually
		initialize: function (options) {
			// this.barLength = this.$el.width(); // Moved to SheetView
			//need to get el from somewhere. Not neccisarily the canvas width.
			// this should be controllable on each measure.
			// maybe a default param that can be overridden.ß

			this.lineSpacing = 10;
			// this.measurePadding = this.barLength / 8; // 10 is arbitrary, so notes arent on top of the bars
			this.group = new paper.Group();
		},

		render: function (position, barLength) {
			this.barLength = barLength; // FIXME: These should not be set as global properties.
			this.measurePadding = this.barLength / 8;
			
			this.drawBars(position, barLength);

			this.clefBase = this.getClefBase(position, this.model.get("clef"));
			
			// this.drawMeasure(lines);

			// this.drawBar(lines, "both");

			// this.drawClef(position);

			var notesGroup = this.drawNotes(position);

			// var notesGroup = this.notesReduce();
			// this.group.addChild(notesGroup);

			this.group.strokeColor = 'black';


			// All methods beginning with draw should return themselves to facilitate chaining
			return this; 
		},

		drawBars: function (position, width) {
			var line1 = new paper.Path.Line(position, position.add(0, this.lineSpacing * 4));
			// var line2 = new paper.Path.Line(position.add(width, 0), position.add(width, this.lineSpacing * 4));
			this.group.addChild(line1);
			// this.group.addChild(line2);
		},

		/*
		 * Adds a note to the NoteCollection of the MeasureModel.
		 */
		addNote: function (note) {
			this.model.addNote(note);
		},

		/**
		 *	Iterates over the NoteCollection and draws the notes.
		 *	@return group of notes
		 */
		drawNotes: function (position) {
			var centerLine = position.add(0, this.lineSpacing * 2);

			return this.model.get("notes").reduce(function (group, note) {
				var noteView = new NoteView({el: this.el, model: note})

				var xPos = this.calculateNoteXpos(note);
				var yPos = this.calculateNoteYpos(note, this.lineSpacing/2);

				noteView.drawHead(this.clefBase, xPos, yPos)
						.drawStem(centerLine, this.lineSpacing/2 * 7)
						.drawFlag()
						.drawLegerLines(centerLine, this.lineSpacing);

				group.addChild(noteView.group);

				return group;
			}, new paper.Group(), this);

		},

		calculateNoteYpos: function (note, step) {
			var octave = note.get('pitch').octave;
			var degree = note.get('pitch').degree;
			var diffY = (this.clefBase.degree + (this.clefBase.octave * 7)) - (degree + (octave * 7));
			return diffY * step;
		},

		// Could also do this right when a note is placed in a collection
		calculateNoteXpos: function (note) {
			// Get the position of the note in the NoteCollection
			var noteIndex = this.model.get("notes").indexOf(note),
				xPos = 0;

			// the sum of the durations of the notes previous to noteIndex indicate where
			// the note should be placed
			for (var i = 0; i < noteIndex; i++) {
				xPos += this.model.get("notes").at(i).get("duration");
			}

			// xPos *= (this.barLength - this.measurePadding);
			xPos *= this.barLength;
			xPos += (this.measurePadding / 2); // divide by 2 to account for padding on each side

			return xPos; // cause not implemented yet
		},

		drawMeasure: function (lines) {

			this.group.addChildren(lines);

			return this;
		},

		drawClef: function (position) {
			$('#svgContainer').append(treble); // put the svg in the dom
			var svgItem = paper.project.importSVG(document.getElementById('trebleSVG'));
			svgItem.scale(0.05);

			// the position should probably be a percentage of the barLength
			// svgItem.position = this.lines[2].firstSegment.point.add([120, 0]);
			svgItem.position = position;
			this.group.addChild(svgItem);

			// Flag indicating that a clef has been drawn on this measure
			// It can be used to determine x-offset for drawing notes.
			this.clefDrawn = true;

			return this;
		},

		// I dont think this is needed.
		// drawBar: function (lines, side) {
		// 	var leftBar, rightBar, topPoint, bottomPoint;
			
		// 	if (side === "left") {

		// 		topPoint = lines[0].firstSegment.point;
		// 		bottomPoint = lines[4].firstSegment.point;
		// 		leftBar = new paper.Path.Line(topPoint, bottomPoint);
		// 		this.group.addChild(leftBar);

		// 	} else if (side === "right") {

		// 		topPoint = lines[0].lastSegment.point;
		// 		bottomPoint = lines[4].lastSegment.point;
		// 		rightBar = new paper.Path.Line(topPoint, bottomPoint);
		// 		this.group.addChild(rightBar);
				
		// 	} else if (side === "both") {

		// 		topPoint = lines[0].firstSegment.point;
		// 		bottomPoint = lines[4].firstSegment.point;
		// 		leftBar = new paper.Path.Line(topPoint, bottomPoint);

		// 		topPoint = lines[0].lastSegment.point;
		// 		bottomPoint = lines[4].lastSegment.point;
		// 		rightBar = new paper.Path.Line(topPoint, bottomPoint);
		// 		this.group.addChildren([leftBar, rightBar]);
		// 	}

		// 	return this;
		// },

		// position is the left-most part of the first line.
		// BaseNotes exists so there any clef can be made.
		getClefBase: function (position, clef) {
			return {
				"treble": {pitch: "C", degree: 0, octave: 5, point: position.add([0, this.lineSpacing/2 * 3])},
				// The bass object isn't correct, just added it for testing purposes
				"bass": {pitch: "F", degree: 3, octave: 3, point: position.add([0, this.lineSpacing/2 * 2])}
			}[clef];
		}

	});
	return MeasureView;
});