define(["base/PaperBaseView",
		"measure/MeasureCollectionView"], 
function (PaperBaseView, MeasureCollectionView) {
	"use strict";

	var StaffView = PaperBaseView.extend({

		initialize: function () {
			console.log("Constructing StaffView");

			// this.meter = this.options.meter;

			this.childViews = this.initChildViews(this.model.get("systems"));
		},

		initChildViews: function (systems) {
			var measures;
			return _.map(systems, function (measureCollection) {
				measures = new MeasureCollectionView({
					el: this.el, 
					collection: measureCollection,
					meter: this.model.get("meter")
				});
				return measures;
			}, this);
		},

		render: function (position) {
			this.drawInstrument(this.model.get("instrument"));
			this.drawMeter(this.model.get("meter"));
			this.drawSystems(this.childViews, position);
			
			this.height = this.getTotalHeight(this.childViews); // set the height of the staff so staves view can determine where to place other staves
							  // It is set arbitrarily for testing purposes right now.
			return this;
		},

		drawInstrument: function (instrument) {

		},

		drawMeter: function (meter) {

		},

		drawSystems: function (childViews, position) {
			_.each(childViews, function (collectionView, i) {

				// Get the total height of all the views that have been rendered thus far.
				collectionView.render(position.add(0, this.getTotalHeight(childViews.slice(0, i))));
				
			}, this);
		},

		// Unused
		drawMeasureCollection: function (collection) {
			return new MeasureCollectionView({collection: collection}).render();
		},

		// Used in more than one class. Should be moved to a prototype.
		getTotalHeight: function (views) {
			var ans =  _.reduce(views, function (x, y) {
				return x + y.height;
			}, 0);
			return ans;
		}
	});
	return StaffView;
});