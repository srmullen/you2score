define(["base/BaseModel", "../collections/NoteCollection", "../collections/MeasureCollection"], 
function (BaseModel, NoteCollection, MeasureCollection) {

	/*
	 * staves {number} - The number of staves on the sheet
	 */
	var SheetModel = BaseModel.extend({

		defaults: {
			staves: 10,
			notes: new NoteCollection(),
			measures: new MeasureCollection()
		},

		initialize: function () {
			
		}
	});
	return SheetModel;
});