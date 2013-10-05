define(["base/BaseModel"], function (BaseModel) {
	"use strict"

	var ScoreModel = BaseModel.extend({

		defaults: {
			numLines: 10, 
			measuresPerLine: 4
		}
	});
	return ScoreModel;
});