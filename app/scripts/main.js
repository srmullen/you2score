require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        bootstrap: 'vendor/bootstrap',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        handlebars: '../bower_components/handlebars/handlebars',
        text: 'vendor/text',
        paper: '../bower_components/paper/dist/paper',

        // Application Specific
        base: 'base'
    },
    shim: {
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

require(["app", 'jquery', 'bootstrap'], function (App, $) {
    'use strict';

    var app = new App();
});