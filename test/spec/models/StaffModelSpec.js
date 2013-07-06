define(["chai",
	"scripts/models/StaffModel", 
	"scripts/collections/MeasureCollection", 
	"scripts/collections/NoteCollection",
	"scripts/models/MeasureModel",
	"scripts/models/NoteModel"], 
function (chai, StaffModel, MeasureCollection, NoteCollection, MeasureModel, NoteModel) {

	var expect = chai.expect;

	describe("StaffModel", function () {
		var staffModel, measureCollection, noteCollection;

		describe("Initialization", function () {
			it("should be defined", function () {
				expect(staffModel).to.be.undefined;
				staffModel = new StaffModel();
				expect(staffModel).to.be.ok;
			});
		});

		describe("Attribute: instrument", function () {
			it("should be undefined by default", function () {
				staffModel = new StaffModel();
				expect(staffModel.get("instrument")).to.be.undefined;
			});
			it("sould be passed as an attribute when initialized", function () {
				staffModel = new StaffModel({instrument: "Piano"});
				expect(staffModel.get("instrument")).to.equal("Piano");
			});

			afterEach(function () {
				staffModel.nuke();
			})
		});

		describe("Attribute: measures", function () {
			it("should be a an array", function () {
				staffModel = new StaffModel({}, {parse: true});
				expect(staffModel.get("measures")).to.be.an.instanceof(Array);
			});
		});

		describe("Attribute: notes", function () {
			it("should be an array", function () {
				staffModel = new StaffModel({}, {parse: true});
				expect(staffModel.get("notes")).to.be.an.instanceof(Array);
			});
		});

		xdescribe("Method: notesIntoMeasures", function () {
			var staff;
			beforeEach(function () {
				staff = new StaffModel();
			});

			it("should do nothing if there are no notes", function () {
				expect(staff.get("notes").length).to.equal(0);
				expect(staff.get("measures").length).to.equal(1);
				staff.notesIntoMeasures();
				expect(staff.get("notes").length).to.equal(0);
				expect(staff.get("measures").length).to.equal(1);
			});

			xit("should add a barebones measure if the measure collection is empty", function () {
				expect(staff.get("measures").length).to.equal(0);
				expect(staff.get("measures").length).to.equal(1);
				var note = new NoteModel();
				staff.addNote(note);
				staff.notesIntoMeasures();
				expect(staff.get("notes").length).to.equal(1);
				expect(staff.get("measures").length).to.equal(1);
			});

			it("should add notes to the MeasureModel's NoteCollection", function () {
				var note1 = new NoteModel();
				noteCollection = new NoteCollection([note1]);
				measureCollection = new MeasureCollection();
				staffModel = new StaffModel();
				staffModel.notesIntoMeasures();
				expect(measureCollection.get(note1)).to.be.ok;
				expect(noteCollection.at(0) === measureCollection.at(0).get("notes").at(0)).to.be.true;
			});

			it("MeasureModel.NoteCollection and StaffModel.NoteCollection should refernce the same notes", function () {

			});
		});
		
		// I dont think these tests are necessary with arrays of collections rather than straght collections.
		xdescribe("Default Collections", function () {
			it("Different staves should have different MeasureCollections", function () {
				var staff1 = new StaffModel({instrument: "Voice"});
	          	var staff2 = new StaffModel({instrument: "Piano"});
	          	var measure = new MeasureModel();

	          	expect(staff1.get("measures").length).to.equal(1);
	          	staff1.addMeasure(measure);
	          	expect(staff1.get("measures").length).to.equal(2);
	          	expect(staff2.get("measures").length).to.equal(1);
			});

			it("Different staves should have different NoteCollections", function () {
				var staff1 = new StaffModel({instrument: "Voice"});
	          	var staff2 = new StaffModel({instrument: "Piano"});
	          	var note = new NoteModel();

	          	expect(staff1.get("notes").length).to.equal(0);
	          	staff1.addNote(note);
	          	expect(staff1.get("notes").length).to.equal(1);
	          	expect(staff2.get("notes").length).to.equal(0);
			});
		});
	});
});