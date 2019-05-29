const axios = require ("axios");

module.exports = function(app) {
  // getMany endpoint - using simple GET HTTP request 
  app.get('/', function(req, res, next) {
    axios.get('https://next.json-generator.com/api/json/get/EkzBIUWNL')
    .then(response => {
      if (response.data) {
        res.render('product', {products:response.data});
      }
    })
    .catch(function () { res.render("product", { products: req.flash("error") }); })
  });

  // getSingle request - using simple GET HTTP request


}