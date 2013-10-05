define(["base/PaperBaseView"],
function (PaperBaseView) {
	"use strict";

	var LineView = PaperBaseView.extend({

		initialize: function () {
			this.group = new paper.Group(); // probably dont need childViews because of this.
		},

		// Creates lines the length of the page.
		createLines: function (position, barLength, lineSpacing) {
			var line,
				leftPoint,
				rightPoint,
				lineArray = [];
			for (var i = 0; i < 5; i++) {
				leftPoint = position.add(0, i * lineSpacing);
				rightPoint = position.add(barLength, i * lineSpacing);
				line = new paper.Path.Line(leftPoint, rightPoint);
				lineArray.push(line);
			}

			return lineArray;
		},

		render: function (position) {
			var barLength = this.$el.width() * 0.9; // here it is the length of the page.
			var lineSpacing = 10;
			var lines = this.createLines(position, barLength, lineSpacing);

			this.drawLines(lines);

			return this;
		},

		drawLines: function (lines) {

			this.group.addChildren(lines);

			this.group.strokeColor = 'black';

			return this;
		}
	});
	return LineView;
});