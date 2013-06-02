define(["chai", "scripts/models/NoteModel"], function (chai, NoteModel) {

	var expect = chai.expect;

	describe("NoteModel", function () {
		var noteModel;
		describe("Initialization", function () {
			it("should exist", function () {
				expect(noteModel).not.to.be.ok;
				noteModel = new NoteModel();
				expect(noteModel).to.be.an.instanceof(NoteModel);
			});

			it("should set midiNote and freq given pitch", function () {
				noteModel = new NoteModel({pitch: "A4"});
				expect(noteModel.get("midiNote")).to.equal(69);
				expect(noteModel.get("freq")).to.equal(440.0);
			});

			it("should set midiNote and pitch given freq", function () {
				noteModel = new NoteModel({freq: 123.47});
				expect(noteModel.get("midiNote")).to.equal(47);
				expect(noteModel.get("pitch")).to.equal("B2");
			});

			it("should set pitch and freq given midiNote", function () {
				noteModel = new NoteModel({midiNote: 85});
				expect(noteModel.get("pitch")).to.equal("C#6");
				expect(noteModel.get("freq")).to.equal(1108.7);
			});

			// afterEach(function () {
			// 	noteModel.nuke();
			// });
		});

		describe("Attribute: duration", function () {
			it("should be 1 by default", function () {
				noteModel = new NoteModel();
				expect(noteModel.get("duration")).to.equal(1);
			})
		});

		describe("Attribute: stacato", function () {
			it("should be false by default", function () {
				noteModel = new NoteModel();
				expect(noteModel.get("stacato")).to.be.false;
			});
		});

		describe("Attribute: stacato", function () {
			it("should be false by default", function () {
				noteModel = new NoteModel();
				expect(noteModel.get("stacato")).to.be.false;
			});
		});

		xdescribe("Method: isEqualPitch", function () {
			var note1, note2, ret;
			it("should return true if the notes have the same pitch name", function () {
				note1 = new NoteModel({pitch: "C#2"});
				note2 = new NoteModel({pitch: "C#2"});
				ret = note1.isEqualPitch(note2);
				expect(ret).to.be.true;
			}); 
		});

		// afterEach(function () {
		// 	noteModel.nuke();
		// });
	});
});