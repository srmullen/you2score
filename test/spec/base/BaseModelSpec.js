define(["chai", "base/BaseModel"], function (chai, BaseModel) {

	var expect = chai.expect;

	describe("BaseModel", function () {
		describe("Function: nuke", function () {
			it("should obliterate the models attributes", function () {
				var modAttr = "Don't nuke me";
				var model = new BaseModel({help: modAttr});
				expect(model.get("help")).to.equal("Don't nuke me");
				model.nuke();
				expect(model.get("help")).to.be.undefined;
			});

			it("should nuke nested models", function () {
				var model1 = new BaseModel({boom: "nuked"});
				var model2 = new BaseModel({help: model1});
				expect(model1.get("boom")).to.equal("nuked");
				model2.nuke();
				expect(model1.get("boom")).not.to.be.ok;
			});
		});
	});
});
