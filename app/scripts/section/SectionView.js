define(["base/PaperBaseView"], function (PaperBaseView) {

	var SectionView = PaperBaseView.extend({

		name: "SectionView",

		initialize: function () {
			this.lines = this.options.lines;
		},

		render: function () {

		},

		drawBars: function () {

		},

		addLine: function (line) {
			this.lines.push(line);
		}
	});
	return SectionView;
});