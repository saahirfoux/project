var express = require('express');
var security = require('../api/security');
var Employee = require('../models/employee');
var ErrorHandlers = require('../api/errors');

var collectionBase = '/api/contacts';
var individualBase = '/api/contact';

// all routes on this page will be checked for valid session
module.exports = function(app){

    app.get(collectionBase+'/', function(req, res){
        security.isAuthenticated(req, res, function(auth) {

            // grab the list of employees for the session employer
            Employee.find({
                employerId: req.headers['_id']
            }).exec(function(err, employees) {
                if (err) {
                    ErrorHandlers.DBConnection(res);
                } else {
                    res.json(employees);
                }
            });

        });
    });

    app.get(individualBase+'/:id', function(req, res){
        security.isAuthenticated(req, res, function(auth) {

            // grab the one employee
            Employee.findOne({
                _id: req.params.id
            }, function(err, model) {
                if (err) {
                    ErrorHandlers.DBConnection(res);
                } else if (!model) {
                    ErrorHandlers.InvalidData(res);
                } else {
                    res.json(model);
                }
            });

        });
    });

    app.post(individualBase+'/', function(req, res) {
        security.isAuthenticated(req, res, function(auth) {

            // create a new employee
            var employee = new Employee(req.body);
            employee.employerId = req.headers['_id'];
            employee.save(function(err) {
                if (err) {
                    ErrorHandlers.DBConnection(res);
                } else {
                    res.json({
                        message: 'success'
                    });
                }
            });

        });
    });

    app.put(individualBase+'/:id', function(req, res) {
        security.isAuthenticated(req, res, function(auth) {

            // update the employee
            Employee.findOne({
                _id: req.params.id
            }, function(err, model) {
                if (err) {
                    ErrorHandlers.DBConnection(res);
                } else if (!model) {
                    ErrorHandlers.InvalidData(res);
                } else {
                    model.set(req.body);
                    model.save(function(err) {
                        if (err) {
                            ErrorHandlers.DBConnection(res);
                        } else {
                            res.json({message: 'success'});
                        }
                    });
                }
            })

        });
    });

    app.delete(individualBase+'/:id', function(req, res) {
        security.isAuthenticated(req, res, function(auth) {

            // delete the employee
            Employee.findOneAndRemove({
                _id: req.params.id
            }, function(err, model) {
                if (err) {
                    ErrorHandlers.DBConnection(res);
                } else if (!model) {
                    ErrorHandlers.InvalidData(res);
                } else {
                    res.json({message: 'success'});
                }
            });

        });
    });
};