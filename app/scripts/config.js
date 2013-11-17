define([], function () {
	
	// Default global values.
	// Will be changed by the users for their pieces so it will need to be persisted.
	// Should probably be made into a model since changes will need to be listened for.
	var config = {

		// The distance between leger lines.
		// There for it is also the height of a note head.
		lineSpacing: 10,

		note: {
			minWidth: 33,
			head: {
				width: 13,
				height: 10
			}
		}
	};

	return config;
});