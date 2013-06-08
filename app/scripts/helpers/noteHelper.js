define([], function () {

	// frequency function will be implemented later
	var NoteHelper = {

		/**
		* Given two NoteModels, returns true if they are of equal pitch regardless of its
		* pitch name representation. C#2 == Db2 is true
		*/
		equalPitch: function (note1, note2) {

		},

		pitchToFreq: function (p) {},

		// This doesn't work because it doesn't take into account the jump from B0 to C1
		pitchToMidi: function (p) {

			var pitchVal = this.midiObj[p.name];
			p.accidental = p.accidental || ""; // if accidental is not passed just make it empty string

			if (p.accidental[0] === "b") {
				pitchVal -= p.accidental.length;
			} else if (p.accidental[0] === "#") {
				pitchVal += p.accidental.length;
			}

			return (12 * p.octave) + pitchVal + 11;
		},

		midiToPitch: function (m, key) {
			// var pitchArray = [["G##", "A", "Bbb"],
			// 				  ["A#", "Bb"],
			// 				  ["A##", "B", "Cb"],
			// 				  ["B#", "C", "Dbb"],
			// 				  ["C#", "Db"],
			// 				  ["C##", "D", "Ebb"],
			// 				  ["D#", "Eb"],
			// 				  ["D##", "E", "Fb"],
			// 				  ["E#", "F", "Gbb"],
			// 				  ["F#", "Gb"],
			// 				  ["F##", "G", "Abb"],
			// 				  ["G#", "Ab"]];

			this.pitchArray[m % 12];
		},

		midiToFreq: function (m) {},

		freqToMidi: function (f) {},

		freqToPitch: function (f) {},

		pitchArray: [["G##", "A", "Bbb"],
							  ["A#", "Bb"],
							  ["A##", "B", "Cb"],
							  ["B#", "C", "Dbb"],
							  ["C#", "Db"],
							  ["C##", "D", "Ebb"],
							  ["D#", "Eb"],
							  ["D##", "E", "Fb"],
							  ["E#", "F", "Gbb"],
							  ["F#", "Gb"],
							  ["F##", "G", "Abb"],
							  ["G#", "Ab"]],

		midiObj: {
			"C": 1,
			"D": 3,
			"E": 5,
			"F": 6,
			"G": 8,
			"A": 10,
			"B": 12
		}

	}
	return NoteHelper;
});