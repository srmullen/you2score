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
        paper: '../bower_components/paper/dist/paper',

        // Application Specific
        base: 'base',
        svg: '../images/svg',

        score: 'score',
        sheet: 'sheet',
        staff: 'staff',
        line: 'line',
        measure: 'measure',
        beat: 'beat',
        note: 'note'

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

    // Handlebars helper to iterate over the models in a collection and 
    // use its attributes as the template context
    // FIXME: Should be in a handlebars helper file.
    // Handlebars.registerHelper("eachModel", function (context, options) {
    //     var ret = "", data;

    //     for (var i = 0, l = context.models.length; i < l; i++) {
    //         if (options.data) {
    //             data = Handlebars.createFrame(options.data || {});
    //             data.index = i; // inject private index variable
    //         }

    //         ret += options.fn(context.models[i].toJSON(), {data: data});
            
    //     }

    //     return ret;
    // });

    var app = new App();
});