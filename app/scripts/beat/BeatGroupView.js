define(["base/PaperBaseView"], function (PaperBaseView) {

	/*
	 * Notes should be added to beatGroup one at a time, not when it is initialized.
	 *
	 * Note rendering logic currently in NoteCollectionView should probably be moved here.
	 * 
	 * Transient Class
	 */
	var BeatGroupView = PaperBaseView.extend({

		name: "BeatGroupView",

		construct: function () {
			this.collection = new NoteCollection();
			// The percentage of the measure the beatGroup occupies.
			this.barPercentage = this.options.barPercentage;
			this.duration = 0;
		},

		initChildViews: function () {

		},

		render: function () {

		},

		canAdd: function (note) {
			var remainingDur = barPercentage - duration;
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
		}
	});
	return BeatGroupView;
});