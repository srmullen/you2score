define(["base/BaseCollection"], function (BaseCollection) {

	var StaffCollection = BaseCollection.extend({

		initialize: function () {
			console.log("Initializing StaffCollection");
		}
	});
	return StaffCollection;
});