define(["base/PaperBaseView",
		"note/NoteCollectionView",
		"note/NoteCollection"], 
function (PaperBaseView, NoteCollectionView, NoteCollection) {

	/*
	 * Notes should be added to beatGroup one at a time, not when it is initialized.
	 *
	 * Note rendering logic currently in NoteCollectionView should probably be moved here.
	 * 
	 * Transient Class
	 */
	var BeatGroupView = PaperBaseView.extend({

		name: "BeatGroupView",

		initialize: function (options) {
			this.collection =  this.collection || new NoteCollection();

			this.duration = this.sumDurations(this.collection);

			// the type of meter it belongs to
			this.meter = this.options.meter || {upper: 4, lower: 4};

			this.maxDuration = 1 / this.meter.lower;

			// The percentage of the measure the beatGroup occupies.
			this.barPercentage = this.options.barPercentage || this.maxDuration;
			this.barLength = this.options.barLength;

			this.notes = this.initNoteCollectionView(this.collection);
		},

		setBarLength: function (length) {
			this.barLength = length;
			this.length = this.calculateLength();
		},

		calculateLength: function () {
			return this.barPercentage * this.barLength;
		},

		// DUPLICATED IN MEASUREVIEW
		// this would be a good place to add 'voices'
		initNoteCollectionView: function (notes) {
			var noteCollection = new NoteCollectionView({
				el: this.el, 
				collection: notes, 
				clefBase: this.options.clefBase,
				lineSpacing: this.options.lineSpacing,
				meter: this.meter
			});
			return noteCollection;
		},

		render: function (centerLine) {
			// var barredNotes = this.linkBarredNotes(this.notes);

			// var stemDirection = this.calculateNoteGroupStemDirection(barredNotes);

			this.drawGroupBounds();

			this.drawNotes(this.notes, centerLine);
		},

		/*
		 * Returns an array of arrays. Inner arrays contain notes that are barred together.
		 * From these grouping the stem direction can also be determined.
		 */
		// linkBarredNotes:function (notes) {
		// 	var barredNotes = [],
		// 		innerGroup = [];

		// 	_.each(notes, function (note, i, list) {
		// 		if (note.model.get("type") <= 1/8) { // note needs to be grouped if it has a flag
		// 			innerGroup.push(note);
		// 		} else { // the note doesn't have a flag so the groups are separated.
		// 			if (innerGroup.length > 1) barredNotes.push(innerGroup); // only add the group if there is more than one note in it
		// 			innerGroup = [];
		// 		}
		// 	});

		// 	// push the inner group if any remain
		// 	if (innerGroup.length) barredNotes.push(innerGroup);

		// 	return barredNotes;
		// },

		calculateNoteGroupStemDirection: function (notes) {

		},

		// I'm not sure if beatGroups needs bounds
		drawGroupBounds: function () {

		},

		drawNotes: function (notes, centerLine, barredNotes) {
			// These types of properties that are needed before rendering could be in their own rendering models
			notes.barLength = this.barLength;
			notes.measurePadding = this.barLength / 8;

			notes.render(centerLine);
		},

		canAdd: function (note) {
			// var remainingDur = this.barPercentage - this.duration;
			var remainingDur = this.maxDuration - this.duration;
			if (note.get("duration") <= remainingDur) return true;

			// else
			return false;
		},

		addNote: function (note) {
			this.collection.add(note);
			this.duration += note.get("duration");
		},

		removeNote: function (note) {
			this.collection.remove(note);
			this.duration -= note.get("duration");
		},

		sumDurations: function (notes) {
			return notes.reduce(function (sum, note) {
				return sum + note.get("duration");
			}, 0)
		},

		isEmpty: function () {
			return !!this.collection.length;
		},

		isFull: function () {
			return (this.duration >= this.maxDuration);
		}
	});
	return BeatGroupView;
});