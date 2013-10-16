define(["base/BaseModel", 
		"note/NoteCollection", 
		"measure/MeasureCollection"], 
function (BaseModel, NoteCollection, MeasureCollection) {

	/*
	 * lines {number} - The number of staves on the sheet.
	 * type  {string} - Different kinds of lines could be specified here, such as guitar tablature or voice.
	 */
	var SheetModel = BaseModel.extend({

		name: "SheetModel",

		defaults: {
			lines: 10
			// type: 'regular', 'tabs', 'other?'
		}
	});
	return SheetModel;
});