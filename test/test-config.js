require.config({
	paths: {
		mocha: "lib/mocha/mocha",
		chai: "lib/chai",
		expect: "lib/expect",
		// spy: "../app/bower_components/sinon/lib/sinon/spy",
		// sinon: "../app/bower_components/sinon/lib/sinon",
		sinonChai: "../app/bower_components/sinon-chai/lib/sinon-chai",

		jquery: '../app/bower_components/jquery/jquery',
        bootstrap: '../app/scripts/vendor/bootstrap',
        backbone: '../app/bower_components/backbone/backbone',
        underscore: '../app/bower_components/underscore/underscore',
        handlebars: '../bower_components/handlebars/handlebars',
        text: '../app/scripts/vendor/text',
        paper: '../app/bower_components/paper/dist/paper',

		base: "../app/scripts/base",
		scripts: "../app/scripts",
		svg: "../app/images/svg"
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
        // sinon: {
        // 	deps: ['spy'],
        // 	exports: 'sinon'
        // }
	}
});

require(["require", "mocha"], function (require) {

	mocha.setup('bdd');
	mocha.bail(false);

	require([
		// "spec/base/BaseModelSpec",
		// "spec/base/BaseCollectionSpec",
		"spec/models/ScoreModelSpec", 
		"spec/models/StaffModelSpec",
		"spec/collections/MeasureCollectionSpec",
		"spec/models/MeasureModelSpec",
		"spec/collections/NoteCollectionSpec",
		"spec/models/NoteModelSpec",
		"spec/helpers/RationalSpec"
		// "spec/helpers/NoteHelperSpec",
		// "spec/views/MeasureViewSpec" // needs and http server to run
	], function () {
		mocha.run();
	});
});