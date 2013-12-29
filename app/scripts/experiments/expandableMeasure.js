define(["base/PaperBaseView", 
		"base/BaseModel",
		"line/LineView",
		"measure/MeasureView",
		"note/NoteView",
		"note/NoteModel",
		"beat/BeatGroupView",
		"tools/HighlightTool"], 
function (PaperBaseView, BaseModel, LineView, MeasureView, NoteView, NoteModel, BeatGroupView, HighlightTool) {

	var expandableMeasure = function (context) {
		console.log("Here's the expanding measure!");

		var line = context.addChildView(LineView);

		line.render(100);

		line.group.strokeColor = 'black';
		line.group.position = new paper.Point(450, 100);
		line.group.translate(0.5, 0.5);

		console.log(paper.project.activeLayer);
		var measure = context.addChildView(MeasureView);
		measure.barLength = 200;
		measure.render(new paper.Point(200, 100));
		measure.group.translate(0.5, 0.5);

		var noteModel = new NoteModel({type: 1/4});
		var note = context.addChildView(NoteView, noteModel);
		note.xPos = 30;
		note.yPos = 0;
		note.stemDirection = "up";
		note.render(new paper.Point(200, 150));


		// paper.project.activeLayer = measureLayer;
		// measureLayer.bringToFront();
		// context.layers['measure'].bringToFront();
		context.bringLayerToFront('measure');

		context.highlighter.addView(line);
		context.highlighter.addView(measure);
		context.highlighter.addView(note);


		// var highlightTool = new HighlightTool({views: [line, measure, note]});
	};

	return expandableMeasure;
});