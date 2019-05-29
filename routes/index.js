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

  // getSingle request - using simple POST HTTP request
  app.post('/product-detail',function(req,res,next) {
    axios.get('https://next.json-generator.com/api/json/get/EkzBIUWNL', {
      params: {
        _id: req.body.product_id
      }
    })
    .then(response => {
      if (response.data) {
        res.render('product-detail', {detail:response.data});
      }
    })
    .catch(function () { res.render("product-detail", { detail: req.flash("error") }); })
  });
}

// weird thing (even in Postman) is that MORE THAN ONE object is returned, although only ONE
// matches the param specified ... SO DUMB ... hence details[0] on the client side.