define(["backbone"], function (Backbone) {

	var BaseCollection = Backbone.Collection.extend({

		name: "BaseCollection",

		/**
		 * Nukes all models in the collection.
		 */
		nuke: function () {
			this.forEach(function (mod) {
				mod.nuke();
			});
			this.reset();
		}
	});
	return BaseCollection;
});