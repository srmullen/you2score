define(["base/Engraver"], function (Engraver) {
	
	"use strict";

	var NoteEngraver = _.extend({}, Engraver, {

		drawHead: function (type, position) {
			// this.activateLayer(this.constants.layers.NOTE);

			var noteHead, noteheadSymbol;

			if (type >= 1) {
				noteheadSymbol = Engraver.constants.font.noteheads.whole;
			} else if (type >= 1/2) {
				noteheadSymbol = Engraver.constants.font.noteheads.hollow;
			} else {
				noteheadSymbol = Engraver.constants.font.noteheads.solid;
			}

			var offset = position.subtract(0, 10);

			noteHead = new paper.PointText({
				content: noteheadSymbol,
				fontFamily: 'gonville',
				fontSize: Engraver.config.fontSize,
				fillColor: 'black',
				position: offset
			});

			// noteHead.selected = true;

			return noteHead;
		},

		/*
		 * Draw the duration dots on the note
		 */
		drawDots: function (noteHead, dots) {
			
			var dotArr = [];

			if (dots) {
				var distance = this.headSize[0] / 2, // how far away to draw the dot from the head
					point = noteHead.bounds.rightCenter,
					dot;

				for (var i = 0; i < dots; i++) {
					point = point.add(distance, 0);
					dot = new paper.Path.Circle(point, 2);
					dot.fillColor = 'black';
					// this.group.addChild(dot); // TODO: might need a way to refer to the dots later
					dotArr.push(dot);
				}
			}

			return dotArr;
		},

		/*
		 * Draw the stacato and legato marks
		 */
		drawStacatoLegato: function (noteHead, model) {
			var stacato, legato;

			// there should be font symbols for stacato and legato
			if (model.get("stacato")) {
				stacato = new paper.Path.Circle();
			}			

			if (model.get("legato")) {
				legato = new paper.Path.Line();
			}
		},

		drawAccidental: function (noteHead, accidental) {
			var retAccidental
			if (accidental === "#") {
				retAccidental = this.drawSharp(noteHead);
			} else if (accidental === "b") {
				retAccidental = this.drawFlat(noteHead);
			}

			return retAccidental;
		},

		drawSharp: function (noteHead) {
			return new paper.PointText({
				content: Engraver.constants.font.accidentals.sharp,
				fontFamily: 'gonville',
				fontSize: Engraver.config.fontSize,
				fillColor: 'black',
				position: noteHead.bounds.rightCenter.add(10, -5)
			});
		},

		drawFlat: function (noteHead) {
			return new paper.PointText({
				content: Engraver.constants.font.accidentals.flat,
				fontFamily: 'gonville',
				fontSize: Engraver.config.fontSize,
				fillColor: 'black',
				position: noteHead.bounds.rightCenter.add(10, -5)
			});
		}
	});

	return NoteEngraver;
});