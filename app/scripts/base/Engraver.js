define(["base/constants", "config", "base/Layer", "paper"], function (constants, config, Layer) {
	"use strict";

	var Engraver = {

		constants: constants,

		config: config,

		/*
		 * @param noteHead {PointText}
		 * @return {Point} The position of the center of the noteHead.
		 */
		getNoteHeadCenter: function (noteHead) {
			return noteHead.bounds.center.add(0, 10);
		}

	}

	return Engraver;
});