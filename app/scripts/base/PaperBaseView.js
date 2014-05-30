/**
 * Module to handle rendering to a canvas.
 * The 'el' must be a canvas element.
 */
define(["backbone", "base/constants", "base/Layer", "paper"], function (Backbone, constants, Layer) {

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

		// config: config,

		constants: constants,

		// activateLayer: new Layer().activateLayer,
		activateLayer: function (name) {
			if (this.options.context) {
				this.options.context.activateLayer(name);
				// paper.project.activeLayer = name;
			}
		},

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
	}, {
		constants: constants
	});

	// FIXME: temporary hack for bumping Backbone version without having to change all initialize functions.
	PaperBaseView = (function(View) {
	    return View.extend({
	        constructor: function(options) {
	            this.options = options || {};
	            View.apply(this, arguments);
	        }
	    });
	})(PaperBaseView);


	return PaperBaseView;
});