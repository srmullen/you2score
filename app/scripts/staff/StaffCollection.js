define(["base/BaseCollection", 
		"./StaffModel"], 
function (BaseCollection, StaffModel) {

	var StaffCollection = BaseCollection.extend({

		model: StaffModel,

		initialize: function () {
			console.log("Initializing StaffCollection");
		}
	});
	return StaffCollection;
});