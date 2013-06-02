define(["chai", "base/BaseCollection", "base/BaseModel"], function (chai, BaseCollection, BaseModel) {

	var expect = chai.expect;

	describe("BaseCollection", function () {
		var collection, model1, model2;
		
		describe("Function: nuke", function () {
			it("should nuke all models in the collection", function () {
				collection = new BaseCollection();
				expect(collection.length).to.equal(0);
				model1 = new BaseModel();
				model2 = new BaseModel();
				collection.add([model2, model1]);
				expect(collection.length).to.equal(2);
			});
		});
	});
});