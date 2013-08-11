define(["base/PaperBaseView",
	"./StaffView"], 
function (PaperBaseView, StaffView) {
	"use strict";

	/**
	 * StavesView is responsible for placing the staves relative to each other.
	 *
	 * position: Where to begin drawing the staves.
	 */
	var StavesView = PaperBaseView.extend({

		childViews: [],

		construct: function () {
			console.log("Constructing StavesView");
		},

		render: function (position) {
			this.collection.map(function (model, i, list) {
				var staff = this.drawStaff(model, position.add(0, this.getTotalHeight()));
				this.childViews.push(staff); // add the view to childViews and then return it.
				return staff; // return value isn't being used right now
			}, this);
			return this;
		},

		drawStaff: function (model, position) {
			var staff = new StaffView({model: model}).render(position);
			return staff;
		},

		// Method to get the total height of all the views in childViews.
		// Seems a little too complex.
		// This function could be memoized for performance gains.
		getTotalHeight: function () {
			var ans =  _.reduce(this.childViews, function (x, y) {
				return x + y.height;
			}, 0);
			return ans;
		}
	});
	return StavesView;
});