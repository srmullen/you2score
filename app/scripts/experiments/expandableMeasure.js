define(["base/PaperBaseView", 
		"base/BaseModel",
		"line/LineView",
		"measure/MeasureView",
		"tools/HighlightTool"], 
function (PaperBaseView, BaseModel, LineView, MeasureView, HighlightTool) {

	var expandableMeasure = function (context) {
		console.log("Here's the expanding measure!");

		var line = context.addChildView(LineView);

		line.render(100);

		line.group.strokeColor = 'black';
		line.group.position = new paper.Point(450, 100);
		line.group.translate(0.5, 0.5);

		var measure = context.addChildView(MeasureView);

		measure.render(new paper.Point(200, 300));
		measure.group.translate(0.5, 0.5);

		var highlightTool = new HighlightTool({views: [line]});
	};

	return expandableMeasure;
});