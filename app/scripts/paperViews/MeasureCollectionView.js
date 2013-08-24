define(["base/PaperBaseView",
	"./MeasureView"], 
function (PaperBaseView, MeasureView) {
	"use strict";

	var MeasureCollectionView = PaperBaseView.extend({

		initialize: function () {
			console.log("constructing MeasureCollectionView");
			this.childViews = this.initChildViews(this.collection);
			this.group = new paper.Group(); // probably dont need childViews because of this.
			this.length = this.calculateCollectionLength(this.childViews);
		},

		initChildViews: function (collection) {
			return collection.map(function (model) {
				var measureView = new MeasureView({model: model});
				return measureView;
			});
		},

		render: function (position) {
			var barLength = this.$el.width() * 0.9; // here it is the length of the page.
			var lineSpacing = 10;
			var lines = this.createLines(position, barLength, lineSpacing);
			this.drawSystem(lines);

			this.drawMeasures(this.childViews, position);

			this.height = 100; //FIXME: arbitrary height for text test

			return this;
		},

		// Creates lines the length of the page.
		createLines: function (position, barLength, lineSpacing) {
			var line,
				leftPoint,
				rightPoint,
				lineArray = [];
			for (var i = 0; i < 5; i++) {
				leftPoint = position.add(0, i * lineSpacing);
				rightPoint = position.add(barLength, i * lineSpacing);
				line = new paper.Path.Line(leftPoint, rightPoint);
				lineArray.push(line);
			}

			return lineArray;
		},

		drawSystem: function (lines) {

			this.group.addChildren(lines);

			this.group.strokeColor = 'black';

			return this;
		},

		drawMeasures: function (childViews, position) {
			_.each(childViews, function (view, i, list) {
				
					 // barlength should probably come from systems or even higher.
					 // All measures at the same index in each MeasureCollection need to have the
					 // same barLength, across all instruments too.
					 // At the same time barLenth needs to be calculated from the bottom up
					 // based on the notes that are in each measure. Could simplify this by
					 // letting the user set their own barLengths.

				// if i is 0 then the previous length is 0
				var previousBarLength = i ? list[i-1].barLength : i;
				position = position.add(previousBarLength, 0);	
				view.render(position);
			}, this);
		},

		// not currently used
		drawMeasure: function (model) {
			return new MeasureView({model: model}).render();
		},

		// This is untested and unused.
		getTotalMeasureLength: function (childViews) {
			if (childViews.length === 0) return 0;
			return _.reduce(childViews, function (x, y) {
				return x + y.barLength;
			}, 0, this);
		},

		/*
		 * Calculates the combined length of all the measures in the collection.
		 *
		 * Note: for this to work instantiating of child views needs to separated out from rendering.
		 */
		calculateCollectionLength: function (childViews) {
			return _.reduce(childViews, function (x, y) {
				return x + y.length;
			}, 0, this)
		}

	});
	return MeasureCollectionView;
});