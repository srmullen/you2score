define(["base/BaseModel", 
		"staff/StaffCollection", 
		"staff/StaffModel"], 
function (BaseModel, StaffCollection, StaffModel) {

	/**
	 * Attributes:
	 *	title 		{String} - The title of the Score.
	 *	composer	{String} - The composer(s) of the Score.
	 *	tempo		{String} - Tempo Marking
	 *	staves		{Collection} - Collection of Staves.
	 *  sections	{?} - ?.
	 */

	var ScoreModel = BaseModel.extend({

		name: "ScoreModel",

		// locked is not an attribute, it is metadata
		locked: false,

		defaults: {
			markings: [] // Could be use for additional markings to the staff that need to be saved.
		},

		initialize: function (attributes, options) {
			console.log("Initializing ScoreModel");
			if (options) {
				this.locked = options.locked || false;
			}

			// needs to exist if it's going to be listened to, even if parse isn't called.
			if (!this.get("staves")) {
				this.set({staves: new StaffCollection()});
			}

			this.listenTo(this.get("staves"), "add", function () {
				console.log("more staves!");
			});
		},

		parse: function (data, options) {
			// Set the staves. If data.staves is undefined it will just be an empty staff collection.
			return {
				staves: new StaffCollection(data.staves, {parse: true}),
				title: data.title,
				composer: data.composer,
				tempo: data.tempo
			}
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