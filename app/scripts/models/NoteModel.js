define(["base/BaseModel", "../helpers/noteHelper"], function (BaseModel, noteHelper) {

	/**
	 * Attributes:
	 *	pitch {Object} - The note name, accidental and octave {name: "A", accidental: "#", octave: "3"}
	 *	degree {number} - 0-7 = C-B
	 *	octave {number} - The octave of the pitch
	 *	midiNote {number} - The midi representation of the pitch.
	 *	freq {number} - pitch represented in cycles per second
	 *	duration {number} - defaults to 1 (whole note) quarter note would be 1/4 or .25.
	 *	dotted {boolean} - visual cue, doesn't matter to the sound.
	 *	dynamic {string} - forte and whatnot
	 *	volume {number} - dynamic needs to be backed up by an actual number for playing it.
	 *	stacato {boolean} - default false
	 *	legato {boolean} - default false
	 */
	var NoteModel = (function () {
		return BaseModel.extend({

			defaults: {
				duration: 1,
				stacato: false,
				legato: false
			},

			initialize: function (attributes) {
				console.log("Initializeing NoteModel");
				/* Ignore for now, will use later */
				// if (attributes) {
				// 	if (attributes.pitch) {
				// 		var p = attributes.pitch, f, m;
				// 		f = noteHelper.pitchToFreq(p);
				// 		m = noteHelper.pitchToMidi(p);
				// 		this.set({freq: f}); // use Backbone set, so not to reinvoke conversion logic
				// 		this.set({midiNote: m});
				// 	}

				// 	if (attributes.midiNote) {
				// 		var m = attributes.midiNote, p, f;
				// 		p = noteHelper.midiToPitch(m);
				// 		f = noteHelper.midiToFreq(m);
				// 		this.set({pitch: p}); // use Backbone set, so not to reinvoke conversion logic
				// 		this.set({freq: f});
				// 	}

				// 	if (attributes.freq) {
				// 		var f = attributes.freq, p, m;
				// 		p = noteHelper.freqToPitch(f);
				// 		m = noteHelper.freqToMidi(f);
				// 		this.set({pitch: p}); // use Backbone set, so not to reinvoke conversion logic
				// 		this.set({midi: m});
				// 	}
				// }

			},

			 
			/* Explicit setter functions are needed because setting one property can alter another. */
			 
			/**
			 * @param p {string} - string representation of the pitch
			 */
			setPitch: function (p) {
				var f = noteHelper.pitchToFreq(p),
					m = noteHelper.pitchToMidi(p);
				this.set({freq: f});
				this.set({midiNote: m});
			},

			/**
			 * @param f {number} - frequency (hz)
			 */
			setFreq: function (f) {
				var p = noteHelper.freqToPitch(f),
					m = noteHelper.freqToMidi(f);
				this.set({pitch: p}); // use Backbone set, so not to reinvoke conversion logic
				this.set({midiNote: m});
			},

			/**
			 * @param m {number} - the midi number
			 */
			setMidi: function (m) {
				var p = noteHelper.midiToPitch(m),
					f = noteHelper.midiToFreq(f);
				this.set({pitch: p});
				this.set({freq: f});
			},

			/**
			 * Given a note model return true if they are equal in pitch, false otherwise.
			 * This is important because pitch can be represented in many ways so we need to 
			 * abstract away that difference. 
			 *
			 * FIXME: Should maybe be a function instead of a method.
			 */
			isEqualPitch: function (note) {}
		});

		/* Private Methods */

	})();
	return NoteModel;
});