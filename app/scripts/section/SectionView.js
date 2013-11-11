define(["base/PaperBaseView"], function (PaperBaseView) {

	var SectionView = PaperBaseView.extend({

		name: "SectionView",

		initialize: function () {
			this.lines = this.options.lines;

			this.group = new paper.Group();
		},

		render: function () {
			this.drawBars();

			// this.drawClefs();

			this.drawKeySignatures();

			// what else does section view do?

		},

		drawBars: function () {
			var topPoint = this.lines[0].group.children[0].segments[1].point,
				bottomPoint = this.lines[this.lines.length - 1].group.children[0].segments[0].point;

			var bar = new paper.Path.Line(topPoint, bottomPoint);

			this.group.addChild(bar);
			this.group.strokeColor = 'black';
			this.group.strokeWidth = 2;
		},

		// Draws the clef of the first measure in each line.
		drawClefs: function () {
			_.each(this.lines, function (line) {
				// not all lines will have measures
				if (line.measures.length) {
					var centerLine = line.group.children[3].segments[0].point; // get the leftmost point of the centerline
					line.measures[0].drawClef(centerLine);
				}
			}, this);
		},

		drawKeySignatures: function () {

		},

		addLine: function (line) {
			this.lines.push(line);
		}
	});
	return SectionView;
});