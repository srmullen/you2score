define(["base/BaseCollection", "../models/MeasureModel"], function (BaseCollection, MeasureModel) {

	var MeasureCollection = BaseCollection.extend({

		initialize: function () {
			// Add a measure if none are passed in
			// if (this.isEmpty()) this.add(new MeasureModel());
		}
	});
	return MeasureCollection;
});