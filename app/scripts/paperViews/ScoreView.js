define(["base/PaperBaseView",
	"./StavesView",
	"./SheetView"], 
function (PaperBaseView, StavesView, SheetView) {
	"use strict";

	/**
	 * width: the width of the score
	 */
	var ScoreView = PaperBaseView.extend({

		initialize: function () {
			console.log("Constructing ScoreView");
			this.sheetWidth = this.options.sheetWidth;
			this.margin = this.options.margin;
		},

		render: function () {
			this.drawTitle(this.model.get("title"));
			this.drawTempoMarking(this.model.get("tempo"));
			this.drawComposer(this.model.get("composer"));
			this.drawStaves(this.model.get("staves"));
			// this.drawPages(1);
			return this;
		},

		drawTitle: function (title) {
			var title = new paper.PointText({
				content: title,
				point: new paper.Point([paper.view.center.x, 50]),
				justification: 'center',
				fontSize: 40,
				fillColor: 'black'
			});
		},

		drawTempoMarking: function (tempo) {
			var tempo = new paper.PointText({
				content: tempo,
				point: new paper.Point([100, 100]),
				justification: 'center',
				fontSize: 15,
				fillColor: 'black'
			});
		},

		drawComposer: function (composer) {
			var composer = new paper.PointText({
				content: composer,
				point: new paper.Point([750, 100]),
				justification: 'center',
				fontSize: 15,
				fillColor: 'black'
			});
		},

		drawStaves: function (staves) {
			var stavesView = new StavesView({el: this.el, collection: staves});
			var position = new paper.Point(50, 150); // FIXME: Arbitrary point
			return stavesView.render(position);
		},

		/*
		 * @param num - The number of pages to draw.
		 */
		drawPages: function (num) {
			var sheetView = new SheetView({el: this.el});
			sheetView.render();
		}
	});
	return ScoreView;
});