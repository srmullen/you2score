require.config({
	paths: {
		mocha: "lib/mocha/mocha",
		chai: "lib/chai",
		expect: "lib/expect",

		jquery: '../app/bower_components/jquery/jquery',
        bootstrap: '../app/scripts/vendor/bootstrap',
        backbone: '../app/bower_components/backbone/backbone',
        underscore: '../app/bower_components/underscore/underscore',

		base: "../app/scripts/base",
		scripts: "../app/scripts"
	},
	shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        }
	}
});

require(["require", "mocha"], function (require) {

	mocha.setup('bdd');
	mocha.bail(false)

	require([
		"spec/base/BaseModelSpec",
		"spec/base/BaseCollectionSpec",
		"spec/models/ScoreModelSpec", 
		"spec/models/StaffModelSpec",
		"spec/collections/MeasureCollectionSpec",
		"spec/models/MeasureModelSpec",
		"spec/collections/NoteCollectionSpec",
		"spec/models/NoteModelSpec",
		"spec/factories/NoteModelFactorySpec"
	], function () {
		mocha.run();
	});
});