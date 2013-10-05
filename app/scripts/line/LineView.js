define(["base/PaperBaseView",
		"./LineModel"],
function (PaperBaseView, LineModel) {
	"use strict";

	var LineView = PaperBaseView.extend({

		initialize: function () {
			console.log("Initializing LineView");

			this.model = this.model || new LineModel();
			
		},

		addMeasures: function (measures) {
			this.measures.add(measures);
		},

		render: function (yPosition) {
			console.log("Rendering lineView");
			var width = this.model.get("width") * this.$el.width();
			this.group = this.createLine(width, this.model.get("spacing"));

			this.group.position.y = yPosition;

			// this.drawLine(this.group, yPosition);
		},

		createLine: function (width, spacing) {
			var line,
				lineArray = [];
			for (var i = 0; i < 5; i++) {
				line = new paper.Path.Line(new paper.Point(0, i * spacing), new paper.Point(width, i * spacing));
				lineArray.push(line);
			}

			var rectangle = new paper.Rectangle(lineArray[0].firstSegment.point, lineArray[4].lastSegment.point);			
			rectangle = new paper.Path.Rectangle(rectangle);
			rectangle.fillColor = "white"; // create a fill so the center can be clicked 
			rectangle.opacity = 0.0; // make the rectangle invisible
			var stave = new paper.Group(lineArray);
			stave.insertChild(0, rectangle);

			return stave;
		},

		// drawLine: function (line, position) {
		// 	line.position.y = position;

		// 	// this.group.addChild(line);

		// 	// this.group.strokeColor = 'black';

		// 	line.strokeColor = 'black';
		// 	line.justify = 'center';


		// 	// this.group.justify = 'center';

		// 	// this.group.position = paper.view.center;

		// 	return this;
		// }
	});
	return LineView
});