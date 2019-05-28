'use strict';

// Require necessary npm packages
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// Setting up port 
let PORT = process.env.PORT || 8080;

// Creating express app by initializing an express server as a variable
const app = express();
var expressLayouts = require('express-ejs-layouts')

app.use(expressLayouts); 
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(bodyParser.json());
app.use('/public', express.static(process.cwd() + '/public'));

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.set('view options', {layout: '/views/layout.ejs'});

// Requiring our routes
require("./routes/index.js")(app);


// this will listen to and show all activities on our terminal to let us know what is happening in our app
app.listen(PORT, function() {
  console.log("Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});