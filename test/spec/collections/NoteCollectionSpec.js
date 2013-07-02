define(["chai", "scripts/collections/NoteCollection", "scripts/models/NoteModel"], 
function (chai, NoteCollection, NoteModel) {

	var expect = chai.expect;

	describe("NoteCollection", function () {
		var noteCollection;

		describe("Initialization", function () {
			it("should be an instance of itself", function () {
				expect(noteCollection).to.be.undefined;
				noteCollection = new NoteCollection();
				expect(noteCollection).to.be.an.instanceof(NoteCollection);
			});
		});

		describe("Method: getTotalDuration", function () {
			it("should return 0 if there are no notes in the collection ", function () {
				noteCollection = new NoteCollection();
				expect(noteCollection.getTotalDuration()).to.equal(0);
			});

			it("should return the sum of all note durations in the collection", function () {
				noteCollection = new NoteCollection();
				var note1 = new NoteModel({type: 1/4}),
					note2 = new NoteModel({type: 2});
				noteCollection.add(note1);
				expect(noteCollection.getTotalDuration()).to.equal(.25);
				noteCollection.add(note2);
				expect(noteCollection.getTotalDuration()).to.equal(2.25);
			});
		});
	});
});