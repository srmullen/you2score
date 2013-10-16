define(["base/HandlebarsBaseView", 
	"./MeasureView"], 
function (HandlebarsBaseView, MeasureView, tmpl) {

	var MeasuresView = HandlebarsBaseView.extend({

		construct: function () {
			console.log("Constructing MeasuresView");
			this.createMeasureViews(this.collection);
		},

		createMeasureViews: function (collection) {
			collection.each(function (model) {
				this.addChildView(MeasureView, {model: model}, ".measure")
			}, this);
		}
	});
	return MeasuresView;
});