define(["base/BaseView", 
	"./ScoreModel", 
	"../measure/MeasureView", 
	"../measure/MeasureModel", 
	"./MeasureCollection", 
	"text!./score.tmpl"], 
function (BaseView, ScoreModel, MeasureView, MeasureModel, MeasureCollection, tmpl) {
	"use strict"

	/**
	 * Module for handling everything that happens on the musical score
	 */
	var Score = BaseView.extend({

		template: tmpl,

		measureCollection: new MeasureCollection(),

		construct: function () {
			console.log("Initializing Score");

			this.model = this.options.model || new ScoreModel();
		},

		postPlaceAt: function () {
			this.renderMeasures();
			this.measureCollection.get(1).addNote(); // addNote should take parameters in the future
													 // Now it's just a generic note.
		},

		// Renders the Scores number of measures specified in the ScoreModel
		renderMeasures: function () {
			for (var i = 0; i < this.model.get("length"); i++) {
				var measureModel;
				measureModel = new MeasureModel({id: i});
				this.measureCollection.add(measureModel);
				this.addChildView(MeasureView, {model: measureModel}, "#measureContainer");
			}
		}
	});
	return Score;
});