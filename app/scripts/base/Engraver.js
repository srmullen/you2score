define(["base/constants", "base/Layer", "paper"], function (constants, Layer) {
	"use strict";

	var Engraver = {

		constants: constants,

		/*
		 * @param position {Point} - the center of the PointText
		 * @return {Point} The position of the center of the noteHead.
		 */
		getNoteHeadCenter: function (position) {
			return position.add(0, Engraver.config.note.head.yOffset);
		}

	}

	return Engraver;
});