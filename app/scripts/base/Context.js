define(["paper"], function () {

	/**
	 * The Context is the base file for a canvas context.
	 */
	var Context = function (canvas) {

		this.childViews = [];

		this.canvas = canvas;

		paper.setup(canvas);

		this.addChildView = function (View) {

			this.childViews.push(new View({el: this.canvas}));

			paper.view.draw();
			
			return this;
		};

	}
	return Context;
})