'use strict';

// Requiring necessary npm packages
var express = require("express");

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;

// Creating express app and configuring middleware needed for authentication
var app = express();

// set the view engine

// require our routes

// this will listen to and show all activities on our terminal to let us know what is happening in our app
app.listen(PORT, function() {
  console.log("Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});