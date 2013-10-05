define(["base/PaperBaseView",
		"staff/StavesView",
		"sheet/SheetView"], 
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
			this.staves = this.initStaves(this.model.get("staves"));
			this.pages = this.initPages(this.staves.getTotalPages());
		},

		initStaves: function (staves) {
			var stavesView = new StavesView({el: this.el, collection: staves});
			return stavesView;
		},

		// initializes the number of pages given.
		initPages: function (num) {

		},

		render: function () {
			this.drawTitle(this.model.get("title"));
			this.drawTempoMarking(this.model.get("tempo"));
			this.drawComposer(this.model.get("composer"));
			// this.drawStaves(this.staves);
			this.drawPages(1);
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

		// Currently just renders the staves. not sure if childViews needs to be an array.
		drawStaves: function (childViews) {
			var position = new paper.Point(50, 150); // FIXME: Arbitrary point
			return childViews[0].render(position);
		},

		/*
		 * @param num - The number of pages to draw.
		 */
		drawPages: function (num) {
			// should just make as many sheetViews as necessary and then pass the lines of the
			// sheetViews to the apropriate instruments/staves
			var sheetView = new SheetView({el: this.el});
			var position = new paper.Point(50, 150);
			sheetView.render(position);
		}
	});
	return ScoreView;
});