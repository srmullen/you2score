define(["chai", "scripts/collections/MeasureCollection"], function (chai, MeasureCollection) {

	var expect = chai.expect;

	describe("MeasureCollection", function () {
		var measureCollection;

		describe("Initialization", function () {
			measureCollection = new MeasureCollection();
			expect(measureCollection).to.be.an.instanceof(MeasureCollection);
		});
	});
});