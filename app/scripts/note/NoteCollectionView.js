define(["base/PaperBaseView",
		// "beat/BeatGroupView",
		"./NoteView"], 
function (PaperBaseView, /*BeatGroupView,*/ NoteView) {

	var NoteCollectionView = PaperBaseView.extend({

		name: "NoteCollectionView",

		initialize: function () {
			console.log("Initializing NoteCollectionView");

			this.meter = this.options.meter;
			this.lineSpacing = this.options.lineSpacing;
			this.clefBase = this.options.clefBase;

			// this.childViews = this.initChildViews(this.collection); // Notes are not yet added at this point

			this.height = this.calculateHeight(this.childViews);

			this.group = new paper.Group();
		},

		initChildViews: function (collection) {
			var noteView, xPos, yPos;
			return collection.map(function (model) {
								
				noteView = new NoteView({el: this.el, 
					model: model, 
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

		drawNotes: function (childViews, centerLine) {
			// Create the barred notes and add x and y position to notes.
			// They are combined here because they can be performed with just one each loop.
			var barredNotes = [],
				innerGroup = [];

			// set the x and y position on each note
			_.each(childViews, function (noteView) {
				this.calculateAndSetXandYPos(noteView);
				innerGroup = this.addToBarredNotes(noteView, innerGroup);
			}, this);

			// push the inner group if any remain
			if (innerGroup.length > 1) barredNotes.push(innerGroup);

			// this needs to be called after the head is drawn
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
			}, this);

			return _.reduce(childViews, function (group, noteView) {

				// noteView.render(centerLine, this.lineSpacing);
				this.drawNote(noteView, centerLine, this.lineSpacing, noteView.xPos, noteView.yPos, noteView.stemDirection);

				group.addChild(noteView.group); // I'm not sure if this is necessary

				return group;
			}, this.group, this);
		},

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
		drawNote: function (note, centerLine, lineSpacing, xPos, yPos, stemDirection) {
			var octaveHeight = lineSpacing ? lineSpacing * 3.5 : this.config.lineSpacing * 3.5,
				stemDirection;

			note.drawHead(centerLine, xPos, yPos);

			if (note.model.get("type") < 1) {
				if (!stemDirection) stemDirection = note.getStemDirection();
			}

			if (stemDirection) {
				note.drawStem(centerLine, octaveHeight, stemDirection);
				note.drawFlag(stemDirection);
			}

			note.drawLegerLines(centerLine, lineSpacing);

			note.drawAccidental();

			note.drawGroupBounds(centerLine, stemDirection);

			return this;
		},

		calculateNoteYpos: function (note, step) {
			var octave = note.get('pitch').octave;
			var degree = note.get('pitch').degree;
			// 4 is the offset of the center line.
			// the clefBase offset it subtracted to normalize to the centerline.
			var diffY = (this.clefBase.degree + (this.clefBase.octave * 7)) - (degree + (octave * 7)) - (4 - this.clefBase.offset);
			return diffY * step;
		},

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
		},

		/*
		 * returns the sum of all durations of notes in a beatGroup.
		 */
		sumBeatGroup: function (group) {
			return _.reduce(group, function (sum, note) {
				return sum + note.get("duration");
			}, 0);
		}
	});
	return NoteCollectionView;
});