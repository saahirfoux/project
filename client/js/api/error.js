define(function(require) {
    var Marionette = require('marionette');
    var Radio = require('radio');
    var AuthenticationView = require('../views/authentication');
    var ErrorView = require('../views/error');

    var showViewChannel = Radio.channel('showView');

    var ErrorHandlers = Marionette.Object.extend({
        requestError: function(collection, response, options) {
            if (response.status === 401) {
                var authenticationView = new AuthenticationView();
                showViewChannel.trigger('show',authenticationView);
            }
            if (response.status === 400) {
                var errorView = new ErrorView();
                showViewChannel.trigger('show',errorView);
            }
        }
    });

    return new ErrorHandlers();
});