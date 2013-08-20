define(["base/PaperBaseView",
	"./MeasureCollectionView"], 
function (PaperBaseView, MeasureCollectionView) {
	"use strict";

	var StaffView = PaperBaseView.extend({

		initialize: function () {
			console.log("Constructing StaffView");
			this.childViews = [];
		},

		render: function (position) {
			this.drawInstrument(this.model.get("instrument"));
			this.drawMeter(this.model.get("meter"));
			this.drawSystems(this.model.get("systems"), position);
			// var staff = new paper.PointText({
			// 	content: "StaffView",
			// 	point: position,
			// 	fontSize: 15,
			// 	fillColor: 'black'
			// });
			this.height = this.getTotalHeight(this.childViews); // set the height of the staff so staves view can determine where to place other staves
							  // It is set arbitrarily for testing purposes right now.
			return this;
		},

		drawInstrument: function (instrument) {

		},

		drawMeter: function (meter) {

		},

		drawSystems: function (systems, position) {
			_.each(systems, function (collection, i) {
				var measures = new MeasureCollectionView({el: this.el, collection: collection});
				measures.render(position.add(0, this.getTotalHeight(this.childViews)));
				this.childViews.push(measures); // FIXME?: adding to child views has to come after render because
												// render sets the height which is needed for getTotalHeight()
			}, this);
		},

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