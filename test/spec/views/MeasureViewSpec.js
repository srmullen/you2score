define(["chai", 
		"measure/MeasureView",
		"beat/BeatGroupView"
		], function (chai, MeasureView, BeatGroupView) {

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

		describe("initBeatGroups Method", function () {
			it("should be defined", function () {
				measureView = new MeasureView();
				expect(measureView.initBeatGroups).to.be.defined();
			})
		});
	});
});