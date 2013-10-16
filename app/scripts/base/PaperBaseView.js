/**
 * Module to handle rendering to a canvas.
 * The 'el' must be a canvas element.
 */
define(["backbone", "paper"], function (Backbone) {

	// PaperBaseView should install event handlers on 
	var PaperBaseView = Backbone.View.extend({

		name: "PaperBaseView",

		// group: new paper.Group(),

		// childViews: [],

		// render: function (args) {
		// 	this.preRender();

		// 	this.drawElement();

		// 	this.postRender();

		// 	return this;
		// },

		// The render method will likely need to be 
		// re-implemented for each type of element drawn.
		drawElement: function () {

		},

		preRender: function () {},
		postRender: function () {},

		// Added for interoperabillity with HandlebarsBaseView.addChildView().
		// Might be useful in the future, but not now.
		placeAt: function () {return this;},

		// Needs implementation upon further study of paper.js
		nuke: function () {}
	});
	return PaperBaseView;
});