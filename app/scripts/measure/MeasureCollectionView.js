define(["base/PaperBaseView",
		"./MeasureView"], 
function (PaperBaseView, MeasureView) {

	/*
	 * MeasureCollection is a grouping of all the measures in a system. It is responsible for splitting
	 * the measures up between the lines.
	 */
	var MeasureCollectionView = PaperBaseView.extend({
		// This should maybe be renamed SystemView
		name: "MeasureCollectionView",

		initialize: function () {
			console.log("constructing MeasureCollectionView");

			this.meter = this.options.meter;

			// this.lines = this.options.lines;
			this.lines = [];

			this.measureViews = this.initMeasureViews(this.collection);

			// this.measuresIntoLines(this.measureViews, this.lines); // this needs to happen after StavesView.partitionLines

			this.group = new paper.Group(); // probably dont need childViews because of this.
			this.length = this.calculateCollectionLength(this.measureViews);
			this.height = 100; // FIXME: Arbitrary height
		},

		initMeasureViews: function (collection) {
			var measureView;
			return collection.map(function (model) {
				measureView = new MeasureView({
					el: this.el,
					model: model,
					meter: this.meter
				});
				return measureView;
			}, this);
		},

		/*
		 * Adds the number of allotted measures to each line.
		 */
		measuresIntoLines: function (measures, lines) {
			var measureCopy = measures.slice(0); //copy the measures array so it can be modified without worrying about this.lines.
			_.each(lines, function (line) {
				var count = line.getMeasuresAllotted();
				line.addMeasures(measureCopy.splice(0, count));
			});
		},

		render: function (position) {
			// var barLength = this.$el.width() * 0.9; // here it is the length of the page.
			// var lineSpacing = 10;
			// var lines = this.createLines(position, barLength, lineSpacing);
			// this.drawSystem(lines);

			// this.drawMeasures(this.measureViews, position);

			this.drawMeasures(this.measureViews, this.lines);

			return this;
		},

		// // Creates lines the length of the page.
		// createLines: function (position, barLength, lineSpacing) {
		// 	var line,
		// 		leftPoint,
		// 		rightPoint,
		// 		lineArray = [];
		// 	for (var i = 0; i < 5; i++) {
		// 		leftPoint = position.add(0, i * lineSpacing);
		// 		rightPoint = position.add(barLength, i * lineSpacing);
		// 		line = new paper.Path.Line(leftPoint, rightPoint);
		// 		lineArray.push(line);
		// 	}

		// 	return lineArray;
		// },

		// drawSystem: function (lines) {

		// 	this.group.addChildren(lines);

		// 	this.group.strokeColor = 'black';

		// 	return this;
		// },

		// drawMeasures: function (measureViews, position) {
		// 	_.each(measureViews, function (view, i, list) {
				
		// 			 // barlength should probably come from systems or even higher.
		// 			 // All measures at the same index in each MeasureCollection need to have the
		// 			 // same barLength, across all instruments too.
		// 			 // At the same time barLenth needs to be calculated from the bottom up
		// 			 // based on the notes that are in each measure. Could simplify this by
		// 			 // letting the user set their own barLengths.

		// 		// if i is 0 then the previous length is 0
		// 		var previousBarLength = i ? list[i-1].barLength : i;
		// 		position = position.add(previousBarLength, 0);	
		// 		view.render(position);
		// 	}, this);
		// },

		drawMeasures: function (measures, lines) {
			console.log("Rendering MeasureCollectionView");
			// Measures may need to be added to the lines. That way if the lines are moved
			// around the notes will go with it. Giving them the same location may do the trick
			// just as well. I'm not sure.
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
		},

		addLine: function (line) {
			this.lines.push(line);
		}

	});
	return MeasureCollectionView;
});