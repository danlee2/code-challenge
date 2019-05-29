const axios = require ("axios"); // https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index

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
  // weird thing w/ the above endpoint (even in Postman) is that MORE THAN ONE object is returned, although only ONE object
  // matches the param specified in the Request ... hence details[0] on the client side for now.

  // update lower and upper price values and filter products accordingly
  // getMany endpoint - using simple GET HTTP request 
  app.post('/', function(req, res, next) {
    axios.get('https://next.json-generator.com/api/json/get/EkzBIUWNL')
    .then(response => {
      if (response.data) {
        var filteredData = [];
        for (i = 0; i < response.data.length; i++) {
          if (response.data[i].price <= req.body.new_upper_value 
            && response.data[i].price >= req.body.new_lower_value) {
              filteredData.append(response.data[i]);
            }
        }
        res.render('product', {products:filteredData});
      }
    })
    .catch(function () { res.render("product", { products: req.flash("error") }); })
  });

}