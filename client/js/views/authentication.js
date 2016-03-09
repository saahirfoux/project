define(function(require) {

    var $ = require('jquery'),
        Backbone = require('backbone'),
        BaseView = require('./base'),
        EmployerList = require('../collections/employers'),
        SessionModel = require('../models/session');

    return BaseView.extend({
        template: require('hbs!./authentication'),
        viewID: 'authentication',

        events: {
            'submit form': 'submitHandler',
            'click button[name="submit"]': 'submitHandler'
        },

        initialize: function() {
            this.model = new SessionModel();
            Backbone.Validation.bind(this);
        },

        onRender: function() {
            if (!this.hasLoadedData()) {
                this.loadRequiredData();
            }
        },

        templateHelpers: function() {
            var self = this;
            return {
                list: function() {
                    return self.employerList.toJSON()
                },
                hasNoEmployers: function() {
                    return (self.employerList.length === 0);
                }
            }
        },

        loadRequiredData: function() {
            var self = this;
            this.employerList = new EmployerList();
            this.employerList.fetch({
                success: function(collection, response, options) {
                    self.setLoadedData(true);
                    self.render();
                }
            })
        },

        submitHandler: function(e) {
            var self = this;

            e.preventDefault();

            if (this.model.isValid(true)) {
                this.model.save(null, {
                    success: function(model, response, options) {
                        $.ajaxPrefilter(function(options) {
                            var beforeSend = options.beforeSend;
                            options.beforeSend = function(xhr) {
                                xhr.setRequestHeader('_id', response._id);
                            };
                            if (beforeSend) {
                                beforeSend.apply(this, arguments);
                            }
                        });
                        Backbone.history.loadUrl(Backbone.history.getFragment());
                    },
                    error: function(model, response, options) {
                        self.displayError(response.responseJSON.error);
                    }
                })
            }
        }
    });
});