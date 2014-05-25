define(["base/PaperBaseView",
		"./LineModel",
		"measure/MeasureCollectionView",
		"engraver/LineEngraver"],
function (PaperBaseView, LineModel, MeasureCollectionView, LineEngraver) {

	var LineView = PaperBaseView.extend({

		name: "LineView",

		initialize: function () {
			console.log("Initializing LineView");

			this.model = this.model || new LineModel();

			this.measures = [];
			// this.measures = new MeasureCollectionView();
			
			this.activateLayer("line");
			// this.group = new paper.Group();
		},

		render: function (yPosition) {
			console.log("Rendering lineView");
			this.lineWidth = this.model.get("width") * this.$el.width();
			// this.group = this.createLine(width, this.model.get("spacing"));
			// this.createLine(this.lineWidth, this.model.get("spacing"));
			this.group = LineEngraver.drawLine(this.lineWidth, this.model.get("spacing"));

			this.group.position.y = yPosition;
		},

		// createLine: function (width, spacing) {
		// 	var line,
		// 		lineArray = [];
		// 	for (var i = 0; i < 5; i++) {
		// 		line = new paper.Path.Line(new paper.Point(0, i * spacing), new paper.Point(width, i * spacing));
		// 		lineArray.push(line);
		// 	}

		// 	var rectangle = new paper.Rectangle(lineArray[0].firstSegment.point, lineArray[4].lastSegment.point);
		// 	rectangle = new paper.Path.Rectangle(rectangle);
		// 	rectangle.fillColor = "white"; // create a fill so the center can be clicked 
		// 	rectangle.opacity = 0.0; // make the rectangle invisible
		// 	this.group.addChildren(lineArray);
		// 	this.group.insertChild(0, rectangle);
		// },

		// This should be called after the render method.
		drawMeasures: function () {
			var position = this.group.children[0].segments[1].point;
			var measuresAllotted = this.getMeasuresAllotted();
			_.each(this.measures, function (measure, i, list) {
				
				var previousBarLength;

				// the length (stored as a ratio of the line length) of each measure 
				// should be stored in the line model or a view specific
				// measure model, otherwise it should default to 1/measuresAllotted.
				// var previousBarLength = i ? (this.model.get("measurelength") || (1 / measuresAllotted) * this.lineWidth) : i; // old version kep for reference
				if (i == 0) {
					previousBarLength = 0;
				} else {
					previousBarLength = list[i-1].barLength;
				};

				position = position.add(previousBarLength, 0);

				measure.render(position); // get top left point
			}, this);
		},

		/*
		 * @param measures - MeasureView or Array of MeasureViews to add. If more than the alotted number in
		 * the model are added the number will be increased.
		 */
		addMeasures: function (measures) {
			this.measures = this.measures.concat(measures);
			this.model.set({measuresAllotted: this.measures.length});
			this.setBarLength(this.measures);
		},

		setBarLength: function (measures) {
			var measuresAllotted = this.getMeasuresAllotted();
			_.each(measures, function (measure) {
				measure.barLength = measure.barLength /* and do some math to accomodate new bar */ || (1 / measuresAllotted) * this.lineWidth;
			}, this);
		},

		getMeasuresAllotted: function () {
			return this.model.get("measuresAllotted")
		}
	});
	return LineView
});