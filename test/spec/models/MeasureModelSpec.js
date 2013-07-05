define(["chai", "sinonChai", 
	"scripts/models/MeasureModel", 
	"scripts/collections/NoteCollection", 
	"scripts/models/NoteModel"], 
function (chai, sinonChai, MeasureModel, NoteCollection, NoteModel) {

	var expect = chai.expect;
	
	chai.use(sinonChai);

	describe("MeasureModel", function () {
		var measureModel;
		describe("Initialization", function () {
			it("should exist", function () {
				expect(measureModel).not.to.be.ok;
				measureModel = new MeasureModel();
				expect(measureModel).to.be.an.instanceof(MeasureModel);
				measureModel.nuke();
			});
		});

		describe("Attribute: key", function () {

			// beforeEach(function () {
			// 	measureModel = new MeasureModel();
			// });

			it("should not have a default key", function () {
				measureModel = new MeasureModel();
				expect(measureModel.get("key")).not.to.be.ok;
			});

			it("should take key as an attribute", function () {
				measureModel = new MeasureModel({key: "D#"});
				expect(measureModel.get("key")).to.equal("D#");
			})

			afterEach(function () {
				measureModel.nuke();
			});
		});

		describe("Attribute: clef", function () {
			xit("should have 'treble' as default", function () {
				measureModel = new MeasureModel();
				expect(measureModel.get("clef")).to.equal("treble");
			});

			it("should take 'clef' as an attribute", function () {
				measureModel = new MeasureModel({clef: "tenor"});
				expect(measureModel.get("clef")).to.equal("tenor");
			})

			afterEach(function () {
				measureModel.nuke();
			});
		});

		describe("Attribute: meter", function () {
			xit("should have common time as a default", function () {
				measureModel = new MeasureModel();
				expect(measureModel.get("meter")).to.be.an.instanceof(Object);
				expect(measureModel.get("meter").upper).to.equal(4);
				expect(measureModel.get("meter").lower).to.equal(4);
			});

			it("should take a meter object as an attribute", function () {
				measureModel = new MeasureModel({meter: {upper: 3, lower: 8}});
				expect(measureModel.get("meter")).to.be.an.instanceof(Object);
				expect(measureModel.get("meter").upper).to.equal(3);
				expect(measureModel.get("meter").lower).to.equal(8);
			});

			afterEach(function () {
				measureModel.nuke();
			});
		});

		describe("Attribute: notes", function () {
			it("should be an empty NoteCollection by default", function () {
				measureModel = new MeasureModel();
				expect(measureModel.get("notes")).to.be.an.instanceof(NoteCollection);
				expect(measureModel.get("notes").length).to.equal(0);
			});

			it("should take 'notes' as an attribute", function () {
				var note1 = new NoteModel();
				var note2 = new NoteModel();
				var noteCollection = new NoteCollection([note1, note2]);
				measureModel = new MeasureModel({notes: noteCollection});
				expect(measureModel.get("notes").length).to.equal(2);
			});

			afterEach(function () {
				measureModel.nuke();
			});
		});

		describe("Method: canAdd", function () {

			it("should be called when adding a note", function () {
				measureModel = new MeasureModel();
				var spy = sinon.spy(measureModel, "canAdd");
				var note = new NoteModel();
				measureModel.addNote(note);

				expect(spy).to.have.been.called;
			});

			it("should return true if the measure has no meter", function () {
				measureModel = new MeasureModel();
				expect(measureModel.get('meter')).to.be.undefined;
				var note = new NoteModel({duration: 2});
				expect(measureModel.canAdd(note)).to.be.true;
			});

			it("should return false if the notes duration is greater than the mesure remaining duration", function () {
				measureModel = new MeasureModel({meter: {upper: 4, lower: 4}});
				var note = new NoteModel({type: 2});
				expect(measureModel.canAdd(note)).to.be.false;
			});
		});

		describe("Attribute: remainingDuration", function () {
			it("should be set on initialization", function () {
				measureModel = new MeasureModel();
				expect(measureModel.remainingDuration).not.to.be.undefined;
			});

			it("should be Infinity if there is no meter", function () {
				measureModel = new MeasureModel();
				expect(measureModel.get("meter")).to.be.undefined;
				expect(measureModel.remainingDuration).to.equal(Infinity);
			});

		});

		describe("Method: calculateRemainingDuration", function () {
			it("should return Infinity if there is no meter", function () {
				measureModel = new MeasureModel();
				expect(measureModel.get("meter")).to.be.undefined;
				expect(measureModel.calculateRemainingDuration()).to.equal(Infinity);
			});

			it("should be called on MeasureModel initialization", function () {
				measureModel = new MeasureModel();
				var spy = sinon.spy(measureModel, "calculateRemainingDuration");
				expect(spy).not.to.have.been.called;
				measureModel.initialize();
				expect(spy).to.have.been.called;
			});

			it("should be called when the meter changes", function () {
				measureModel = new MeasureModel();
				var spy = sinon.spy(measureModel, "calculateRemainingDuration");
				expect(spy).not.to.have.been.called;
				measureModel.set({meter: {upper: 3, lower: 4}});
				expect(spy).to.have.been.called;
			});

			it("should be called when a note is added to the NoteCollection", function () {
				measureModel = new MeasureModel();
				var spy = sinon.spy(measureModel, "calculateRemainingDuration");
				expect(spy).not.to.have.been.called;
				var note = new NoteModel({type: 1/4});
				measureModel.addNote(note);
				expect(spy).to.have.been.called;
			});

			it("should be called when a note is removed from the NoteCollection", function () {
				measureModel = new MeasureModel({upper: 4, lower: 4});
				var note = new NoteModel({type: 1/4});
				measureModel.addNote(note);
				var spy = sinon.spy(measureModel, "calculateRemainingDuration");
				expect(spy).not.to.have.been.called;
				measureModel.removeNote(note);
				expect(spy).to.have.been.called;
			});

			it("should return the difference of the total measure duration and the sum of the notes in it", function () {
				measureModel = new MeasureModel({meter: {upper: 4, lower: 4}});
				var note = new NoteModel({type: 1/4});
				expect(measureModel.calculateRemainingDuration()).to.equal(1);
				measureModel.addNote(note);
				expect(measureModel.calculateRemainingDuration()).to.equal(0.75);
				var bigNote = new NoteModel({type: 2});
				measureModel.addNote(bigNote);
				expect(measureModel.calculateRemainingDuration()).to.equal(0.75);
				var note2 = new NoteModel({type: 1/2, dotted: true}); // this note will fill up the rest of the measure
				measureModel.addNote(note2);
				expect(measureModel.calculateRemainingDuration()).to.equal(0);
			});
		});

		describe("Method: calculateTotalDuration", function () {
			it("should return Infinity if there is no meter", function () {
				measureModel = new MeasureModel();
				expect(measureModel.get("meter")).to.be.undefined;
				expect(measureModel.calculateTotalDuration()).to.equal(Infinity);
			});

			it("should be upper divided by lower", function () {
				measureModel = new MeasureModel({meter: {upper: 4, lower: 4}});
				expect(measureModel.calculateTotalDuration()).to.equal(1);
				measureModel.set({meter: {upper: 5, lower: 5}});
				expect(measureModel.calculateTotalDuration()).to.equal(1);
				measureModel.set({meter: {upper: 6, lower: 2}});
				expect(measureModel.calculateTotalDuration()).to.equal(3);
				measureModel.set({meter: {upper: 3, lower: 4}});
				expect(measureModel.calculateTotalDuration()).to.equal(.75);
			});
		});
	});
});