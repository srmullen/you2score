define(["chai",
	"scripts/models/StaffModel", 
	"scripts/collections/MeasureCollection", 
	"scripts/collections/NoteCollection",
	"scripts/models/MeasureModel",
	"scripts/models/NoteModel"], 
function (chai, StaffModel, MeasureCollection, NoteCollection, MeasureModel, NoteModel) {

	var expect = chai.expect;

	describe("StaffModel", function () {
		var staffModel;

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
			it("should be a single MeasureCollection by default", function () {
				staffModel = new StaffModel();
				expect(staffModel.get("measures")).to.be.an.instanceof(MeasureCollection);
			});
		});

		describe("Method: notesIntoMeasures", function () {
			var staff;
			beforeEach(function () {
				staff = new StaffModel();
			});

			it("should do nothing if there are no notes", function () {
				expect(staff.get("notes").length).to.equal(0);
				expect(staff.get("measures").length).to.equal(0);
				staff.notesIntoMeasures();
				expect(staff.get("notes").length).to.equal(0);
				expect(staff.get("measures").length).to.equal(0);
			});

			it("should add a barebones measure if the measure collection is empty", function () {
				expect(staff.get("measures").length).to.equal(0);
				expect(staff.get("measures").length).to.equal(0);
				var note = new NoteModel();
				staff.addNote(note);
				staff.notesIntoMeasures();
				expect(staff.get("notes").length).to.equal(1);
				expect(staff.get("measures").length).to.equal(1);
			});
		});

		describe("Default Collections", function () {
			it("Different staves should have different MeasureCollections", function () {
				var staff1 = new StaffModel({instrument: "Voice"});
	          	var staff2 = new StaffModel({instrument: "Piano"});
	          	var measure = new MeasureModel();

	          	expect(staff1.get("measures").length).to.equal(0);
	          	staff1.addMeasure(measure);
	          	expect(staff1.get("measures").length).to.equal(1);
	          	expect(staff2.get("measures").length).to.equal(0);
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