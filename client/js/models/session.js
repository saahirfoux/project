define(function(require) {
    'use strict';

    var BaseModel = require('./base');

    return BaseModel.extend({
        url: '/api/session',
        validation: {
            _id: {
                required: true,
                msg: 'Employer is required'
            },
            password: {
                required: true
            }
        }
    });
});