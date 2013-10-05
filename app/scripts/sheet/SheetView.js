define(["base/PaperBaseView", 
		"./SheetModel",
		"line/LineView"], 
function (PaperBaseView, SheetModel, LineView) {

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
			this.model = this.options.model || new SheetModel();
			this.staveWidth = this.$el.width() * .9;
			this.lineSpacing = this.staveWidth / 100; // 100 is arbitrary, i'm not sure the math here is correct
			// this.group = new paper.Group();
			this.lines = this.initLines();
		},

		initLines: function () {
			var lines = [];

			for (var i = 0, n = 10; i < n; i++) {
				// var stave = this.createStave(this.staveWidth, this.lineSpacing);
				// // stave.position = stave.children[4].position.point.add([0, staveSpacing]);
				// stave.position.y = 100 * i + 50;
				// this.group.addChild(stave);

				var line = new LineView({staveWidth: this.staveWidth, lineSpacing: this.lineSpacing});
				lines.push(line);
			}

			return lines;
		},

		render: function (position) {
			// this.drawSheet();

			this.drawLines();

			// var barLength = this.$el.width() * 0.9; // here it is the length of the page.
			// var lineSpacing = 10;
			// var lineArray = [];
			// var line, position;

			// for (var i = 0, n = 10; i < n; i++) {
			// 	line = this.createLine(new paper.Point(0, 0), barLength, lineSpacing);
			// 	lineArray.push(line);
			// 	position = 100 * i + 50;
			// 	this.drawLine(line, position);
			// };
		},

		// renders each LineView in this.lines
		drawLines: function () {
			this.group = _.reduce(this.lines, function (group, lineView, i) {
				// lineView.setYPosition(100 * i + 50);
				lineView.render(100 * i + 50)
				group.addChild(lineView.group);
				return group;
			}, new paper.Group());

			// for (var i = 0, n = 10; i < n; i++) {
			// 	var stave = this.createStave(this.staveWidth, this.lineSpacing);
			// 	// stave.position = stave.children[4].position.point.add([0, staveSpacing]);
			// 	stave.position.y = 100 * i + 50;
			// 	this.group.addChild(stave);
			// }

			this.group.strokeColor = 'black';
			this.group.justify = 'center';
			this.group.position = paper.view.center;

			return this;
		},

		// drawLine: function (line, position) {
		// 	line.position.y = position;

		// 	this.group.addChild(line);

		// 	// this.group.strokeColor = 'black';

		// 	line.strokeColor = 'black';

		// 	this.group.justify = 'center';

		// 	this.group.position = paper.view.center;

		// 	return this;
		// },

		drawSheet: function () {
			this.group = new paper.Group();
			// FIXME: 100 is arbitrary, should be based on page height and number of staves
			// var staveSpacing = this.lineSpacing * 4 + 100;
			var staveSpacing = 100; 
			for (var i = 0, n = 10; i < n; i++) {
				var stave = this.createStave(this.staveWidth, this.lineSpacing);
				// stave.position = stave.children[4].position.point.add([0, staveSpacing]);
				stave.position.y = 100 * i + 50;
				this.group.addChild(stave);
			}

			this.group.strokeColor = 'black';
			this.group.justify = 'center';
			this.group.position = paper.view.center;

			return this;
		},

		createStave: function (width, spacing) {
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
			var stave = new paper.Group(lineArray);
			stave.insertChild(0, rectangle);

			return stave;
		},

		// createLine: function (position, barLength, lineSpacing) {
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

		// 	var lineGroup = new paper.Group(lineArray);
		// 	return lineGroup;
		// }
	});
	return SheetView;
});