define(["paper"], function () {

	/**
	 * The Context is the base file for a canvas context.
	 */
	var Context = function (canvas) {

		this.childViews = [];

		this.canvas = canvas;

		paper.setup(canvas);

		this.addChildView = function (View) {

			var view = new View({el: this.canvas});

			view.render();

			this.childViews.push(view);

			paper.view.draw();
			
			return view;
		};

	}
	return Context;
})