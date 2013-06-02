define(["base/BaseModel"], function (BaseModel) {
	"use strict"

	var ScoreModel = BaseModel.extend({

		defaults: {
			length: 12 // Number of measures
		},

		// A Score can optionally have a title
		title: null,

		// A Score can optionally have a tempo marking
		tempo: null

	});
	return ScoreModel;
});