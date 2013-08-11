define(["base/PaperBaseView",
	"./MeasureCollectionView"], 
function (PaperBaseView, MeasureCollectionView) {
	"use strict";

	var StaffView = PaperBaseView.extend({

		construct: function () {
			console.log("Constructing StaffView");
		},

		drawElement: function () {
			this.drawInstrument(this.model.get("instrument"));
			this.drawMeter(this.model.get("meter"));
			this.drawSystems(this.model.get("systems"));
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