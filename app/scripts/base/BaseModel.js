define(["backbone"], function (Backbone) {

	"use strict"

	var BaseModel = Backbone.Model.extend({

		/*
		 *	Obliterates the models attributes.
		 */
		nuke: function () {
		
			for (var key in this.attributes) {
				var val = this.get(key) || "";
				if (val.nuke) {
					val.nuke();
				}

				if (val.clear) {
					val.clear()
				}
			}
			this.clear();
		},

		// no-op method, should be overridden in child class or maybe externalized
		// generate a playable midi file of this and all child models
		generateMidiFile: function () {},

		// no-op method, should be overridden in child class or maybe externalized
		// generate the midi for this model and its child models, not a whole playable midi file
		generateMidiSection: function () {}
	});
	return BaseModel;
});