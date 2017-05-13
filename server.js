var express = require('express');
var app = express();
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
var path = require('path');
var api = require('./app/routes/api')(router);
var port = process.env.PORT || 8080;


// The ORDER is important!!!!
app.use(morgan('dev'));
// create application/json parser
app.use(bodyParser.json());
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));
// serve public files to front-end, facilitates linking files in the html
app.use(express.static(__dirname + '/public'));
// Stop collusion between back-end and front-end
app.use('/api',api);



mongoose.connect('mongodb://localhost:27017/lynk', function (err) {
    if(err){
        console.log('Unable to connect to the database:'+ err);
        //throw err;
    } else{
        console.log('Connected to the database!' );
    }
});

// main layout for everything
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(port,function() {
    console.log('Running the server!');
});