define(["chai", "scripts/factories/NoteModelFactory", "scripts/models/NoteModel"], 
function (chai, NoteModelFactory, NoteModel) {

	var expect = chai.expect;

	describe("NoteModelFactory", function () {
		var noteFactory;

		describe("Initialization", function () {
			it("should be an instance of itself", function () {
				noteFactory = new NoteModelFactory();
				expect(noteFactory).to.be.an.instanceof(NoteModelFactory);
			});
		});
	});
});