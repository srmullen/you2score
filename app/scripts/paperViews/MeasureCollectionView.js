define(["base/PaperBaseView",
	"./MeasureView"], 
function (PaperBaseView, MeasureView) {
	"use strict";

	var MeasureCollectionView = PaperBaseView.extend({

		initialize: function () {
			console.log("constructing MeasureCollectionView");
			this.childViews = [];
			this.group = new paper.Group(); // probably dont need childViews because of this.
		},

		render: function (position) {
			// var barLength = 300;
			var barLength = this.$el.width() * 0.9; // here it is the length of the page.
			var lineSpacing = 10;
			var lines = this.createLines(position, barLength, lineSpacing);
			this.drawSystem(lines);

			this.drawMeasures(this.collection, position);

			this.height = 100; //FIXME: arbitrary height for text test

			return this;
		},

		// Creates lines the length of the page.
		createLines: function (position, barLength, lineSpacing) {
			var line,
				lineArray = [];
			for (var i = 0; i < 5; i++) {
				// line = new paper.Path.Line(new paper.Point(0, i * lineSpacing), new paper.Point(barLength, i * lineSpacing));
				line = new paper.Path.Line(position.add(0, i * lineSpacing), position.add(barLength, i * lineSpacing));
				lineArray.push(line);
			}

			return lineArray;
		},

		drawSystem: function (lines) {

			this.group.addChildren(lines);

			this.group.strokeColor = 'black';

			return this;
		},

		drawMeasures: function (collection, position) {
			collection.each(function (model) {
				var measure = new MeasureView({model: model});
				
					 // barlength should probably come from systems or even higher.
					 // All measures at the same index in each MeasureCollection need to have the
					 // same barLength, across all instruments too.
					 // At the same time barLenth needs to be calculated from the bottom up
					 // based on the notes that are in each measure. Could simplify this by
					 // letting the user set their own barLengths.

				// calculate the length of the last bar and add it to the position to get the
				// position of the bar that is being drawn.
				var barLength = this.getMeasureLength(model);
				var previousBarLength = this.getPreviousMeasureLength();
				position = position.add(previousBarLength, 0);
				measure.render(position, barLength);
				this.childViews.push(measure);
			}, this);
		},

		// not currently used
		drawMeasure: function (model) {
			return new MeasureView({model: model}).render();
		},

		// Measures should have a standard length when empty. 
		// If the measure is full but has few notes, i.e. a whole note, it should be shorter.
		// If the measure has many notes, i.e. all sixteenths, it should be longer.
		// 
		// The length of a measure also depends on the way notes are grouped, which is determined by
		// the meter.
		// FIXME: Just render the standard length for now.
		getMeasureLength: function (measureModel) {
			var notes = measureModel.get("notes"), 
				length = 200; // arbitrary
			if (notes.isEmpty()) return length;

			return length;
		},

		getTotalMeasureLength: function () {
			if (this.childViews.length === 0) return 0;
			return _.reduce(this.childViews, function (x, y) {
				return x + this.getMeasureLength(y.model);
			}, 0, this);
		},

		getPreviousMeasureLength: function () {
			if (this.childViews.length === 0) return 0;
			return this.getMeasureLength(this.childViews[this.childViews.length - 1].model);
		} 

	});
	return MeasureCollectionView;
});