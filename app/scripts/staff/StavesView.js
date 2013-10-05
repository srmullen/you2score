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

		initialize: function () {
			console.log("Constructing StavesView");
			this.childViews = this.initChildViews(this.collection);
		},

		initChildViews: function (staffCollection) {
			var staffView;
			return staffCollection.map(function (staffModel) {
				staffView = new StaffView({
					el: this.el, 
					model: staffModel
				});
				return staffView;
			}, this);
		},

		// returns the number of pages needed to render all the staves.
		getTotalPages: function () {
			
		},

		render: function (position) {
			this.drawStaves(this.childViews, position);
			return this;
		},

		drawStaves: function (childViews, position) {
			var previousHeight;
			_.each(childViews, function (view, i, list) {

				previousHeight = i ? list[i-1].height : i;
				position = position.add(0, previousHeight);
				view.render(position);
			});
		},

		// Method to get the total height of all the views in childViews.
		// Seems a little too complex.
		// This function could be memoized for performance gains.
		getTotalHeight: function (views) {
			var ans =  _.reduce(views, function (x, y) {
				return x + y.height;
			}, 0);
			return ans;
		}
	});
	return StavesView;
});