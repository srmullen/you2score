define(["base/constants"], function (constants) {

	var FONT_SIZE = 32,
		FONT_FAMILY = "gonville";

	var defaultConfig = {
		fontSize: FONT_SIZE,
		fontFamily: FONT_FAMILY,
		note: {
			minWidth: 33,
			head: {
				width: fontSizeToNoteHeadWidth(FONT_SIZE),
				height: 10,
				yOffset: fontSizeToNoteHeadYOffset(FONT_SIZE)
			}
		}
	}

	function Config (configuration) {
		
		var config = _.extend({}, defaultConfig, configuration);

		return processConfig(config);

		// var config = {

		// 	fontSize: FONT_SIZE,

		// 	// The distance between leger lines.
		// 	// There for it is also the height of a note head.
		// 	lineSpacing: fontSizeToLineSpacing(FONT_SIZE, FONT_FAMILY), // should be calculated from fontSize
		// 	// lineSpacing: 10,

		// 	// FIXME: should be based on fontSize
		// 	note: {
		// 		minWidth: 33,
		// 		head: {
		// 			width: fontSizeToNoteHeadWidth(FONT_SIZE),
		// 			height: 10,
		// 			yOffset: fontSizeToNoteHeadYOffset(FONT_SIZE)
		// 		}
		// 	}
		// };
	};

	function processConfig (config) {
		config.note.head.width = fontSizeToNoteHeadWidth(config.fontSize);
		config.note.head.yOffset = fontSizeToNoteHeadYOffset(config.fontSize);
		config.lineSpacing = fontSizeToLineSpacing(config.fontSize, config.fontFamily);

		return config
	};

	function fontSizeToLineSpacing(fontSize, fontFamily) {
		// Can't access paper at this point because the context hasn't been setup.
		// The height of the noteHead font is 1.2 * fontSize. This was figured out just by experimenting in the browser console.
		var height = fontSize * 1.2;

		return (5 * height) / 18;
	};

	/*
	 * returns the y distance between the center of the font bounds and the center of the note head.
	 */
	function fontSizeToNoteHeadYOffset (fontSize) {
		return 9; // FIXME: This will not scale. Needs to change based on different font sizes.
	};

	function fontSizeToNoteHeadWidth (fontSize) {
		return 13;
	}

	return Config;
});