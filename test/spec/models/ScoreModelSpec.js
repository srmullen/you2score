define(["chai", "scripts/models/ScoreModel", "scripts/models/StaffModel"], 
function (chai, ScoreModel, StaffModel) {

	var expect = chai.expect;

	describe("ScoreModel", function () {
		var scoreModel, staffModel;

		describe("Initialization", function () {
			it("should be defined", function () {
				expect(scoreModel).to.be.undefined;
				scoreModel = new ScoreModel();
				expect(scoreModel).not.to.be.undefined;
			});

			afterEach(function () {
				scoreModel.nuke();
			});
		});

		describe("Attribute: title", function () {

			it("should be undefined by default", function () {
				scoreModel = new ScoreModel();

				expect(scoreModel.get("title")).to.be.undefined;
			});

			it("should be set by an attribute", function () {
				scoreModel = new ScoreModel({title: "Goldberg Variations"});
				expect(scoreModel.name).not.to.be.null;
				expect(scoreModel.get("title")).to.equal("Goldberg Variations");
			});

			afterEach(function () {
				scoreModel.nuke();
			});
		});

		describe("Attribute: composer", function () {

			it("should be undefined by default", function () {
				scoreModel = new ScoreModel();

				expect(scoreModel.get("composer")).to.be.undefined;
			});

			it("should be set in the attribute hash", function () {
				scoreModel = new ScoreModel({composer: "Sean Mullen"});

				expect(scoreModel.get("composer")).to.equal("Sean Mullen");
			});

			afterEach(function () {
				scoreModel.nuke();
			});
		});

		describe("Attribute: staves", function () {
			
			beforeEach(function () {
				scoreModel = new ScoreModel();
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

		describe("Option: locked", function () {
			
			it("should be false by default", function () {
				scoreModel = new ScoreModel();
				expect(scoreModel.locked).to.be.false;
			});
			
			it("should be passed as an option", function () {
				scoreModel = new ScoreModel({}, {locked: true});
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
				scoreModel = new ScoreModel();
			});

			it("should be defined", function () {
				expect(scoreModel.addStaves).to.be.ok;
			});

			// Need to work on StaffModel attributes
			it("should add a default StaffModel given no paramaters", function () {
				expect(scoreModel.get("staves").length).to.equal(0);
				scoreModel.addStaves();
				expect(scoreModel.get("staves").length).to.equal(1);
			});

			it("should add the StaffModel given a StaffModel", function () {
				expect(scoreModel.get("staves").length).to.equal(0);

				var staffModel = new StaffModel();
				var cid = staffModel.cid;
				scoreModel.addStaves(staffModel);
				expect(scoreModel.get("staves").get(cid)).to.equal(staffModel);
			})

			afterEach(function () {
				scoreModel.nuke();
			})

		});
	});
});