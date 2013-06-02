define(["chai", "scripts/models/StaffModel", "scripts/collections/MeasureCollection"], function (chai, StaffModel, MeasureCollection) {

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
	});
});