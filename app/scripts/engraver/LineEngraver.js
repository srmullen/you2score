define(["base/Engraver"], function (Engraver) {
	
	"use strict";

	var LineEngraver = _.extend({}, Engraver, {

		drawLine: function (width, spacing) {
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

			return new paper.Group(_.flatten([rectangle, lineArray]));
		}
	});

	return LineEngraver;
});