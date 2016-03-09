define(function(require) {
    'use strict';

    var BaseModel = require('./base');

    return BaseModel.extend({
        url: function() {
            if (this.isNew()) {
                return '/api/contact'
            } else {
                return '/api/contact/'+ this.id;
            }
        },
        validation: {
            firstName: {
                required: true
            },
            lastName: {
                required: true
            },
            email: {
                required: true
            }
        }
    });
});