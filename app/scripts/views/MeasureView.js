define(["base/PaperBaseView", "models/MeasureModel", "views/NoteView"], function (PaperBaseView, MeasureModel, NoteView) {

	var MeasureView = PaperBaseView.extend({

		defaults: {
			model: new MeasureModel()
		},


		initialize: function (options) {
			// this.note = options.note;
			this.group = new paper.Group();
		},

		drawElement: function () {
			// var line1, line2, line3, line4, line5;
			// var lineGroup = new paper.Group();
			var line;
			var baseNote = {pitch: "C", deg: 0, octave: 5} // this should be meta data gathered from the clef

			// Create a group of lines and an object or accessing them by name.
			var lineNames = ["F", "D", "B",  "G", "E"];
			this.lineObj = {};
			for (var i = 0; i < 5; i++) {
				line = new paper.Path.Line(new paper.Point(80, 200 + i * 80), new paper.Point(2000, 200 + i * 80));
				this.lineObj[lineNames[i]] = line; // save the line in an object with pitch name keys
				this.group.addChild(line);
			}

			// Get the notes from the model and draw them
			var that = this;
			// Iterate over notes in the NoteCollection and create a View for them
			this.model.get('notes').each(function (note) { 
				var noteView = new NoteView({model: note}); // maybe a PaperView doesn't need and el?
															// probably won't hurt to give it the canvas though
				
				// // Dont actually need the pitch of the models note
				// // Need the pitch of the basenote given the clef
				// noteView.drawElement(that.lineObj[note.get('pitch').name].firstSegment.point.sub);

				// Hack in the position of C5
				baseNote.point = that.lineObj["D"].firstSegment.point.add([0, 40]);
				noteView.drawElement(baseNote);

				that.group.addChild(noteView.group);
			});

			// scaling a group also scales its children.
			// elements not added to the group will not be scaled.
			this.group.scale(0.25); 
			this.group.strokeColor = 'black';
			this.group.position = new paper.Point(400, 130);
		},

		addNote: function (note) {
			this.model.addNote(note);
		},

		drawNote: function (note) {

		}
	});
	return MeasureView;
});