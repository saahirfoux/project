define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        ContactModel = require('../models/contact');

    return Backbone.Collection.extend({
        url: '/api/contacts',
        model: ContactModel
    });

});