define(["chai", "scripts/collections/MeasureCollection", "scripts/models/MeasureModel", "scripts/models/NoteModel"], 
function (chai, MeasureCollection, MeasureModel, NoteModel) {

	var expect = chai.expect;

	describe("MeasureCollection", function () {
		var measureCollection;

		describe("Initialization", function () {
			it("should be an instance of iteself", function () {
				measureCollection = new MeasureCollection();
				expect(measureCollection).to.be.an.instanceof(MeasureCollection);
			});
		});

		describe("Method: addMeasure", function (measure) {
			// may want to consider doing this
			xit("should not add measure if it is not an instance of MeasureModel", function () {
				measureCollection = new MeasureCollection();
				var note = new NoteModel();
				expect(measureCollection.length).to.equal(1);
				measureCollection.addMeasure(note);
				expect(measureCollection.length).to.equal(1);
			});	

			it("should add a measure to the end of the collection", function () {
				measureCollection = new MeasureCollection();
				var measure1 = new MeasureModel(),
					measure2 = new MeasureModel();
				measureCollection.addMeasure(measure1);
				expect(measureCollection.last().cid).to.equal(measure1.cid);
				measureCollection.addMeasure(measure2);
				expect(measureCollection.last().cid).to.equal(measure2.cid);				
			});
		});

		describe("Method: addNote", function () {
			it("should add a note to the first free location", function () {
				measureCollection = new MeasureCollection();
				var note = new NoteModel({type: 1});
				measureCollection.addNote(note);
				expect(measureCollection.at(0)).to.be.ok;
			});
		});
	});
});