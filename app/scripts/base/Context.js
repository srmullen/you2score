define(["base/Layer", "tools/HighlightTool", "paper"], function (Layers, HighlightTool) {

	/**
	 * The Context is the base file for a canvas context.
	 */
	var Context = function (canvas) {

		this.childViews = [];

		this.canvas = canvas;

		paper.setup(canvas); // if for some reason paper is undefined, make sure it doesn't need to be rebuilt

		// create layers
		var scoreLayer = new paper.Layer();
		var sheetLayer = new paper.Layer();
		// are section layer and staves layer needed?
		var lineLayer = new paper.Layer();
		var measureLayer = new paper.Layer();		
		var beatLayer = new paper.Layer();
		var noteLayer = new paper.Layer();

		scoreLayer.name = 'score';
		sheetLayer.name = 'sheet';
		lineLayer.name = 'line';
		measureLayer.name = 'measure';
		beatLayer.name = 'beat';
		noteLayer.name = 'note';

		var layers = {
			score: scoreLayer,
			sheet: sheetLayer,
			line: lineLayer,
			measure: measureLayer,
			beat: beatLayer,
			note: noteLayer
		};

		this.highlighter = new HighlightTool();

		this.activateLayer = function (name) {
			paper.project.activeLayer = layers[name];
		}

		this.bringLayerToFront = function (name) {
			var tempLayers = [],
				topLayer;

			_.each(paper.project.layers, function (layer, key) {
				if (layer.name !== name) {
					tempLayers.push(layer);
				} else {
					topLayer = layer;
				}
			});

			tempLayers.push(topLayer);
			paper.project.layers = tempLayers;
		}

		this.addChildView = function (View, model) {

			var view = new View({el: this.canvas, model: model, context: this});

			this.childViews.push(view);

			return view;
		};
	}
	return Context;
});