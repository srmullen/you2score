define(["chai", "scripts/helpers/noteHelper"], function (chai, noteHelper) {

	var expect = chai.expect;

	describe("Helper: noteHelper", function () {
		var v1, v2;

		xdescribe:("equalPitch", function () {

		});

		/* Frequency isn't important right now */
		xdescribe("pitchToFreq", function () {
			it("should convert pitch to frequency", function () {
				v1 = noteHelper.pitchToFreq({name: "C", ocatave: 2});
				expect(v1).to.equal(65.406);

				v1 = noteHelper.pitchToFreq({name: "G", accidental: "#", octave: 6});
				v2 = noteHelper.pitchToFreq(name: "A", accidental: "b", ocatave: 6});
				expect(v1).to.equal(v2);
			});
		});

		describe("pitchToMidi", function () {
			it("should convert pitch to midi", function () {
				v1 = noteHelper.pitchToMidi("G3");
			});
		});
		
		describe("midiToPitch", function () {
			it("should convert midi to pitch", function () {

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