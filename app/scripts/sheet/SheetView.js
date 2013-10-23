define(["base/PaperBaseView", 
		"./SheetModel",
		"line/LineView",
		"line/LineModel"], 
function (PaperBaseView, SheetModel, LineView, LineModel) {

	/*
	 * A SheetView represents a blank page of Staff Paper.
	 * It is the first thing a user sees and what they draw on.
	 *
	 * I'm note sure the SheetView actually needs a model.
	 * Its purpose may just be to draw the black piece of paper
	 * from which Measure Models and Views can be created.
	 * Or should this just draw a bunch of MeasureViews?
	 * One for each line on the page? No! In fact, notes don't even
	 * need to belong to a measure.  In a sense SheetView / SheetModel
	 * becomes the base of the application rather than ScoreView / ScoreModel.
	 */
	var SheetView = PaperBaseView.extend({

		name: "SheetView",

		initialize: function () {
			this.model = this.options.model || new SheetModel();
			
			this.lines = this.initLines();
		},

		initLines: function () {
			var lines = [], line, lineModel;

			for (var i = 0, n = 10; i < n; i++) {
				lineModel = new LineModel();
				line = new LineView({el: this.el, model: lineModel});
				lines.push(line);
			}

			return lines;
		},

		render: function () {
			this.drawLines();
		},

		// renders each LineView in this.lines
		drawLines: function () {
			this.group = _.reduce(this.lines, function (group, lineView, i) {
				lineView.render(100 * i + 50)
				group.addChild(lineView.group);
				return group;
			}, new paper.Group());

			this.group.strokeColor = 'black';
			this.group.justify = 'center';
			this.group.position = paper.view.center.add(0, 50);

			return this;
		}
	});
	return SheetView;
});