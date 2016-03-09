define(function(require) {
    'use strict';

    var Backbone = require('backbone');

    var EmployerModel = Backbone.Model.extend({
        idAttribute: '_id'
    });

    return Backbone.Collection.extend({
        url: '/api/employers',
        model: EmployerModel
    });

});