define(["base/PaperBaseView",
	"./MeasureCollectionView"], 
function (PaperBaseView, MeasureCollectionView) {
	"use strict";

	var StaffView = PaperBaseView.extend({

		construct: function () {
			console.log("Constructing StaffView");
		},

		render: function (position) {
			this.drawInstrument(this.model.get("instrument"));
			this.drawMeter(this.model.get("meter"));
			this.drawSystems(this.model.get("systems"));
			var staff = new paper.PointText({
				content: this.model,
				point: position,
				fontSize: 15,
				fillColor: 'black'
			});
			this.height = 50; // set the height of the staff so staves view can determine where to place other staves
							  // It is set arbitrarily for testing purposes right now.
			return this;
		},

		drawInstrument: function (instrument) {

		},

		drawMeter: function (meter) {

		},

		drawSystems: function (systems) {
			_.each(systems, function (collection) {
				this.drawMeasureCollection(collection);
			}, this);
		},

		drawMeasureCollection: function (collection) {
			return new MeasureCollectionView({collection: collection}).render();
		}
	});
	return StaffView;
});