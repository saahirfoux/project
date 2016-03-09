define(function(require) {
    'use strict';

    var Backbone = require('backbone');
    var Marionette = require('marionette');
    var Radio = require('radio');
    var _ = require('underscore');

    var Router = require('router');
    var Controller = require('controller');

    var showViewChannel = Radio.channel('showView');
    var navigateChannel = Radio.channel('navigate');

    return Marionette.Application.extend({

        regions: {
            main: '#main-region'
        },

        initialize: function() {
            this.listenTo(showViewChannel, 'show', this.showView);
            this.listenTo(navigateChannel, 'navigate', this.navigateTo);
        },

        onStart: function() {
            this.Router = new Router( { controller: new Controller() } );
            Backbone.history.start();
        },

        showView: function(view) {
            this.main.show(view);
        },

        navigateTo: function(route) {
            this.Router.navigate(route);
        }
    });
});