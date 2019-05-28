'use strict';

// Require necessary npm packages
var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');

// Setting up port 
var PORT = process.env.PORT || 8080;
var jsonURL = "https://next.json-generator.com/api/json/get/EkzBIUWNL";

// Creating express app by initializing an express server as a variable
var app = express();

app.use(expressLayouts); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static(process.cwd() + '/public'));

// set the view engine to ejs
app.set('view engine', 'ejs');

// Requiring our routes
require("./routes/index.js")(app);

// this will listen to and show all activities on our terminal to let us know what is happening in our app
app.listen(PORT, function() {
  console.log("Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});
