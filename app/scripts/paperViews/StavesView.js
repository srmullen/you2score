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
		construct: function () {
			console.log("Constructing StavesView");
		},

		drawElement: function () {
			this.collection.each(function (model, i) {
				this.drawStaff(model, i);
			}, this);
		},

		drawStaff: function (model, i) {
			var staff = new StaffView({model: model}).render();
			var staff = new paper.PointText({
				content: model,
				point: new paper.Point([50, 150 + (i * 50)]),
				fontSize: 15,
				fillColor: 'black'
			});
			return staff;
			// return new StaffView({model: model}).render();
		}
	});
	return StavesView;
});