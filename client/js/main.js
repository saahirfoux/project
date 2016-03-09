require.config({
    paths: {
        'jquery': '../vendor/jquery/dist/jquery',
        'underscore': '../vendor/underscore/underscore',
        'backbone': '../vendor/backbone/backbone',
        'backbone.babysitter': '../vendor/backbone.babysitter/lib/backbone.babysitter',
        'backbone.validation': '../vendor/backbone.validation/src/backbone-validation',
        'backbone.wreqr': '../vendor/backbone.wreqr/lib/backbone.wreqr',
        'radio': '../vendor/backbone.radio/build/backbone.radio',
        'marionette': '../vendor/backbone.marionette/lib/core/backbone.marionette',
        'handlebars': '../vendor/handlebars/handlebars.amd.min',
        'hbs': '../vendor/require-handlebars-plugin/hbs'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            exports: 'Backbone',
            deps: ['jquery', 'underscore']
        },
        marionette: {
            exports: 'Backbone.Marionette',
            deps: ['backbone']
        },
        'backbone.validaton': {
            exports: 'Backbone.Validation',
            deps: ['backbone', 'jquery',' underscore']
        }
    },
    deps: ['jquery', 'underscore']
});

require(['appInstance'], function(app) {
    app.start();
});