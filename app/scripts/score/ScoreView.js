define(["base/PaperBaseView", 
		"./ScoreModel",
		"./LineView"], 
function (BaseView, ScoreModel, LineView) {
	"use strict"

	/**
	 * The score is a structure that can be rendered without knowlege of the music that is to be written on it.
	 */
	var Score = BaseView.extend({

		initialize: function () {
			console.log("Initializing Score");

			this.model = this.options.model || new ScoreModel();

			this.group = new paper.Group(); // probably dont need childViews because of this.

			this.lines = this.initLines(this.model.get("numLines"));

			// var position = new paper.Point(50, 150);
			// this.render(position);
		},

		initLines: function (numLines) {
			var lines = [];

			for (var i = 0; i < numLines; i++) {
				lines.push(new LineView({el: this.el}));
			};

			return lines;
		},

		render: function (position) {
			_.each(this.lines, function (line) {
				line.render(position);
			});

			return this;
		}
	});
	return Score;
});