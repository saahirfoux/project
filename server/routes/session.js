var express = require('express');
var Employer = require('../models/employer');
var security = require('../api/security');
var ErrorHandlers = require('../api/errors');

var base = '/api/session';

module.exports = function(app){

    var sessionValidation = function(req, res) {

        // check that the session request is valid
        if (!req.body['_id'] || !req.body['password']) {
            ErrorHandlers.InvalidData(res);
        } else {
            var employerId = req.body['_id'];
            var password = req.body['password'];

            Employer.findOne({
                _id: employerId
            }, function(err, employer) {

                if (err) {
                    ErrorHandlers.DBConnection(res);
                } else if (!employer) {
                    // employer doesn't exist
                    ErrorHandlers.InvalidData(res);
                } else {
                    // check that they entered the right password
                    employer.validatePassword(password, function(err, valid) {
                        if (err) {
                            ErrorHandlers.SomethingWentHorriblyWrong(res);
                        } else if (!valid) {
                            ErrorHandlers.InvalidData(res);
                        } else {
                            res.json({
                                _id: employer._id
                            });
                        }
                    });
                }

            });
        }

    };
    app.put(base + '/', sessionValidation);
    app.post(base + '/', sessionValidation);
    app.get(base + '/', function(req, res) {
        security.isAuthenticated(req, res, function (auth) {

            // validate that the user has a session
            res.json({authenticated: true});

        });
    });
};