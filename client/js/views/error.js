define(function(require) {

    var BaseView = require('./base');

    return BaseView.extend({
        template: require('hbs!./error'),
        initialize: function() {
            this.loaded = true;
        }
    });
});