define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        Marionette = require('marionette'),
        _ = require('underscore'),
        $ = require('jquery');

    return Marionette.ItemView.extend({
        loadingTemplate: require('hbs!./loading'),

        undelegateEvents: function() {
            Marionette.ItemView.prototype.undelegateEvents.apply(this, arguments);
            this.stopListening(this, 'render', this.enableViewBinding);
        },

        getTemplate: function() {
            if (this.hasLoadedData()) {
                return this.template;
            } else {
                return this.loadingTemplate;
            }
        },

        hasLoadedData: function() {
            if (this.hasOwnProperty('loaded') === false) {
                return false;
            } else {
                return this.loaded;
            }
        },

        setLoadedData: function(val) {
            this.loaded = val;
            if (val === true) {
                this.listenTo(this, 'render', this.handleViewBinding);
            }
        },

        handleViewBinding: function() {
            var self = this;
            if (!this.model) {
                this.model = new Backbone.Model();
            }

            // set initial values
            this.copyAttributesToViewElements(this.model.attributes);

            // listen to model
            this.listenTo(this.model, 'change', function(model) {
                this.copyAttributesToViewElements(model.changedAttributes());
            });

            // listen to view elements
            this.$el.on('input change', '[data-bind]', function(e) {
                e.stopPropagation();
                self.model.set($(e.target).attr('name'), $(e.target).val(), {
                    silent: true
                });
            })
        },

        copyAttributesToViewElements: function(attributes) {
            var boundElements = this.$('[data-bind]');
            _.each(attributes, function(value, key) {
                var inputs = boundElements.filter('[name="' + key + '"]');
                inputs.each(function() {
                    $(this).val(value);
                });
            });
        },

        displayError: function(message) {
            this.$('hr').after('<div class="alert alert-danger alert-dismissible" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+message+'</div>');
        }

    });
});