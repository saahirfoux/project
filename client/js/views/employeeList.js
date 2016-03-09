define(function(require) {

    var $ = require('jquery');
    var BaseView = require('./base');
    var ErrorHandler = require('../api/error');
    var EmployeeList = require('../collections/employees');

    return BaseView.extend({
        template: require('hbs!./employeeList'),
        viewID: 'employeeList',

        events: {
            'click button[name="addContact"]': 'addContactHandler',
            'click button[name="delete"]': 'deleteContactHandler',
            'click button[name="update"]': 'updateContactHandler',
            'click button[name="view"]': 'viewContactHandler'
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
                    return self.employeeList.toJSON()
                },
                hasNoContacts: function() {
                    return (self.employeeList.length === 0);
                }
            }
        },

        loadRequiredData: function() {
            var self = this;
            this.employeeList = new EmployeeList();
            this.employeeList.fetch({
                success: function(collection, response, options) {
                    self.setLoadedData(true);
                    self.render();
                },
                error: ErrorHandler.requestError
            });
        },

        addContactHandler: function() {
            window.location.href = '#contact/add';
        },

        deleteContactHandler: function(e) {
            var self = this;
            e.preventDefault();
            var id = $(e.target).attr('id');
            var model = this.employeeList.get(id);
            model.destroy({
                success: function() {
                    self.employeeList.remove(model);
                    self.render();
                },
                error: ErrorHandler.requestError
            })
        },

        updateContactHandler: function(e) {
            var self = this;
            e.preventDefault();
            window.location.href = '#contact/update/'+$(e.target).attr('id');
        },

        viewContactHandler: function(e) {
            e.preventDefault();
            window.location.href = '#contact/view/'+$(e.target).attr('id');
        }
    });
});