var mongoose = require('mongoose');

var EmployeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    addr1: String,
    addr2: String,
    city: String,
    state: String,
    zip: String,
    employerId: String
});

module.exports = mongoose.model('Employee', EmployeeSchema);