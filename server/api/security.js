var Employer = require('../models/employer');
var ErrorHandlers = require('./errors');

// check for the existence of a request header matching a valid employer id
module.exports = {
    isAuthenticated: function(req, res, cb) {
        if (req.headers['_id']) {
            Employer.findOne({
                _id: req.headers['_id']
            }, function(err, employer) {
                if (err) {
                    ErrorHandlers.DBConnection(res);
                } else if (!employer) {
                    ErrorHandlers.InvalidData(res);
                } else {
                    cb(true);
                }
            });
        } else {
            ErrorHandlers.Unauthorized(res);
        }
    }
};