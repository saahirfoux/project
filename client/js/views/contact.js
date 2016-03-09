define(function(require) {
    var BaseView = require('./base');
    var ErrorHandler = require('../api/error'),
        ContactModel = require('../models/contact'),
        SessionModel = require('../models/session');

    return BaseView.extend({
        template: require('hbs!./contact'),
        viewTemplate: require('hbs!./contact-read'),
        viewID: 'contact',

        events: {
            'submit form': 'submitHandler',
            'click button[name="submit"]': 'submitHandler',
            'click button[name="cancel"]': 'cancelHandler'
        },

        initialize: function(options) {
            this.action = options.action;
            this.id = options.id;
            this.model = new ContactModel();
            if (this.action === 'view') {
                this.template = this.viewTemplate;
            }
        },

        onRender: function() {
            if (!this.hasLoadedData()) {
                this.loadRequiredData();
            } else {
                Backbone.Validation.bind(this);
            }
        },

        loadRequiredData: function() {
            var self = this,
                loadSuccess = function() {
                    self.setLoadedData(true);
                    self.render();
                };

            if (this.action !== 'add') {
                this.model = new ContactModel({
                    '_id': this.id
                });
                this.model.fetch({
                    success: loadSuccess,
                    error: ErrorHandler.requestError
                });
            } else {
                var sessionModel = new SessionModel();
                sessionModel.fetch({
                    success: loadSuccess,
                    error: ErrorHandler.requestError
                });
            }
        },

        submitHandler: function(e) {
            var self = this;

            e.preventDefault();

            if (this.model.isValid(true)) {
                this.model.save({}, {
                    success: function() {
                        window.location.href = '#';
                    },
                    error: ErrorHandler.requestError
                });
            }
        },

        cancelHandler: function() {
            window.location.href = '#';
        }
    });
});