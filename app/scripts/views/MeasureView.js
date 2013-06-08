define(["base/PaperBaseView", 
	"models/MeasureModel", 
	"views/NoteView",
	"text!svg/treble.svg"], 
function (PaperBaseView, MeasureModel, NoteView, treble) {

	var MeasureView = PaperBaseView.extend({

		initialize: function (options) {
			this.group = new paper.Group();
			this.clefBase = this.getClefBase(this.model.get("clef"));
			this.barLength = 2000;
		},

		drawElement: function () {
			
			this.drawMeasure();

			this.drawBar("both");

			this.drawClef();

			// this.drawNotes(); // just concentrate on the clef for now;

			// scaling a group also scales its children.
			// elements not added to the group will not be scaled.
			this.group.scale(0.25); 
			this.group.strokeColor = 'black';
			this.group.position = new paper.Point(400, 130);

			// All methods beginning with draw should return themselves to facilitate chaining
			return this; 
		},

		addNote: function (note) {
			this.model.addNote(note);
		},

		/**
		 *	Iterates over the NoteCollection and draws the notes.
		 */
		drawNotes: function () {
			// Get the notes from the model and draw them
			var that = this;
			// Iterate over notes in the NoteCollection and create a View for them
			this.model.get('notes').each(function (note) { 
				var noteView = new NoteView({model: note}); // maybe a PaperView doesn't need and el?
															// probably won't hurt to give it the canvas though
			
				// Hack in the position of C5
				// that.clefBase.point = that.lineObj["D"].firstSegment.point.add([0, 40]);
				that.clefBase.point = that.lines[1].firstSegment.point.add([0, 40]);
				noteView.drawElement(that.clefBase);

				that.group.addChild(noteView.group);
			});

			return this;
		},

		drawMeasure: function () {
			// Create a group of lines and an object or accessing them by name.
			// var lineNames = ["F", "D", "B", "G", "E"];
			var line;
			this.lines = [];
			for (var i = 0; i < 5; i++) {
				line = new paper.Path.Line(new paper.Point(0, 200 + i * 80), new paper.Point(this.barLength, 200 + i * 80));
				// this.lines[lineNames[i]] = line; // save the line in an object with pitch name keys
				this.lines.push(line);
				this.group.addChild(line);
			}

			return this;
		},

		drawClef: function () {
			$('#svgContainer').append(treble); // put the svg in the dom
			var svgItem = paper.project.importSVG(document.getElementById('trebleSVG'));
			svgItem.scale(0.45);
			svgItem.position = new paper.Point(200, 400);
			this.group.addChild(svgItem);

			// Flag indicating that a clef has been drawn on this measure
			// It can be used to determine x-offset for drawing notes.
			this.clefDrawn = true;

			return this;
		},

		drawBar: function (side) {
			var leftBar, rightBar, topPoint, bottomPoint;
			
			if (side === "left") {

				topPoint = this.lines[0].firstSegment.point;
				bottomPoint = this.lines[4].firstSegment.point;
				leftBar = new paper.Path.Line(topPoint, bottomPoint);
				this.group.addChild(leftBar);

			} else if (side === "right") {

				topPoint = this.lines[0].lastSegment.point;
				bottomPoint = this.lines[4].lastSegment.point;
				rightBar = new paper.Path.Line(topPoint, bottomPoint);
				this.group.addChild(rightBar);
				
			} else if (side === "both") {

				topPoint = this.lines[0].firstSegment.point;
				bottomPoint = this.lines[4].firstSegment.point;
				leftBar = new paper.Path.Line(topPoint, bottomPoint);

				topPoint = this.lines[0].lastSegment.point;
				bottomPoint = this.lines[4].lastSegment.point;
				rightBar = new paper.Path.Line(topPoint, bottomPoint);
				this.group.addChildren([leftBar, rightBar]);
			}

			return this;
		},

		getClefBase: function (clef) {
			return {
				"treble": {pitch: "C", degree: 0, octave: 5}
			}[clef];
		}
	});
	return MeasureView;
});