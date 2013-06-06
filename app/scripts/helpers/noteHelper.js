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
			var octave = parseInt(p.slice(-1)),
				note = p.slice(0, p.length - 1),
				pitchVal;

			pitchVal = this.midiObj[note[0]];
			
			if (note[1] === "b") {
				pitchVal -= note.length - 1;
			} else if (note[1] === "#") {
				pitchVal += note.length - 1;
			}

			return (12 * octave) + pitchVal + 21;
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
			"A": 0,
			"B": 2,
			"C": 3,
			"D": 5,
			"E": 7,
			"F": 8,
			"G": 10
		}

	}
	return NoteHelper;
});