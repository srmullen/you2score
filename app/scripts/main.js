require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        bootstrap: 'vendor/bootstrap',
        foundation: '../bower_components/foundation/js/foundation/foundation',
        topbar: '../bower_components/foundation/js/foundation/foundation.topbar',
        sticky: 'vendor/jquery.sticky',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        handlebars: '../bower_components/handlebars/handlebars',
        text: 'vendor/text',
        paper: '../bower_components/paper/dist/paper-full.min',

        // Application Specific
        base: 'base',
        svg: '../images/svg',

        config: "./config",
        
        score: 'score',
        sheet: 'sheet',
        staff: 'staff',
        line: 'line',
        measure: 'measure',
        beat: 'beat',
        note: 'note',
        tools: 'tools',
        engraver: 'engraver'

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
        }
    }
});

require(["app", 'jquery', 'handlebars', 'foundation', 'topbar', 'sticky'], function (App, $, Handlebars) {
    'use strict';

    var app = new App();

});