define(["base/PaperBaseView", 
		"base/BaseModel",
		"line/LineView",
		"measure/MeasureView",
		"note/NoteView",
		"tools/HighlightTool"], 
function (PaperBaseView, BaseModel, LineView, MeasureView, NoteView, HighlightTool) {

	var expandableMeasure = function (context) {
		console.log("Here's the expanding measure!");

		// Layers should be extracted and created in the correct order
		var scoreLayer = new paper.Layer();
		var sheetLayer = new paper.Layer();
		// are section layer and staves layer needed?
		var lineLayer = new paper.Layer();
		var measureLayer = new paper.Layer();		
		var beatLayer = new paper.Layer();
		var noteLayer = new paper.Layer();

		scoreLayer.name = 'score';
		sheetLayer.name = 'sheet';
		lineLayer.name = 'line';
		measureLayer.name = 'measure';
		beatLayer.name = 'beat';
		noteLayer.name = 'note';

		paper.project.activeLayer = lineLayer;
		var line = context.addChildView(LineView);

		line.render(100);

		line.group.strokeColor = 'black';
		line.group.position = new paper.Point(450, 100);
		line.group.translate(0.5, 0.5);

		paper.project.activeLayer = measureLayer;
		var measure = context.addChildView(MeasureView);
		measure.barLength = 200;
		measure.render(new paper.Point(200, 100));
		measure.group.translate(0.5, 0.5);

		paper.project.activeLayer = noteLayer;
		var note = context.addChildView(NoteView);
		note.xPos = 30;
		note.yPos = 40
		note.render(new paper.Point(200, 150));

		var highlightTool = new HighlightTool({views: [line, measure]});
	};

	return expandableMeasure;
});