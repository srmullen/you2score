define(["base/PaperBaseView",
		"measure/MeasureCollectionView"], 
function (PaperBaseView, MeasureCollectionView) {
	"use strict";

	/*
	 * StaffView is really a grouping of lines. It should be responsible for drawing the bars between them.
	 */
	var StaffView = PaperBaseView.extend({

		initialize: function () {
			console.log("Constructing StaffView");

			var systems = this.model.get("systems");

			this.lines = this.initLines(systems.length);
			// the line arrays have been initialized at this point but LineViews haven't been added.
			// need to find the best place to do this, but it needs to happen before measures are added to
			// the lines in MeasureCollectionView and after the lines are partitioned.
			// this.systems = this.initSystems(systems, this.lines); // this cant happen in initialize
		},

		// Creates lines, an array of arrays. An array for each system, which will contain the lineViews
		initLines: function (num) {
			var lines = [];

			for (var i = 0; i < num; i++) {
				lines.push([]);
			};

			return lines;
		},

		initSystems: function (systems, lines) {
			var measures;
			return _.map(systems, function (measureCollection, i) {
				measures = new MeasureCollectionView({
					el: this.el, 
					collection: measureCollection,
					meter: this.model.get("meter"),
					lines: lines[i]
				});
				return measures;
			}, this);
		},

		render: function (position) {

			this.drawBars(this.lines);

			this.drawInstrument(this.model.get("instrument"));
			this.drawMeter(this.model.get("meter"));
			this.drawSystems(this.systems, position);
			
			this.height = this.getTotalHeight(this.systems); // set the height of the staff so staves view can determine where to place other staves
							  // It is set arbitrarily for testing purposes right now.
			return this;
		},

		/*
		 * Draws the measure bars across the lines.
		 * @param lines - Array of LinesView arrays.
		 */
		drawBars: function (lines) {
			var section;
			for (var i = 0, l = lines[0].length; i < l; i++) {
				section = this.groupSystems(lines, i);
			}
		},

		/*
		 * @param lines - Array of LineView Arrays.
		 * @param i - the section to return.
		 * @return - Array of the LineViews that have bars and measures between them. (need to come up with good
		 *  terminology for this. Maybe section)
		 */
		groupSystems: function (lines, i) {
			var section = [];
			_.each(lines, function (line) {
				section.push(line[i]);
			});
			return section;
		},

		drawInstrument: function (instrument) {

		},

		drawMeter: function (meter) {

		},

		drawSystems: function (systems, position) {
			_.each(systems, function (collectionView, i) {

				// Get the total height of all the views that have been rendered thus far.
				collectionView.render(position.add(0, this.getTotalHeight(systems.slice(0, i))));
				
			}, this);
		},

		// Used in more than one class. Should be moved to a prototype.
		getTotalHeight: function (views) {
			var ans =  _.reduce(views, function (x, y) {
				return x + y.height;
			}, 0);
			return ans;
		},

		/*
		 * Takes enough lines from the front of the array to create the staff.
		 * Each line at the same index in the subarrays are grouped together by their measure number.
		 * ie. lines[1][1], lines[2][1] and lines [3][1] would each have the same numbered measures,
		 * but possibly different clefs.
		 * @param lines {LineView[]}
		 * @return lines without the added lines.
		 */
		addLines: function (lines) {
			var numSystems = this.systems.length, linesToAdd;
			
			linesToAdd = lines.splice(0, numSystems);
			_.each(linesToAdd, function (line, i) {
				this.lines[i].push(line);
			}, this);

			return lines;
		}
	});
	return StaffView;
});