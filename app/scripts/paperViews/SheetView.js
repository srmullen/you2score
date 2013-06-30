define(["base/PaperBaseView", 
	"../models/SheetModel", 
	"../paperViews/MeasureView", 
	"../models/NoteModel", 
	"../paperViews/NoteView"], 
function (PaperBaseView, SheetModel, MeasureView, NoteModel, NoteView) {

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
			this.staveWidth = this.$el.width();
			this.lineSpacing = this.staveWidth / 100; // 100 is arbitrary, i'm not sure the math here is correct
			this.group = new paper.Group();

			var that = this;
			paper.tool.onKeyDown = function (event) {
				that.addNote(event);
			}
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

			// event handlers can be attached to specific items
			// this only works if the right places on the line are clicked
			var that = this;
			stave.onClick = function (event) {
				// var target = event.item;
				// this.strokeColor = 'blue';
			}

			return stave;
		},

		addNote: function (pitch) {
			var noteModel = new NoteModel(pitch);
			this.model.get("notes").add(noteModel);

			// var
		}
	});
	return SheetView;
});