define(["base/PaperBaseView", 
		"./MeasureModel", 
		"note/NoteCollectionView",
		"note/NoteCollection",
		"note/NoteModel",
		"beat/BeatGroupView",
		"note/NoteView",
		"text!svg/treble.svg"], 
function (PaperBaseView, MeasureModel, NoteCollectionView, NoteCollection, NoteModel, BeatGroupView, NoteView, treble) {

	// A measure should be able to be rendered without affecting structures outside of itself, as long as its width doesn't change.
	var MeasureView = PaperBaseView.extend({

		name: "MeasureView",

		// All number used for drawing should be created during initialization.
		// May want to make them static properties eventually
		initialize: function (options) {

			this.model = this.model || new MeasureModel();
			
			var notes = this.model.get("notes");

			this.meter = this.options.meter || {upper: 4, lower: 4};

			this.lineSpacing = this.config.lineSpacing;

			this.clefBase = this.getClefBase(this.model.get("clef"));

			this.barLength = this.model.get("barLength");

			this.noteCollection = this.initNoteCollectionView(notes);

			this.beatGroups = this.initBeatGroups(notes, this.meter);

			this.activateLayer("measure");
			this.group = new paper.Group();
		},

		// DUPLICATED IN BEATGROUPVIEW
		// this would be a good place to add 'voices'
		initNoteCollectionView: function (notes) {
			var noteCollection = new NoteCollectionView({
				el: this.el,
				context: this.options.context,
				collection: notes, 
				clefBase: this.clefBase,
				lineSpacing: this.lineSpacing,
				meter: this.meter
			});
			return [noteCollection];
		},
		
		// it is unverified that this method works as it should
		initBeatGroups: function (notes, meter) {
			var beatGroups = [];

			// A measure should always have the number of beatgroups specified by it meter
			for (var i = 0, l = meter.upper; i < l; i++) {
				beatGroups.push(new BeatGroupView({
					el: this.el,
					context: this.options.context,
					clefBase: this.clefBase,
					lineSpacing: this.lineSpacing,
					barLength: this.barLength, // barLenth is undefined at this point
					meter: meter
				}));
			};
			
			// clone the notes so they can removed models without affecting this.collection
			// reverse it so it can work with the end instead of the beginning.
			var notesStack = new NoteCollection(notes.toArray().reverse());
			var note;
			_.each(beatGroups, function (beatGroup, i, list) {

				while (!beatGroup.isFull() && notesStack.length) { // keep adding notes until the beatGroup is full

					note = notesStack.pop(); // get the next note to be added.

					if (beatGroup.canAdd(note)) { // if the note  fits in the beatGroup just add it
						beatGroup.addNote(note);
					} else { // the note cant simply be added and needs to be broken up
						var noteDurationOverflow = note.get("duration") - beatGroup.duration;

						// Might want to make spaceNote its own class
						var spacerNote = new NoteModel({type: noteDurationOverflow, spacerNote: true}); 

						// push the spacerNote on the note stack to be dealt with next
						notesStack.push(spacerNote);

						// create a reference to the spacerNote so it can be destroyed if its real note is.
						note.spacerNotes.push(spacerNote);

						// add the note to the beatGroup so it can be rendered and the beatGroup is full
						beatGroup.addNote(note);
					}
				};

			}, this);

			return beatGroups;
		},

		render: function (position) {
			// var clef = this.model.get("clef");
			var centerLine = position.add(0, this.lineSpacing * 2);

			this.drawBars(position, this.barLength);

			this.clefBase = this.getClefBase(position, this.model.get("clef"));
			
			// this.drawMeasure(lines); // can probably be removed.

			// this.drawClef(centerLine, clef);

			this.drawKeySignature();

			this.drawMeter();

			// var notesGroup = this.drawNotes(centerLine, this.beatGroups);
			// var notesGroup = this.drawNotes(centerLine, this.noteCollection); // done with drawBeatGroups now,=

			this.drawBeatGroups(this.beatGroups, centerLine);

			// var notesGroup = this.notesReduce();
			// this.group.addChild(notesGroup);

			this.group.strokeColor = 'black';

			// make enclosing rectangle
			this.drawGroupBounds(position);

			return this; 
		},

		drawBeatGroups: function (beatGroups, centerLine) {
			var xPos;
			_.each(beatGroups, function (beatGroup, i, list) {
				// beatGroup.barLength = this.barLength;
				// beatGroup.measurePadding = this.barLength / 8;

				beatGroup.setBarLength(this.barLength);

				if (i == 0) {
					xPos = 0;
				} else {
					xPos = list[i-1].length;
				};

				centerLine = centerLine.add(xPos, 0);
				beatGroup.render(centerLine);
			}, this);
		},

		drawGroupBounds: function (position) {
			this.options.context.activateLayer("measure");
			var rectangle = new paper.Rectangle(position, position.add(this.barLength, this.lineSpacing * 4));
			rectangle = new paper.Path.Rectangle(rectangle);
			rectangle.fillColor = "white"; // create a fill so the center can be clicked 
			rectangle.opacity = 0.0;
			this.group.insertChild(0, rectangle);
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
		 *	Not Currently used, but may still be useful.
		 *	@return group of notes
		 */
		// drawNotes: function (centerLine, childViews) {
		// 	_.each(childViews, function (view) {
		// 		// These types of properties that are needed before rendering could be in their own rendering models
		// 		view.barLength = this.barLength;
		// 		view.measurePadding = this.barLength / 8;

		// 		view.render(centerLine);
		// 	}, this);
		// },

		drawClef: function (centerLine) {
			var svgItem
			switch (this.model.get("clef")) {
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

		/* NOT CURRENTLY USED
		 * @param notes {NoteCollection} 
		 * @param first {boolean} optional true if the measure is the first on the line
		 *						  so clef and signature can be calculated in.
		 */
		// calculateMeasureLength: function (notes, first) {
		// 	var length = 200; // arbitrary
		// 	if (notes.isEmpty()) return length;

		// 	return length;
		// }

	});
	return MeasureView;
});