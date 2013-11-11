define(["base/PaperBaseView"], function (PaperBaseView) {

	var HighlightTool = PaperBaseView.extend({
	// var HighlightTool = _.extend(paper.Tool, {

		name: "HighlightTool",

		initialize: function () {
			_.each(this.options.views, this.addView, this);

			HighlightTool.tool.onMouseMove = $.proxy(function (event) {
				var toHighlight = this.getViewToHighlight(event.item);
				if (toHighlight) {
					this.highlight(toHighlight);
				};
				this.removeHighlight(toHighlight);
			}, this);
		},

		// The view to highlight on hover. 
		// Color is optional.
		addView: function (view, color) {
			var decoratedView = this.decorateView(view, color);

			var gid = view.group.id;
			HighlightTool.views[gid] = decoratedView;
		},

		highlight: function (toHighlight) {
			var group = toHighlight.view.group;

			group.children[0].fillColor = toHighlight.color;
			group.children[0].opacity = 0.5;
			HighlightTool.highlighted[group.id] = group;
		},

		removeHighlight: function (toHighlight) {
			if (!toHighlight) {
				_.each(HighlightTool.highlighted, function (value, key) {
					value.children[0].opacity = 0;
					delete HighlightTool.highlighted[key];
				}, this);
			}; 
		},

		decorateView: function (view, color) {
			var viewObj = {
				"LineView": {
					color: 'green'
				}
			}[view.name];

			viewObj.view = view;

			return viewObj;
		},

		getViewToHighlight: function (item) {
			if (item) {
				return HighlightTool.views[item.id];
			};
		},

		toHighlight: function (item) {
			if (item && HighlightTool.views[item.id])
				return true;
			return false;
		},

		isHighlighted: function (item) {
			if (item && HighlightTool.highlighted(item.id))
				return true;
			return false;
		}

	}, { // Static properties
		views: {},
		highlighted: {},
		tool: new paper.Tool()

	});
	return HighlightTool;
});