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

			this.sections = [];

			this.systems = this.initSystems(systems, this.sections);
		},

		initSystems: function (systems, sections) {
			var measures;
			return _.map(systems, function (measureCollection, i) {
				measures = new MeasureCollectionView({
					el: this.el, 
					collection: measureCollection,
					meter: this.model.get("meter")
				});
				return measures;
			}, this);
		},

		render: function () {

			this.drawInstrument(this.model.get("instrument"));
			this.drawMeter(this.model.get("meter"));
			this.drawSystems(this.systems);

			this.drawSections(this.sections); // this doesn't do much yet
			
			this.height = this.getTotalHeight(this.systems); // set the height of the staff so staves view can determine where to place other staves
							  // It is set arbitrarily for testing purposes right now.
			return this;
		},

		drawInstrument: function (instrument) {

		},

		drawMeter: function (meter) {

		},

		drawSystems: function (systems) {
			_.each(systems, function (collectionView) {

				collectionView.render();
				
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