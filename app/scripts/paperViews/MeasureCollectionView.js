define(["base/PaperBaseView",
	"./MeasureView"], 
function (PaperBaseView, MeasureView) {
	"use strict";

	var MeasureCollectionView = PaperBaseView.extend({

		construct: function () {
			console.log("constructing MeasureCollectionView");
		},

		drawElement: function () {
			this.drawMeasures(this.collection);
		},

		drawMeasures: function (collection) {
			collection.each(function (model) {
				this.drawMeasure(model);
			}, this);
		},

		drawMeasure: function (model) {
			return new MeasureView({model: model}).render();
		}
	});
	return MeasureCollectionView;
});