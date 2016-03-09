define( function( require ) {

    var Marionette = require('marionette'),
        Radio = require('radio'),
        EmployeeListView = require( 'views/employeeList'),
        ContactView = require('views/contact');

    var showViewChannel = Radio.channel('showView');

    return Marionette.Controller.extend( {

        listEmployees: function() {
            var employeeListView = new EmployeeListView();
            showViewChannel.trigger('show',employeeListView);
        },

        contact: function(action, id) {
            var contactView = new ContactView({
                action: action,
                id: id
            });
            showViewChannel.trigger('show',contactView);
        }

    } );

} );