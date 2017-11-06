var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
bodyParser = require('body-parser');




app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());




app.listen(port);