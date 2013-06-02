define(["base/BaseCollection", "../measure/MeasureModel"], function (BaseCollection, MeasureModel) {
	"use strict"

	var MeasureCollection = BaseCollection.extend({
		
		model: MeasureModel,

		comparator: function (measure) {
			return measure.get("number");
		}
	});
	return MeasureCollection;
});
