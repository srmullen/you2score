define(["base/PaperBaseView",
		"./StaffView"], 
function (PaperBaseView, StaffView) {

	/**
	 * StavesView is responsible for placing the staves relative to each other.
	 *
	 * position: Where to begin drawing the staves.
	 */
	var StavesView = PaperBaseView.extend({

		name: "StavesView",

		initialize: function () {
			console.log("Constructing StavesView");
			this.staves = this.initStaves(this.collection);

			// this.partitionLines(this.options.lines);
		},

		initStaves: function (staffCollection) {
			var staffView;
			return staffCollection.map(function (staffModel) {
				staffView = new StaffView({
					el: this.el, 
					model: staffModel
				});
				return staffView;
			}, this);
		},

		render: function (position) {
			this.drawStaves(this.staves, position);
			return this;
		},

		drawStaves: function (childViews, position) {
			var previousHeight;
			_.each(childViews, function (view, i, list) {

				previousHeight = i ? list[i-1].height : i;
				position = position.add(0, previousHeight);
				view.render(position);
			});
		},

		// Method to get the total height of all the views in childViews.
		// Seems a little too complex.
		// This function could be memoized for performance gains.
		getTotalHeight: function (views) {
			var ans =  _.reduce(views, function (x, y) {
				return x + y.height;
			}, 0);
			return ans;
		},

		/*
		 * Divides the lines up among the instruments.
		 * @param lines - LineView[]
		 */
		partitionLines: function (lines) {
			var i = 0, 
				length = this.staves.length;

			while (lines.length) {
				lines = this.staves[i % length].addLines(lines);
				i++;
			};


		}
	});
	return StavesView;
});