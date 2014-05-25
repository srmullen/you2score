define(["base/PaperBaseView",
		"./NoteView"], 
function (PaperBaseView, NoteView) {

	var NoteCollectionView = PaperBaseView.extend({

		name: "NoteCollectionView",

		initialize: function () {
			console.log("Initializing NoteCollectionView");

			this.meter = this.options.meter;
			this.lineSpacing = this.options.lineSpacing;
			this.clefBase = this.options.clefBase;

			this.height = this.calculateHeight(this.childViews);

			this.group = new paper.Group();
		},

		initChildViews: function (collection) {
			var noteView, viewModels;

			// spacerNotes don't need views, so remove them
			viewModels = collection.reject(function (model) {
				return model.get("spacerNote");
			});

			return _.map(viewModels, function (model) {
								
				noteView = new NoteView({el: this.el, 
					model: model,
					context: this.options.context,
					clefBase: this.clefBase
				});

				return noteView;
			}, this);
		},

		// unimplemented
		calculateHeight: function (childViews) {

		},

		render: function (centerLine, barLength) {
			this.childViews = this.initChildViews(this.collection);

			this.drawNotes(this.childViews, centerLine);

			return this;
		},

		// FIXME: this method is a mess
		drawNotes: function (notesToDraw, centerLine) {
			var octaveHeight = this.lineSpacing ? this.lineSpacing * 3.5 : this.config.lineSpacing * 3.5,
				stemDirection, barredNotes, notesToDraw;

			barredNotes = this.groupBarredNotes(notesToDraw);

			// draw the head of each note (removed from the drawNote method)
			// I dont think the note head changes regarless of any other characteristics of the note.
			// It can be drawn separate from any groups it belongs to.
			// Dots, accidentals, and ledger lines can probably be drawn here as well.
			_.each(notesToDraw, function (noteView) {
	
				this.calculateAndSetXandYPos(noteView);
	
				noteView.render(centerLine, this.lineSpacing);
	
			}, this);

			// set the stemDirection on the barredNotes
			_.each(barredNotes, function (noteArr) {
				var greatestDistance = 0,
					greatestNote, // keep track of the note that is the greatest distance from the centerLine
					currentNoteDistance;

				_.each(noteArr, function (note) {
					currentNoteDistance = Math.abs(note.yPos);
					if (currentNoteDistance > greatestDistance) {
						greatestDistance = currentNoteDistance;
						greatestNote = note;
					}
				}, this);

				var stemDirection = greatestNote.getStemDirection();

				_.each(noteArr, function (note) {
					note.stemDirection = stemDirection;
				}, this);

				this.drawBarredStems(noteArr, stemDirection, centerLine, octaveHeight);

			}, this);

			// draw everything else and add it to the group
			_.reduce(notesToDraw, function (group, noteView) {

				this.drawNote(noteView, centerLine, this.lineSpacing, noteView.xPos, noteView.yPos, noteView.stemDirection, octaveHeight);

				group.addChild(noteView.group); // I'm not sure if this is necessary

				return group;
			}, this.group, this);
		},

		drawBarredStems: function (noteArr, stemDirection, centerLine, octaveHeight) {
			var note1 = noteArr[0],
				note2 = noteArr[noteArr.length-1]

			// Draw the stem on the first and last note in the barred group
			note1.drawStem(centerLine, octaveHeight, stemDirection);
			note2.drawStem(centerLine, octaveHeight, stemDirection);

			// draw the bar between the outer stems
			var bar = new paper.Path.Line(note1.stem.segments[1].point, note2.stem.segments[1].point)
			bar.strokeColor = "black"; // bar will need to be tracked by all notes that are connected to it
			bar.strokeWidth = 4;

			// TODO: The bar needs to be added to at least one group, probably to all the groups of the notes that touch it.
			// 		 Does paper allow something to belong to more than one group?
		},

		/*
		 * Groups notes that are connected by a flag/bar
		 */
		groupBarredNotes: function (notes) {
			// Create the barred notes and add x and y position to notes.
			// They are combined here because they can be performed with just one each loop.
			var barredNotes = [],
				innerGroup = [];

			// set the x and y position on each note
			_.each(notes, function (noteView) {
				innerGroup = this.addToBarredNotes(noteView, innerGroup);
			}, this);

			// push the inner group if any remain
			if (innerGroup.length > 1) barredNotes.push(innerGroup);

			return barredNotes;
		},

		// drawStemAndFlag: function (note, stemDirection, centerLine, octaveHeight) {
		// 	if (note.model.get("type") < 1) {
		// 		if (!stemDirection) stemDirection = note.getStemDirection();
		// 	}

		// 	if (stemDirection) {
		// 		note.drawStem(centerLine, octaveHeight, stemDirection);
		// 		note.drawFlag(stemDirection);
		// 	}
		// },

		calculateAndSetXandYPos: function (note) {
			var xPos = this.calculateNoteXpos(note.model),
				yPos = this.calculateNoteYpos(note.model, this.lineSpacing/2);
			note.xPos = xPos;
			note.yPos = yPos;
		},

		addToBarredNotes: function (note, innerGroup) {
			if (note.model.get("type") <= 1/8) { // note needs to be grouped if it has a flag
				innerGroup.push(note);
			} else { // the note doesn't have a flag so the groups are separated.
				if (innerGroup.length > 1) barredNotes.push(innerGroup); // only add the group if there is more than one note in it
				innerGroup = [];
			}
			return innerGroup;
		},

		// Similar to NoteView.render
		drawNote: function (note, centerLine, lineSpacing, xPos, yPos, stemDirection, octaveHeight) {
			// var octaveHeight = lineSpacing ? lineSpacing * 3.5 : this.config.lineSpacing * 3.5,
			// 	stemDirection;

			if (note.model.get("type") < 1) {
				if (!stemDirection) stemDirection = note.getStemDirection();
			}

			if (stemDirection) {
				if (!note.stem) { // check that the stem hasn't already been drawn in a barred group.
					note.drawStem(centerLine, octaveHeight, stemDirection);
					note.drawFlag(stemDirection);
				}
			}

			// note.drawLegerLines(centerLine, lineSpacing);

			// note.drawAccidental();

			// note.drawGroupBounds(centerLine, stemDirection);

			return this;
		},

		/*
		 * Returns the y position of the center of the note head
		 */
		calculateNoteYpos: function (note, step) {
			var octave = note.get('pitch').octave;
			var degree = note.get('pitch').degree;
			// 4 is the offset of the center line.
			// the clefBase offset it subtracted to normalize to the centerline.
			var diffY = (this.clefBase.degree + (this.clefBase.octave * 7)) - (degree + (octave * 7)) - (4 - this.clefBase.offset);
			return diffY * step;
		},

		/*
		 * Returns the x position of the center of the note head
		 */
		calculateNoteXpos: function (note) {
			// Get the position of the note in the NoteCollection
			var noteIndex = this.collection.indexOf(note),
				xPos = 0;

			// the sum of the durations of the notes previous to noteIndex indicate where
			// the note should be placed
			for (var i = 0; i < noteIndex; i++) {
				xPos += this.collection.at(i).get("duration");
			}

			xPos *= this.barLength;
			xPos += (this.measurePadding / 2); // divide by 2 to account for padding on each side

			return xPos;
		}

		/*
		 * returns the sum of all durations of notes in a beatGroup.
		 */
		// sumBeatGroup: function (group) {
		// 	return _.reduce(group, function (sum, note) {
		// 		return sum + note.get("duration");
		// 	}, 0);
		// }
	});
	return NoteCollectionView;
});