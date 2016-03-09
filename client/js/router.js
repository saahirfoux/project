define(function(require){
    var Marionette = require('marionette');

    return Marionette.AppRouter.extend( {

        appRoutes: {

            '': 'listEmployees',
            'list': 'listEmployees',
            'contact/:action': 'contact',
            'contact/:action/:id': 'contact'

        }

    } );
});