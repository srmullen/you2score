define(["chai", "scripts/helpers/NoteHelper"], function (chai, NoteHelper) {

	var expect = chai.expect;

	describe("Helper: NoteHelper", function () {
		var v1, v2;

		xdescribe:("equalPitch", function () {

		});

		/* Frequency isn't important right now */
		xdescribe("pitchToFreq", function () {
			it("should convert pitch to frequency", function () {
				v1 = NoteHelper.pitchToFreq({name: "C", ocatave: 2});
				expect(v1).to.equal(65.406);

				v1 = NoteHelper.pitchToFreq({name: "G", accidental: "#", octave: 6});
				v2 = NoteHelper.pitchToFreq({name: "A", accidental: "b", ocatave: 6});
				expect(v1).to.equal(v2);
			});
		});

		describe("pitchToMidi", function () {
			it("should convert pitch to midi", function () {
				v1 = NoteHelper.pitchToMidi({name: "F", accidental: "#", octave: 6});
				expect(v1).to.equal(90);

				v1 = NoteHelper.pitchToMidi({name: "A", octave: 0});
				expect(v1).to.equal(21);


				v1 = NoteHelper.pitchToMidi({name: "B", accidental: "#", octave: 3});
				expect(v1).to.equal(60);

				v1 = NoteHelper.pitchToMidi({name: "G", octave: 3});
				v2 = NoteHelper.pitchToMidi({name: "A", accidental: "bb", octave: 3});
				expect(v1).to.equal(v2);
			});
		});
		
		xdescribe("midiToPitch", function () {
			it("should convert midi to pitch", function () {
				v1 = NoteHelper.midiToPitch(90);
				expect(v1).to.equal("F#6");

				v1 = NoteHelper.midiToPitch(60);
				expect(v1).to.equal("B#3");

				v1 = NoteHelper.midiToPitch("E##5");
				v2 = NoteHelper.midiToPitch("Gb5");
				expect(v1).to.equal(v2);
			});
		});
		
		xdescribe("midiToFreq", function () {
			it("should convert midi to frequency", function () {

			});
		});

		xdescribe("freqToMidi", function () {
			it("should convert frequency to midi", function () {

			});
		});
		
		xdescribe("freqToPitch", function () {
			it("should convert frequency to pitch", function () {

			});
		});
	});
});