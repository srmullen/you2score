define(["chai", "sinonChai", "note/NoteModel"], function (chai, sinonChai, NoteModel) {

	var expect = chai.expect;
	var sinon = sinonChai;

	describe("NoteModel", function () {
		var noteModel;
		xdescribe("Initialization", function () {
			it("should exist", function () {
				expect(noteModel).not.to.be.ok;
				noteModel = new NoteModel();
				expect(noteModel).to.be.an.instanceof(NoteModel);
			});

			it("should set midiNote and freq given pitch", function () {
				noteModel = new NoteModel({pitch: {name: "A", degree: 5, octave: 4}});
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

			afterEach(function () {
				noteModel.nuke();
			});
		});

		describe("Attribute: type", function () {
			it("should be 1 by default", function () {
				noteModel = new NoteModel();
				expect(noteModel.get("type")).to.equal(1);
			});
		});

		describe("Attribute: duration", function () {
			it("should note be set manually", function () {
				noteModel = new NoteModel({duration: 4});
				expect(noteModel.get('duration')).not.to.equal(4);
			});
			it("should be 1 by default", function () {
				noteModel = new NoteModel();
				expect(noteModel.get("duration")).to.equal(1);
			});
			it("should be 50% longer if note is dotted", function () {
				noteModel = new NoteModel({dotted: true});
				expect(noteModel.get("duration")).to.equal(3/2);
				noteModel = new NoteModel({type: 1/8, dotted: true});
				expect(noteModel.get("duration")).to.equal(3/16);
			});
			it("should be 1/3 shorter if note is a triplet", function () {
				noteModel = new NoteModel({triplet: true});
				expect(noteModel.get("duration")).to.equal(2/3);
				noteModel = new NoteModel({type: 1/8, triplet: true});
				expect(noteModel.get("duration")).to.equal(2/24);
			});
			it("should update when dotted changes", function () {
				noteModel = new NoteModel();
				expect(noteModel.get("duration")).to.equal(1);
				noteModel.set({dotted: true});
				expect(noteModel.get("duration")).to.equal(3/2);
			});
			it("should update when triplet changes", function () {
				noteModel = new NoteModel();
				expect(noteModel.get("duration")).to.equal(1);
				noteModel.set({triplet: true});
				expect(noteModel.get("duration")).to.equal(2/3);
			});

			afterEach(function () {
				noteModel.nuke();
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

		afterEach(function () {
			noteModel.nuke();
		});
	});
});