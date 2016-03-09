var express = require('express');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser')
var config = require('./server/configuration');

mongoose.connect(config.mongodbURI);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() {

    var seedUtility = require('./server/api/seed');
//    seedUtility.purgeEmployers();
    seedUtility.checkForEmployers();

    var app = express();
    app.use(express.static('client'));
    app.use(bodyParser.json());
    require('./server/routes')(app);
    app.listen(config.port);

    console.log('\n\n');
    console.log('Employee Contact Project');
    console.log('======================================');
    console.log('Connected to DB at...');
    console.log(config.mongodbURI);
    console.log('Navigate to...');
    console.log('http://localhost:'+config.port);

});


