define(["base/PaperBaseView", 
	"../models/MeasureModel", 
	"./NoteView",
	"text!svg/treble.svg"], 
function (PaperBaseView, MeasureModel, NoteView, treble) {

	var MeasureView = PaperBaseView.extend({

		// All number used for drawing should be created during initialization.
		// May want to make them static properties eventually
		initialize: function (options) {
			
			var notes = this.model.get("notes");

			// this.clefBase = this.getClefBase(this.model.get("clef"));

			this.childViews = this.initChildViews(notes);

			this.barLength = this.calculateMeasureLength(notes);

			this.lineSpacing = 10;
			// this.measurePadding = this.barLength / 8; // 10 is arbitrary, so notes arent on top of the bars
			this.group = new paper.Group();
		},

		// No NoteCollectionView initialization.
		initChildViews: function (notes) {
			var noteView;
			return notes.map(function (note) {
				noteView = new NoteView({el: this.el, model: note, clefBase: this.clefBase});
				return noteView;
			});
		},

		// initChildViews: function (notes) {
			
		// },	

		render: function (position) {
			this.measurePadding = this.barLength / 8;
			var clef = this.model.get("clef");
			var centerLine = position.add(0, this.lineSpacing * 2);

			this.drawBars(position, this.barLength);

			this.clefBase = this.getClefBase(position, this.model.get("clef"));
			
			// this.drawMeasure(lines);

			// this.drawBar(lines, "both");

			this.drawClef(centerLine, clef);

			this.drawKeySignature();

			var notesGroup = this.drawNotes(centerLine, this.childViews);

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
		drawNotes: function (centerLine, childViews) {

			return _.reduce(childViews, function (group, noteView) {
				
				var xPos = this.calculateNoteXpos(noteView);
				var yPos = this.calculateNoteYpos(noteView, this.lineSpacing/2);

				noteView.render(xPos, yPos, this.clefBase, centerLine, this.lineSpacing);

				group.addChild(noteView.group); // I'm not sure if this is necessary

				return group;
			}, new paper.Group(), this);

		},

		calculateNoteYpos: function (noteView, step) {
			var note = noteView.model;
			var octave = note.get('pitch').octave;
			var degree = note.get('pitch').degree;
			var diffY = (this.clefBase.degree + (this.clefBase.octave * 7)) - (degree + (octave * 7));
			return diffY * step;
		},

		// Could also do this right when a note is placed in a collection
		calculateNoteXpos: function (noteView) {
			var note = noteView.model;
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

		drawClef: function (centerLine, clef) {
			var svgItem
			switch (clef) {
				case "treble":
					svgItem = paper.project.importSVG(document.getElementById('trebleSVG'));
					svgItem.scale(0.05); //FIXME: shouldn't have to scale svg's individually
					break;
				case "bass":
					svgItem = paper.project.importSVG(document.getElementById('bassSVG'));
					svgItem.scale(0.1);
					break;
			}

			// the position should probably be a percentage of the barLength
			// svgItem.position = this.lines[2].firstSegment.point.add([120, 0]);
			svgItem.position = centerLine;
			this.group.addChild(svgItem);

			// Flag indicating that a clef has been drawn on this measure
			// It can be used to determine x-offset for drawing notes.
			this.clefDrawn = true;

			return this;
		},

		drawKeySignature: function () {

		},

		// position is the left-most part of the first line.
		// BaseNotes exists so there any clef can be made.
		getClefBase: function (position, clef) {
			return {
				"treble": {pitch: "C", degree: 0, octave: 5, point: position.add([0, this.lineSpacing/2 * 3])},
				// The bass object isn't correct, just added it for testing purposes
				"bass": {pitch: "F", degree: 3, octave: 3, point: position.add([0, this.lineSpacing/2 * 2])}
			}[clef];
		},

		// This might be useful, to have the point as a function.
		// getClefBase: function (clef) {
		// 	return {
		// 		"treble": {pitch: "C", degree: 0, octave: 5, getPoint: function (position) {
		// 				position.add([0, this.lineSpacing/2 * 3])
		// 			}
		// 		},
		// 		// The bass object isn't correct, just added it for testing purposes
		// 		"bass": {pitch: "F", degree: 3, octave: 3, getPoint: function (position) {
		// 				position.add([0, this.lineSpacing/2 * 2])
		// 			}
		// 		}
		// 	}[clef];
		// },

		/*
		 * @param notes {NoteCollection} 
		 * @param first {boolean} optional true if the measure is the first on the line
		 *						  so clef and signature can be calculated in.
		 */
		calculateMeasureLength: function (notes, first) {
			var length = 200; // arbitrary
			if (notes.isEmpty()) return length;

			return length;
		}

	});
	return MeasureView;
});