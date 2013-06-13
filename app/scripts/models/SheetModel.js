define(["base/BaseModel"], function (BaseModel) {

	/*
	 * staves {number} - The number of staves on the sheet
	 */
	var SheetModel = BaseModel.extend({

		defaults: {
			staves: 8
		},

		initialize: function () {
			
		}
	});
	return SheetModel;
});