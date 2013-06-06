define(["base/PaperBaseView", "models/MeasureModel"], function (PaperBaseView, MeasureModel) {

	var MeasureView = PaperBaseView.extend({

		initialize: function () {

			// var line1, line2, line3, line4, line5;
			var lineGroup = new paper.Group(), line;

			for (var i = 0; i < 5; i++) {
				line = new paper.Path.Line(new paper.Point(80, 200 + i * 80), new paper.Point(2000, 200 + i * 80));
				lineGroup.addChild(line);	
			}
			
			lineGroup.scale(0.25);
			lineGroup.strokeColor = 'black';
			lineGroup.position = new paper.Point(400, 130);
		}
	});
	return MeasureView;
});