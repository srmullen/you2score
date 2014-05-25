define(function () {

	var constants = {
		layers: {
			SCORE: "score",
			SHEET: "sheet",
			LINE: "line",
			MEASURE: "measure",
			BEAT: "beat",
			NOTE: "note"
		},
		font: {
			clefs: {
				treble: '9',
				base: '8',
				alto: '7'
			},
			accidentals: {
				flat: 'O',
				flatflat: 'X',
				natural: 'p',
				sharp: '\u2655'
			},
			flags: {
				eigth: {
					// up: '',
					down: '¡' // cmd-1
				}
			},
			noteheads: {
				solid: '_',
				hollow: '`',
				whole: '\u2654'
			},
			rests: {
				quarter: '~'
			}
		}
	};

	return constants;
});