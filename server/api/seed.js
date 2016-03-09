var Employer = require('../models/employer');
var seedData = require('../data/employerSeed');


module.exports = {
    purgeEmployers: function() {
        Employer.remove({}, function(err) {
            if (err) {
                // handle error
            }
        });
    },
    checkForEmployers: function() {
        Employer.find(function(err, employers) {
            if (err) {
                // not sure
            }
            if (employers.length === 0) {
                seedData.forEach(function(employerSeed) {
                    var employer = new Employer(employerSeed);
                    employer.save(function(err) {
                        if (err) {
                            console.log('employer save error');
                        }
                        console.log('saved',employer.name);
                    });
                });
            }
        });
    }
};