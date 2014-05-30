require.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery.min',
        bootstrap: 'vendor/bootstrap',
        foundation: '../bower_components/foundation/js/foundation/foundation',
        topbar: '../bower_components/foundation/js/foundation/foundation.topbar',
        sticky: 'vendor/jquery.sticky',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        handlebars: '../bower_components/handlebars/handlebars',
        text: 'vendor/text',
        paper: '../bower_components/paper/dist/paper-full.min',
        FontLoader: 'vendor/FontLoader',

        // Application Specific
        base: 'base',
        svg: '../images/svg',

        Config: "./Config",
        
        score: 'score',
        sheet: 'sheet',
        staff: 'staff',
        line: 'line',
        measure: 'measure',
        beat: 'beat',
        note: 'note',
        tools: 'tools',
        engraver: 'engraver',

        Scored: "Scored"

    },
    shim: {
        foundation: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        topbar: {
            deps:['foundation'],
            exports: 'foundation'
        },
        sticky: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        handlebars: {
            exports: "Handlebars"
        },
        paper: {
            exports: "paper"
        },
        FontLoader: {
            exports: "FontLoader"
        }
    }
});

require(["app", 'jquery', 'handlebars', 'FontLoader', 'foundation', 'topbar', 'sticky'], function (App, $, Handlebars, FontLoader) {
    'use strict';

    var fontLoader = new FontLoader(['gonville'], {
        fontLoaded: function (fontFamily) {
            var app = new App();
        }
    });
    fontLoader.loadFonts();
});






