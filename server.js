'use strict';

// Require necessary npm packages
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");

// Setting up port 
var PORT = process.env.PORT || 8080;

// Creating express app by initializing an express server as a variable
var app = express();

// require our routes

// this will listen to and show all activities on our terminal to let us know what is happening in our app
app.listen(PORT, function() {
  console.log("Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});

var url = "https://next.json-generator.com/api/json/get/EkzBIUWNL";

// getMany endpoint - using simple GET HTTP request

// getSingle request - using simple GET HTTP request