define(["base/PaperBaseView"], function (PaperBaseView) {

	var SectionView = PaperBaseView.extend({

		name: "SectionView",

		initialize: function () {
			this.lines = this.options.lines;

			this.group = new paper.Group();
		},

		render: function () {
			this.drawBars();

			// what else does section view do?
		},

		drawBars: function () {
			// var section;
			// for (var i = 0, l = sections[0].length; i < l; i++) {
			// 	section = this.getSection(sections, i);

			// 	// get the first and last line in the section
			// 	var topLine = section[0],
			// 		bottomLine = section[section.length -1];


			// 	// get length of the section

			// 	//get number of measuresAllotted in the section

			var topPoint = this.lines[0].group.children[0].segments[1].point,
				bottomPoint = this.lines[this.lines.length - 1].group.children[0].segments[0].point;

			var bar = new paper.Path.Line(topPoint, bottomPoint);

			this.group.addChild(bar);
			this.group.strokeColor = 'black';
			this.group.strokeWidth = 2;
		},

		addLine: function (line) {
			this.lines.push(line);
		}
	});
	return SectionView;
});