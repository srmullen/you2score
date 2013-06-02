define(["chai", "scripts/collections/StaffCollection", "scripts/collections/StaffModel"], 
function (chai, StaffCollection, StaffModel) {

	var expect = chai.expect;

	describe("StaffCollection", function () {
		var staffCollection;
		describe("Initialization", function () {
			it("should exist", fucntion () {
				expect(staffCollection).not.to.be.ok;
				staffCollection = new StaffCollection();
				expect(staffCollection).to.be.ok;
			});
		});
	});
});