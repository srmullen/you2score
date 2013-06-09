define(["chai", "scripts/views/MeasureView"], function () {

	var expect = chai.expect;

	describe("MeasureView", function () {

		var measureView;

		describe("Initialization", function () {
			// beforeEach(function () {
			// 	measureView = new MeasureView();
			// });

			it("should create the lines of the measure", function () {
				measureView = new MeasureView();
				expect(measureView.barLength).to.equal(2000);
				expect(measureView.lines).to.be.defined();
			});

			it("should create the base note of the clef", function () {

			});

			afterEach(function () {
				measureView.nuke();
			});
		});
	});
});