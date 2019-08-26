var express = require('express');
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.sendFile(__dirname+'/index.html'); 
});
 
app.post('/submit-student-data', function (req, res) {
    var sId = req.body.sId ;
 
    res.send(sId + ' Submitted Successfully!');
});
 
var server = app.listen(3001, function () {
    console.log('Node server is running..');
});