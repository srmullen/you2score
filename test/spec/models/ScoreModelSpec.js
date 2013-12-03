define(["chai", "score/ScoreModel", "staff/StaffModel"], 
function (chai, ScoreModel, StaffModel) {

	var expect = chai.expect;

	describe("ScoreModel", function () {
		var scoreModel, staffModel;

		describe("Initialization", function () {
			it("should be defined", function () {
				expect(scoreModel).to.be.undefined;
				scoreModel = new ScoreModel({}, {parse: true});
				expect(scoreModel).not.to.be.undefined;
			});

			afterEach(function () {
				scoreModel.nuke();
			});
		});

		describe("Method: parse", function () {
			it("should be defined", function () {
				scoreModel = new ScoreModel({}, {parse: true});
				expect(scoreModel.parse).to.be.ok;
			});
		});	

		describe("Attribute: title", function () {

			it("should be undefined by default", function () {
				scoreModel = new ScoreModel({}, {parse: true});

				expect(scoreModel.get("title")).to.be.undefined;
			});

			it("should be set by an attribute", function () {
				scoreModel = new ScoreModel({title: "Goldberg Variations"}, {parse: true});
				expect(scoreModel.name).not.to.be.null;
				expect(scoreModel.get("title")).to.equal("Goldberg Variations");
			});

			afterEach(function () {
				scoreModel.nuke();
			});
		});

		describe("Attribute: composer", function () {

			it("should be undefined by default", function () {
				scoreModel = new ScoreModel({}, {parse: true});

				expect(scoreModel.get("composer")).to.be.undefined;
			});

			it("should be set in the attribute hash", function () {
				scoreModel = new ScoreModel({composer: "Sean Mullen"}, {parse: true});

				expect(scoreModel.get("composer")).to.equal("Sean Mullen");
			});

			afterEach(function () {
				scoreModel.nuke();
			});
		});

		describe("Attribute: staves", function () {
			
			beforeEach(function () {
				scoreModel = new ScoreModel({}, {parse: true});
			});

			it("should have a StaffCollection", function () {
				expect(scoreModel).not.to.be.undefined;
				expect(scoreModel.get("staves")).not.to.be.undefined;
			});

			it("should be empty by default", function () {
				expect(scoreModel.get("staves").length).to.equal(0);
			});

			afterEach(function () {
				scoreModel.nuke();
			});
		});

		xdescribe("Option: locked", function () {
			
			it("should be false by default", function () {
				scoreModel = new ScoreModel({}, {parse: true});
				expect(scoreModel.locked).to.be.false;
			});
			
			it("should be passed as an option", function () {
				scoreModel = new ScoreModel({}, {parse: true, locked: true});
				expect(scoreModel.locked).to.be.true;
			});

			// reminder case
			it("should be implemented", function () {
				expect("Locking").to.equal("needs to be implemented!");
			})

			afterEach(function () {
				scoreModel.nuke();
			});
		})

		describe("Function: addStaves", function () {

			beforeEach(function () {
				scoreModel = new ScoreModel({}, {parse: true});
			});

			it("should be defined", function () {
				expect(scoreModel.addStaves).to.be.ok;
			});

			it("should add the StaffModel given a StaffModel", function () {
				expect(scoreModel.get("staves").length).to.equal(0);

				var staffModel = new StaffModel({}, {parse: true});
				var cid = staffModel.cid;
				scoreModel.addStaves(staffModel);
				expect(scoreModel.get("staves").get(cid)).to.equal(staffModel);
				expect(scoreModel.get("staves").length).to.equal(1);
			});

			afterEach(function () {
				scoreModel.nuke();
			});

		});
	});
});