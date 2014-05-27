define(["base/constants", "config", "base/Layer", "paper"], function (constants, config, Layer) {
	"use strict";

	var Engraver = {

		constants: constants,

		config: config,

		/*
		 * @param position {Point} - the center of the PointText
		 * @return {Point} The position of the center of the noteHead.
		 */
		getNoteHeadCenter: function (position) {
			// return noteHead.bounds.center.add(0, config.note.head.yOffset);
			// return noteHead.bounds.center.add(0, 0);
			return position.add(0, config.note.head.yOffset);
		}

	}

	return Engraver;
});