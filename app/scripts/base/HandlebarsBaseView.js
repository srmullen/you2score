define(["backbone", "handlebars"], function (Backbone, Handlebars) {

	"use strict"

	var HandlebarsBaseView = Backbone.View.extend({

		initialize: function (options) {
			this.childViews = [];
			this.construct(options);
		},

		construct: function (options) {
		},

		addChildView: function (View, config, node, position) {
			var v = new View(config).render().placeAt(node, position);
			this.childViews.push(v);
			return v;
		},

		render: function () {

			this.preRender();

			if (this.template) {
				var data = this.serialize(),
					html = this.tmplToHtml(this.template, data);
				this.$el.html(html);
			}

			this.postRender();

			// var tmpl = Handlebars.compile(this.template);
			// var html = tmpl(this.model);
			// this.$el.html(html);

			return this;
		},

		tmplToHtml: function (template, data) {
			data = this.modelToTmplContext(data);

			var tmpl = Handlebars.compile(this.template);
			return tmpl(data);
		},

		// The serialize method is responsible for taking the view's data 
		// and preparing it to be used by he view's template. You can override 
		// or extend this method as required in your  individual view. By default,
		// it will use the model or collection assiged to the view as its data,
		// serializing it useing the 'toJSON' method; if your view does not have
		// a model or collection, it will just return the view object itself.
		serialize: function () {
			if (this.model || this.collection) {
				return (this.model || this.collection).toJSON();
			}
			return this;
		},

		/**
		 * Method to allow modifying model to be used for rendering template
		 * @param {Object} modelData JSON representation of model
		 * @return {Object} model data modified to be used in templates
		 */
		modelToTmplContext: function (modelData) {
			return modelData;
		},

		// ### 'placeAt'
		//
		// Once the view has been rendered, it still needs to be placed in the
		// document. The 'placeAt' method allows you to specify a destination for
		// the view; this destination can either be a jquery object, a DOM node, or 
		// a selector. The 'placeAt' method also optionally takes a position
		// argument, which determines how the object will be placed in the 
		// destination node: as the first, last, or only child.
		placeAt: function (node, position) {
			if (!node) {
				return this;
			}
			position = position || 'last';
			var method = {
				'first': 'prepend',
				'last': 'append',
				'only': 'html' 
			}[position] || 'append';
			$(node)[method](this.$el);
			this.postPlaceAt();
			return this;
		},

		// ## Lifecycle Methods
		preRender: function () {},
		postRender: function () {},
		postPlaceAt: function () {},

		// ### 'destroy'
		//
		// The 'destroy' method stops listening to all events that were bound using 
		// 'listenTo', and also calls the default 'remove' method.
		destroy: function () {
			$.each(this.childViews, function (index, view) {
				view.destroy();
			});
			this.childViews = [];

			this.undelegateEvents();
			this.remove();
		}
	});
	return HandlebarsBaseView;
});