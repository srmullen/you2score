define(["base/PaperBaseView", "../views/MeasureView"], function (PaperBaseView, MeasureView) {

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

		initialize: function () {
			this.staveWidth = this.$el.width();
			this.lineSpacing = this.staveWidth / 100; // 100 is arbitrary, i'm not sure the math here is correct
			this.group = new paper.Group();
		},

		drawElement: function () {
			this.drawSheet();
		},

		drawSheet: function () {
			// FIXME: 100 is arbitrary, should be based on page height and number of staves
			// var staveSpacing = this.lineSpacing * 4 + 100;
			var staveSpacing = 100; 
			for (var i = 0, n = this.model.get("staves"); i < n; i++) {
				var stave = this.createStave(this.staveWidth, this.lineSpacing);
				// stave.position = stave.children[4].position.point.add([0, staveSpacing]);
				stave.position.y = 100 * i + 50;
				this.group.addChild(stave);
			}

			this.group.strokeColor = 'black';
		},

		createStave: function (width, spacing) {
			var line,
				lineArray = [];
			for (var i = 0; i < 5; i++) {
				line = new paper.Path.Line(new paper.Point(0, i * spacing), new paper.Point(width, i * spacing));
				lineArray.push(line);
			}
			
			return new paper.Group(lineArray);
		}
	});
	return SheetView;
});