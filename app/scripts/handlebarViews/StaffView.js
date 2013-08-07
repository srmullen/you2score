define(["base/HandlebarsBaseView",
	"./MeasuresView"],
function (HandlebarsBaseView, MeasuresView) {
	"use strict";

	var StaffView = HandlebarsBaseView.extend({

		construct: function () {
			console.log("Constructing staff view");
			this.createMeasures(this.model.get("systems"));
		},

		createMeasures: function (systems) {
			for (var i = 0, l = systems.length; i < l; i++) {
				this.addChildView(MeasuresView, {collection: systems[i]}, ".measures");
			}
		}
	});
	return StaffView;
});