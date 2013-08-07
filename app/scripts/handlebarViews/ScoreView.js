define(["base/HandlebarsBaseView", 
	"./StaffView",
	"text!./score.tmpl"], function (BaseView, StaffView, tmpl) {

	var ScoreView = BaseView.extend({

		events: {
			"click input[type=checkbox]": "updatePalate"
		},

		template: tmpl,

		construct: function () {
			console.log("Initializing Handlebars Score");
			var staffCollection = this.model.get("staves");
			this.createStaves(staffCollection);
		},

		updatePalate: function (event) {
			var type  = $(event.target).attr("type");
			var index = $(event.target).val();
			this.trigger("modelselected", this.getModel(type, index));
		},

		createStaves: function (staffCollection) {
			staffCollection.each(function (model) {
				this.addChildView(StaffView, {model: model}, ".staves");
			}, this);
		},

		getModel: function (type, index) {

		}

	});
	return ScoreView;
});