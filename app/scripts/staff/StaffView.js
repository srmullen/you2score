define(["base/PaperBaseView",
		"measure/MeasureCollectionView",
		"section/SectionView"], 
function (PaperBaseView, MeasureCollectionView, SectionView) {

	/*
	 * StaffView is really a grouping of lines. It should be responsible for drawing the bars between them.
	 */
	var StaffView = PaperBaseView.extend({

		name: "StaffView",

		initialize: function () {
			console.log("Constructing StaffView");

			var systems = this.model.get("systems");

			// this.sections = this.initSections(systems.length);
			this.sections = [];

			this.systems = this.initSystems(systems, this.sections);
		},

		// Creates lines, an array of arrays. An array for each system, which will contain the lineViews
		// initSections: function (numSystems) {
		// 	var sections = [];

		// 	for (var i = 0; i < numSystems; i++) {
		// 		sections.push(new SectionView);
		// 	};

		// 	return sections;
		// },

		initSystems: function (systems, sections) {
			var measures;
			return _.map(systems, function (measureCollection, i) {
				measures = new MeasureCollectionView({
					el: this.el, 
					collection: measureCollection,
					meter: this.model.get("meter")
					// lines: sections[i]
				});
				return measures;
			}, this);
		},

		render: function (position) {

			this.drawBars(this.sections);

			this.drawInstrument(this.model.get("instrument"));
			this.drawMeter(this.model.get("meter"));
			this.drawSystems(this.systems, position);

			this.drawSections(this.sections); // this doesn't do much yet
			
			this.height = this.getTotalHeight(this.systems); // set the height of the staff so staves view can determine where to place other staves
							  // It is set arbitrarily for testing purposes right now.
			return this;
		},

		/*
		 * Draws the measure bars across the lines.
		 * @param lines - Array of LinesView arrays.
		 */
		drawBars: function (sections) { // Lines need to have measures added to them at this point.
			var section;
			for (var i = 0, l = sections[0].length; i < l; i++) {
				section = this.getSection(sections, i);

				// get the first and last line in the section
				var topLine = section[0],
					bottomLine = section[section.length -1];


				// get length of the section

				//get number of measuresAllotted in the section


			}
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

		drawSections: function (sections) {
			_.each(sections, function (sectionView, i) {
				sectionView.render();
			});
		},

		// Used in more than one class. Should be moved to a prototype.
		getTotalHeight: function (views) {
			var ans =  _.reduce(views, function (x, y) {
				return x + y.height;
			}, 0);
			return ans;
		},

		/*
		 * Takes enough lines from the front of the array to create a section.
		 * Each line at the same index in the subarrays are grouped together by their measure number.
		 * ie. lines[1][1], lines[2][1] and lines [3][1] would each have the same numbered measures,
		 * but possibly different clefs.
		 * @param lines {LineView[]}
		 * @return lines without the added lines.
		 */
		addLines: function (lines) {
			var numSystems = this.systems.length, linesToAdd;
			
			linesToAdd = lines.splice(0, numSystems);
			// now what to do with the linesToAdd?
			// Make a section out of linesToAdd
			this.sections.push(new SectionView({lines: linesToAdd}));

			_.each(linesToAdd, function (line, i) {
				this.systems[i].addLine(line);
			}, this);

			return lines;
		}
	});
	return StaffView;
});