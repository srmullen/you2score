define(["backbone"], function (Backbone) {
	"use strict"

	var BaseCollection = Backbone.Collection.extend({

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