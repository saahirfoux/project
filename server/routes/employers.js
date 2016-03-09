var express = require('express');
var Employer = require('../models/employer');
var ErrorHandlers = require('../api/errors');

var base = '/api/employers';

module.exports = function(app){

    app.get(base+'/', function(req, res){

        // grab the list of employers for the auth page
        Employer.find(function(err, employers) {
            if (err) {
                ErrorHandlers.DBConnection(res);
            } else {
                var retArray = [];
                employers.forEach(function(employer) {
                    retArray.push({
                        _id: employer._id,
                        name: employer.name
                    });
                });
                res.json(retArray);
            }
        });
    });

};