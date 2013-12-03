define(["base/PaperBaseView",
		"note/NoteCollection"], 
function (PaperBaseView, NoteCollection) {

	/*
	 * Notes should be added to beatGroup one at a time, not when it is initialized.
	 *
	 * Note rendering logic currently in NoteCollectionView should probably be moved here.
	 * 
	 * Transient Class
	 */
	var BeatGroupView = PaperBaseView.extend({

		name: "BeatGroupView",

		initialize: function () {
			this.collection =  this.collection || new NoteCollection();

			this.duration = this.sumDurations(this.collection);

			// the type of meter it belongs to
			this.meter = this.options.meter || {upper: 4, lower: 4};

			this.maxDuration = 1 / this.meter.lower;

			// The percentage of the measure the beatGroup occupies.
			this.barPercentage = this.options.barPercentage || 1 / this.type;
		},

		render: function () {
			this.drawGroupBounds();
		},

		drawGroupBounds: function () {

		},

		canAdd: function (note) {
			var remainingDur = this.barPercentage - this.duration;
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