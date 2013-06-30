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
        base: 'base',
        svg: '../images/svg'
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

require(["app", 'jquery', 'handlebars', 'bootstrap'], function (App, $, Handlebars) {
    'use strict';

    // Handlebars helper to iterate over the models in a collection and 
    // use its attributes as the template context
    // FIXME: Should be in a handlebars helper file.
    Handlebars.registerHelper("eachModel", function (context, options) {
        var ret = "";

        for (var i = 0, l = context.models.length; i < l; i++) {
            ret += options.fn(context.models[i].toJSON());
        }

        return ret;
    });

    var app = new App();
});