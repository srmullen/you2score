define(["score/ScoreView",
        "score/ScoreModel",
        "base/Context",
        "Config",
        "base/PaperBaseView",
        "base/Engraver",
        "line/LineView",
        "measure/MeasureView",
        "note/NoteCollectionView",
        "note/NoteView",
        "sheet/SheetView",
        "staff/StavesView",
        "staff/StaffView"],
function (ScoreView, 
		  ScoreModel, 
		  Context, 
		  Config, 
		  PaperBaseView, 
		  Engraver, 
		  LineView,
		  MeasureView,
		  NoteCollectionView, 
		  NoteView,
		  SheetView,
		  StavesView,
		  StaffView) {
	
	"use strict";

	var Scored = function (options) {

		if (!options.canvas)
			throw new Error("Scored requires a canvas");

		var config = new Config(options.config);
		Engraver.config = config; // temporary
		PaperBaseView.config = config;

		// setup paper context
		paper.setup(options.canvas);

		this.context = new Context();

		if (options.data)
			this.scoreModel = new ScoreModel(options.data.score, {parse: true});

		this.render = function () {
			
			this.scoreView = new ScoreView({
				el: options.canvas, // FIXME: should be moved to config.
				context: this.context,
				model: this.scoreModel
			});

			this.scoreView.render();
		};
	};

	return Scored;
});