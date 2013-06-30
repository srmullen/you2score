define(["base/HandlebarsBaseView", "text!./score.tmpl"], function (BaseView, tmpl) {

	var ScoreView = BaseView.extend({

		template: tmpl,

		construct: function () {
			console.log("Initializing Handlebars Score");
		}
	});
	return ScoreView;
});