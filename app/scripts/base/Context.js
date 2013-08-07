define(["paper"], function () {

	/**
	 * The Context is the base file for a canvas context.
	 */
	var Context = function (canvas) {

		this.childViews = [];

		this.canvas = canvas;

		paper.setup(canvas); // if for some reason paper is undefined, make sure it doesn't need to be rebuilt

		this.addChildView = function (View, model) {

			var view = new View({el: this.canvas, model: model});

			view.render();

			this.childViews.push(view);

			paper.view.draw();
			
			return view;
		};
	}
	return Context;
});