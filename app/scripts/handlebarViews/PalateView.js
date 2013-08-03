define(['base/HandlebarsBaseView', 'text!./palate.tmpl'], function (BaseView, tmpl) {
	'use strict';

	var PalateView = BaseView.extend({

		template: tmpl,

		events: {
			"click #addNoteBtn": "addNote"
		},

		construct: function () {
			console.log("Initializing PalateView");
			
		},

		postPlaceAt: function () {
			// make the palate sticky
			$("#palate").sticky({topSpacing:90});
		},

		//
		addNote: function () {

		},

		selectMeasure: function () {

		}
	});
	return PalateView;
});