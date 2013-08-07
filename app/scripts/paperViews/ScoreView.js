define(["base/PaperBaseView"], function (PaperBaseView) {
	"use strict";

	var ScoreView = PaperBaseView.extend({

		construct: function () {
			console.log("Constructing ScoreView");
		},

		drawElement: function () {
			this.drawTitle();
			this.drawTempoMarking();
			this.drawComposer();
		},

		drawTitle: function () {
			var text = new paper.PointText({
				content: this.model.get("title"),
				point: paper.view.center,
				justification: 'center',
				fontSize: 30,
				fillColor: 'black'
			});
		},

		drawTempoMarking: function () {

		},

		drawComposer: function () {
			var text = new paper.PointText({
				content: this.model.get("composer"),
				point: paper.view.center,
				justification: 'center',
				fontSize: 30,
				fillColor: 'black'
			});
		}
	});
	return ScoreView;
});