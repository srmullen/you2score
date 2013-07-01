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
		});

	});
});