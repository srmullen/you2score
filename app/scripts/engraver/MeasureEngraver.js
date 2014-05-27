define(["base/Engraver"], function (Engraver) {

	"use strict";

	var MeasureEngraver = _.extend({}, Engraver, {

		/*
		 * @centerLine {Point} the leftmost point of the center line in the measure.
		 * @lineSpaceing {Integer} distance between lines in a measure.
		 */
		drawLegerLines: function (noteHead, centerLine, lineSpacing) {

			// get the distance from the center line.
			// var distance = noteHead.bounds.center.y - centerLine.y,
			var distance = Engraver.getNoteHeadCenter(noteHead.bounds.center).y - centerLine.y,
				legerLines = [];
			var yPositionFunc = getYpositionFunc(distance, centerLine.y, lineSpacing);

			if (Math.abs(distance) >= lineSpacing * 3) {
				// Added Math.ceil to help with issues doing floating point math. Not sure if it's the perfect solution.
				for (var i = 0; i <= Math.ceil(Math.abs(distance) - (lineSpacing * 3)) / lineSpacing; i++) {
					var yPos = yPositionFunc(i);
					var point1 = new paper.Point(noteHead.bounds.leftCenter.x - 10, yPos);
					var point2 = new paper.Point(noteHead.bounds.rightCenter.x + 10, yPos);
					legerLines.push(new paper.Path.Line(point1, point2));
				}
			}

			return new paper.Group({
				children: legerLines,
				strokeColor: "black"
			});
		},
	});
	
	/*
	 * Given a number, returns a function that returns the y position of a leger line
	 * given which leger, the center y position, and the line spacing.
	 */
	function getYpositionFunc (num, centerY, lineSpacing) {
		if (num >= 0) {
			return function (i) {
				return centerY + (lineSpacing * (3 + i))
			}
		} else {
			return function (i) {
				return centerY - (lineSpacing * (3 + i))
			}
		}
	}

	return MeasureEngraver;
});