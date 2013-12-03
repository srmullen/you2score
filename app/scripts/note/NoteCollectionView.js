define(["base/PaperBaseView",
		"beat/BeatGroupView",
		"./NoteView"], 
function (PaperBaseView, BeatGroupView, NoteView) {

	var NoteCollectionView = PaperBaseView.extend({

		name: "NoteCollectionView",

		initialize: function () {
			console.log("Initializing NoteCollectionView");

			this.meter = this.options.meter;
			this.lineSpacing = this.options.lineSpacing;
			this.clefBase = this.options.clefBase;

			// measures have BeatGroups, not Note Collections in themselves
			// var beatGroups = this.initBeatGroups(this.meter);
			// this.notesIntoBeatGroups(this.collection, beatGroups); // not sure where this belongs yet.

			this.childViews = this.initChildViews(this.collection);

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

			this.drawNotes(centerLine, this.childViews);

			return this;
		},

		drawNotes: function (centerLine, childViews) {
			return _.reduce(childViews, function (group, noteView) {

				var xPos = this.calculateNoteXpos(noteView.model),
					yPos = this.calculateNoteYpos(noteView.model, this.lineSpacing/2);
				noteView.xPos = xPos;
				noteView.yPos = yPos;

				noteView.render( centerLine, this.lineSpacing);

				group.addChild(noteView.group); // I'm not sure if this is necessary

				return group;
			}, this.group, this);
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

		// BeatGroup should be its own view.
		notesIntoBeatGroups: function (notes, beatGroups) {
			// meters to consider (most common)
			// 2 - 6/4
			// 3/8, 5/8, 6/8, 7/8, 12/8
			// 
			// The user should be able to regroup their notes globally and locally.

			_.each(beatGroups, function (group) {
				// while (!group.is)
			});
		},

		initBeatGroups: function (meter) {
			var beatGroups = []; // an array to hold the beatGroups
			if (meter.lower === 4) { // if the meter is based on quarter notes, the grouping is most likely for each note.
				for (var i = 0, l = meter.upper; i < l; i++) {
					beatGroups.push(new BeatGroupView());
				}
			} // I'll think about eigth note meters later.

			return beatGroups;
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