define(["base/BaseModel", "../helpers/NoteHelper"], function (BaseModel, noteHelper) {

	/**
	 * Attributes:
	 *	pitch {Object} - The note name, degree (c = 0 d = 1 ...) accidental and octave {name: "A", degree: 5, accidental: "#", octave: "3"}
	 *	midiNote {number} - The midi representation of the pitch.
	 *	freq {number} - pitch represented in cycles per second
	 *	type {number} - defaults to 1 (whole note) quarter note would be 1/4 or .25.
	 *	dotted {boolean} - makes the duration 50% longer.
	 *	triplet {boolean} - makes the duration 1/3rd shorter
	 *	duration {number} - value calculated based on 
	 *	dynamic {string} - forte and whatnot
	 *	volume {number} - dynamic needs to be backed up by an actual number for playing it.
	 *	stacato {boolean} - default false
	 *	legato {boolean} - default false
	 */
	var NoteModel = (function () {
		return BaseModel.extend({

			defaults: {
				type: 1,
				stacato: false,
				legato: false
			},

			initialize: function (attributes) {
				console.log("Initializeing NoteModel");
				/* Ignore for now, will use later */
				if (attributes) {
					if (attributes.pitch) {
						var p = attributes.pitch, f, m;
						f = noteHelper.pitchToFreq(p);
						m = noteHelper.pitchToMidi(p);
						this.set({freq: f}); // use Backbone set, so not to reinvoke conversion logic
						this.set({midiNote: m});
					}

					// if (attributes.midiNote) {
					// 	var m = attributes.midiNote, p, f;
					// 	p = noteHelper.midiToPitch(m);
					// 	f = noteHelper.midiToFreq(m);
					// 	this.set({pitch: p}); // use Backbone set, so not to reinvoke conversion logic
					// 	this.set({freq: f});
					// }

					// if (attributes.freq) {
					// 	var f = attributes.freq, p, m;
					// 	p = noteHelper.freqToPitch(f);
					// 	m = noteHelper.freqToMidi(f);
					// 	this.set({pitch: p}); // use Backbone set, so not to reinvoke conversion logic
					// 	this.set({midi: m});
					// }
				}

				// calculate the duration
				this.set({duration: this.calculateDuration()});

				this.on("change:dotted", this.updateDuration);
				this.on("change:triplet", this.updateDuration);
			},

			parse: function (data, options) {
				this.set({
					pitch: data.pitch,
					midiNote: data.midiNote,
					freq: data.freq,
					type: data.type,
					dotted: data.dotted,
					triplet: data.triplet,
					duration: data.duration,
					dynamic: data.dynamic,
					volume: data.volume,
					stacato: data.stacato,
					legato: data.legato
				});
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

			calculateDuration: function () {
				var dur = this.get("type");
				
				if (this.get("dotted")) {
					dur *= 1.5;
				}

				if (this.get("triplet")) {
					dur *= 2/3;
				}
				return dur;
			},

			updateDuration: function () {
				this.set({duration: this.calculateDuration()});
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

		/* Private Methods / fields */

	})();
	return NoteModel;
});