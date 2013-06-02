define(["chai", "scripts/collections/NoteCollection"], function (chai, NoteCollection) {

	var expect = chai.expect;

	describe("NoteCollection", function () {
		var noteCollection;

		describe("Initialization", function () {
			it("should be an instance of itself", function () {
				expect(noteCollection).to.be.undefined;
				noteCollection = new NoteCollection();
				expect(noteCollection).to.be.an.instanceof(NoteCollection);
			})
		})
	})
})