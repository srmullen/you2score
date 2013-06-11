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
			this.group = new paper.Group(); // Group for the lines on the page

			// set the properties of the measure views here, rather than in its initialize
			this.lineWidth = this.$el.width();
			this.lineSpacing = this.lineWidth / 100; // this should probably be static and not based on width of the screen
			
		},

		/*
		 * Draws a page full of blank staves.
		 */
		drawSheet: function () {
			var measureView;
			// draw 12 'staves', use MeasureView for now
			// Later abstract away the Measure, they're just lines with no meaning at this point
			for (var i = 0; i < 12; i++) {
				measureView = new MeasureView();

				this.group.addChild(measureView);
			}

			return this;
		}
	});
});