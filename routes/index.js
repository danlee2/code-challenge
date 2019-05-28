const axios = require ("axios");
axios({
  url: 'https://next.json-generator.com/api/json/get/EkzBIUWNL',
  method: 'get'
})

module.exports = function(app) {
  app.get("/", function(req, res, next) {
    res.render("product");
  });


  // getMany endpoint - using simple GET HTTP request 


  // getSingle request - using simple GET HTTP request


}