var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var EmployerSchema = new mongoose.Schema({
    name: String,
    password: String
});

// encrypt the employer's password
EmployerSchema.pre('save', function(next) {
    var employer = this;
    bcrypt.hash(employer.password, 10, function(err, hash) {
        employer.password = hash;
        next();
    });
});

// validate the entered password against the encrypted one from the DB
EmployerSchema.methods.validatePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('Employer',EmployerSchema);