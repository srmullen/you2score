define(["base/PaperBaseView",
		"./LineModel"],
function (PaperBaseView, LineModel) {

	var LineView = PaperBaseView.extend({

		name: "LineView",

		initialize: function () {
			console.log("Initializing LineView");

			this.model = this.model || new LineModel();

			this.measures = [];
			
			this.group = new paper.Group();
		},

		render: function (yPosition) {
			console.log("Rendering lineView");
			var width = this.model.get("width") * this.$el.width();
			// this.group = this.createLine(width, this.model.get("spacing"));
			this.createLine(width, this.model.get("spacing"));

			this.group.position.y = yPosition;
		},

		createLine: function (width, spacing) {
			var line,
				lineArray = [];
			for (var i = 0; i < 5; i++) {
				line = new paper.Path.Line(new paper.Point(0, i * spacing), new paper.Point(width, i * spacing));
				lineArray.push(line);
			}

			var rectangle = new paper.Rectangle(lineArray[0].firstSegment.point, lineArray[4].lastSegment.point);			
			rectangle = new paper.Path.Rectangle(rectangle);
			rectangle.fillColor = "white"; // create a fill so the center can be clicked 
			rectangle.opacity = 0.0; // make the rectangle invisible
			// var stave = new paper.Group(lineArray);
			// var stave = this.group.addChildren(lineArray);
			this.group.addChildren(lineArray);
			// stave.insertChild(0, rectangle);
			this.group.insertChild(0, rectangle);

			// return stave;
		},

		/*
		 * @param measures - MeasureView or Array of MeasureViews to add. If more than the alotted number in
		 * the model are added the number will be increased.
		 */
		addMeasures: function (measures) {
			this.measures.concat(measures);
			this.model.set({measuresAllotted: this.measures.length});
		},

		getMeasureAllotted: function () {
			return this.model.get("measuresAllotted")
		}
	});
	return LineView
});