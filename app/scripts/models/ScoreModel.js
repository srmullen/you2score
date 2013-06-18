define(["base/BaseModel", "../collections/StaffCollection", "../models/StaffModel"], 
function (BaseModel, StaffCollection, StaffModel) {

	/**
	 * Attributes:
	 *	title 		{String} - The title of the Score.
	 *	composer	{String} - The composer(s) of the Score.
	 *	staves		{Collection} - Collection of Staves.
	 *  sections	{?} - ?.
	 */

	var ScoreModel = BaseModel.extend({

		// locked is not an attribute, it is metadata
		locked: false,

		defaults: {
			staves: new StaffCollection(),
			markings: [] // Could be use for additional markings to the staff that need to be saved.
		},

		initialize: function (attributes, options) {
			if (options) {
				this.locked = options.locked || false;
			}

			this.listenTo(this.get("staves"), "add", function () {
				console.log("more staves!");
			})
		},

		/**
		 * Adds staves to the StaffCollection.
		 * @param stf {StaffModel[], StaffModel}
		 */
		addStaves: function (staff) {
			this.get("staves").add(staff);
		},

		removeStaff: function (model) {
			this.get("staves").remove(model);
		}
	});
	return ScoreModel;
});