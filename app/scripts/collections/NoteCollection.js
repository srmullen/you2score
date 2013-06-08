define(["base/BaseCollection"], function (BaseCollection) {

	var NoteCollection = BaseCollection.extend({

		initialize: function () {
			console.log("Initializing NoteCollection");
		}


	});
	return NoteCollection;
});