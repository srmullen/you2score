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

			// overflow is the amount a not in the previous beatgroup flowed into this beatgroup
			// this.overflow = this.options.overflow || 0;

			this.duration = this.sumDurations(this.collection);

			// the type of meter it belongs to
			this.meter = this.options.meter || {upper: 4, lower: 4};

			this.maxDuration = 1 / this.meter.lower;

			// The percentage of the measure the beatGroup occupies.
			this.barPercentage = this.options.barPercentage || this.maxDuration;
			this.barLength = this.options.barLength;

			this.notes = this.initNoteCollectionView(this.collection);
		},

		/*
		 * Set the overflow and recalculates the duration
		 */
		// setOverflow: function (overflow) {
		// 	this.overflow = overflow;
		// 	this.duration = this.sumDurations(this.collection) + this.overflow;;
		// },

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
				context: this.options.context,
				collection: notes, 
				clefBase: this.options.clefBase,
				lineSpacing: this.options.lineSpacing,
				meter: this.meter
			});
			return noteCollection;
		},

		render: function (centerLine) {
			this.drawGroupBounds();

			this.drawNotes(this.notes, centerLine);
		},

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