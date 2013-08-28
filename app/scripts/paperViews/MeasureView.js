define(["base/PaperBaseView", 
	"../models/MeasureModel", 
	"./NoteCollectionView",
	"./NoteView",
	"text!svg/treble.svg"], 
function (PaperBaseView, MeasureModel, NoteCollectionView, NoteView, treble) {

	var MeasureView = PaperBaseView.extend({

		// All number used for drawing should be created during initialization.
		// May want to make them static properties eventually
		initialize: function (options) {
			
			var notes = this.model.get("notes");

			this.meter = this.options.meter;

			this.lineSpacing = 10;

			this.clefBase = this.getClefBase(this.model.get("clef"));

			this.barLength = this.calculateMeasureLength(notes);
			this.measurePadding = this.barLength / 8;

			this.childViews = this.initChildViews(notes);

			this.group = new paper.Group();
		},

		// this would be a good place to add 'voices'
		initChildViews: function (notes) {
			var noteCollection = new NoteCollectionView({
				el: this.el, 
				collection: notes, 
				clefBase: this.clefBase,
				lineSpacing: this.lineSpacing,
				barLength: this.barLength,
				meter: this.meter
			});
			return [noteCollection];
		},	

		render: function (position) {
			var clef = this.model.get("clef");
			var centerLine = position.add(0, this.lineSpacing * 2);

			this.drawBars(position, this.barLength);

			this.clefBase = this.getClefBase(position, this.model.get("clef"));
			
			// this.drawMeasure(lines); // can probably be removed.

			// this.drawBar(lines, "both");

			this.drawClef(centerLine, clef);

			this.drawKeySignature();

			this.drawMeter();

			var notesGroup = this.drawNotes(centerLine, this.childViews);

			// var notesGroup = this.notesReduce();
			// this.group.addChild(notesGroup);

			this.group.strokeColor = 'black';

			return this; 
		},

		drawBars: function (position, width) {
			// draw bar to the left
			// var line1 = new paper.Path.Line(position, position.add(0, this.lineSpacing * 4));
			// this.group.addChild(line1);

			//draw bar to the right
			var line2 = new paper.Path.Line(position.add(width, 0), position.add(width, this.lineSpacing * 4));
			this.group.addChild(line2);
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
			_.each(childViews, function (view) {
				view.render(centerLine);
			});
		},

		// // Lines are already drawn now. Can probably be removed.
		// drawMeasure: function (lines) {
		// 	this.group.addChildren(lines);
		// 	return this;
		// },

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

		drawMeter: function () {

		},

		/*
		 * offset is the number of steps from the top line.
		 */
		getClefBase: function (clef) {
			return { 
				"treble": {pitch: "C", degree: 0, octave: 5, offset: 3},
				"bass": {pitch: "F", degree: 3, octave: 3, offset: 2}
			}[clef];
		},

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