define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        _ = require('underscore'),
        Validation = require('backbone.validation');

    // validation extensions copied from 'thedersen' at http://jsfiddle.net/thedersen/udXL5/
    _.extend(Backbone.Validation.callbacks, {
        valid: function (view, attr, selector) {
            var $el = view.$('[name=' + attr + ']'),
                $group = $el.closest('.form-group');

            $group.removeClass('has-error');
            $group.find('.help-block').html('').addClass('hidden');
        },
        invalid: function (view, attr, error, selector) {
            var $el = view.$('[name=' + attr + ']'),
                $group = $el.closest('.form-group');

            $group.addClass('has-error');
            $group.find('.help-block').html(error).removeClass('hidden');
        }
    });

    return Backbone.Model.extend({
        idAttribute: '_id'
    });
});