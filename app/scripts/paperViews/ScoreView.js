define(["base/PaperBaseView",
	"./StavesView"], 
function (PaperBaseView, StavesView) {
	"use strict";

	/**
	 * width: the width of the score
	 */
	var ScoreView = PaperBaseView.extend({

		construct: function () {
			console.log("Constructing ScoreView");
			this.width = this.options.width;
		},

		render: function () {
			this.drawTitle(this.model.get("title"));
			this.drawTempoMarking(this.model.get("tempo"));
			this.drawComposer(this.model.get("composer"));
			this.drawStaves(this.model.get("staves"));
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
			// var staves = new paper.PointText({
			// 	content: staves.length,
			// 	point: new paper.Point([50, 150]),
			// 	fontSize: 15,
			// 	fillColor: 'black'
			// });
			
			var stavesView = new StavesView({collection: staves});
			var position = new paper.Point(50, 150);
			return stavesView.render(position);
		}
	});
	return ScoreView;
});