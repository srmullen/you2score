define(["base/PaperBaseView",
		"staff/StavesView",
		"sheet/SheetView"], 
function (PaperBaseView, StavesView, SheetView) {

	/**
	 * width: the width of the score
	 */
	var ScoreView = PaperBaseView.extend({

		name: "ScoreView",

		initialize: function () {
			console.log("Constructing ScoreView");
			this.sheetWidth = this.options.sheetWidth;
			this.margin = this.options.margin;

			// Initialize all Views
			this.pages = this.initPages(1); // should maybe pass pages to initStaves rather than doing partitionLines here.
			this.staves = this.initStaves(this.model.get("staves"));

			// Create all the connections between the sheet views and music views
			this.staves.partitionLines(this.mergeLines(this.pages));
		},

		initStaves: function (staves, pages) {
			var stavesView = new StavesView({
				el: this.el, 
				collection: staves
				// lines: this.mergeLines(pages)
			});
			return stavesView;
		},

		// initializes the number of pages given.
		initPages: function (num) {
			var pages = [];

			for (var i = 0; i < num; i++) {
				pages.push(new SheetView({el: this.el}));
			};

			return pages;
		},

		render: function () {
			this.drawTitle(this.model.get("title"));
			this.drawTempoMarking(this.model.get("tempo"));
			this.drawComposer(this.model.get("composer"));
			this.drawPages();
			this.drawStaves(this.staves);
			
			return this;
		},

		drawTitle: function (title) {
			var title = new paper.PointText({
				content: title,
				point: new paper.Point([paper.view.center.x, 50]),
				justification: 'center',
				fontSize: 40,
				fillColor: 'black'
			});
		},

		drawTempoMarking: function (tempo) {
			var tempo = new paper.PointText({
				content: tempo,
				point: new paper.Point([100, 100]),
				justification: 'center',
				fontSize: 15,
				fillColor: 'black'
			});
		},

		drawComposer: function (composer) {
			var composer = new paper.PointText({
				content: composer,
				point: new paper.Point([750, 100]),
				justification: 'center',
				fontSize: 15,
				fillColor: 'black'
			});
		},

		// Currently just renders the staves. not sure if childViews needs to be an array.
		drawStaves: function (staves) {
			// var position = new paper.Point(50, 200); // FIXME: Arbitrary point
			return staves.render(); // dont need to pass render position anymore because 
									// it is determined by the lines on the sheet.
		},

		/*
		 * @param num - The number of pages to draw.
		 */
		drawPages: function () {
			_.each(this.pages, function (sheetView) {
				sheetView.render();
			});
		},

		mergeLines: function (pages) {
			return _.reduce(pages, function (lineArr, sheet) {
				return lineArr.concat(sheet.lines);
			}, []);
		}
	});
	return ScoreView;
});