const axios = require ("axios"); 

module.exports = function(app) {
  // getMany endpoint - using simple GET HTTP request 
  app.get('/', function(req, res, next) {
    axios.get('https://next.json-generator.com/api/json/get/EkzBIUWNL')
    .then(response => {
      if (response.data) { // make the price range default values be the default params for products rendered to start to accurately reflect the default state of filter bar
        var defaultData = [];
        for (i = 0; i < response.data.length; i++) {
          if (response.data[i].price >= 50 && response.data[i].price <= 200) { 
            defaultData.push(response.data[i]); 
          }
        }
        res.render('product', {products:defaultData});
      }
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });  
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
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });  
  });
  // weird thing w/ the above endpoint (even in Postman) is that MORE THAN ONE object is returned, although only ONE object
  // matches the param specified in the Request ... hence details[0] on the client side for now.

  // update products based on price range
  // getMany endpoint - using simple GET HTTP request 
  app.post('/', function(req, res, next) {
    axios.get('https://next.json-generator.com/api/json/get/EkzBIUWNL')
    .then(response => {
      if (response.data) {
        console.log("filter lower: ",req.body.new_lower_value);
        console.log("filter upper: ",req.body.new_upper_value);

        var filteredData = [];
        for (i = 0; i < response.data.length; i++) {
          if (response.data[i].price >= req.body.new_lower_value && response.data[i].price <= req.body.new_upper_value) { 
            filteredData.push(response.data[i]); 
          }
        }
        res.render('product', {products:filteredData});
      }
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });  
  });

  // update products rendered based on search regex
  // getMany endpoint - using simple GET HTTP request 
  app.post('/searchResults', function(req, res, next) {
    axios.get('https://next.json-generator.com/api/json/get/EkzBIUWNL')
    .then(response => {
      if (response.data) {
        console.log("filter lower: ",req.body.new_lower_value);
        console.log("filter upper: ",req.body.new_upper_value);

        var filteredData = [];
        for (i = 0; i < response.data.length; i++) {
          if (response.data[i].price >= req.body.new_lower_value && response.data[i].price <= req.body.new_upper_value) { 
            filteredData.push(response.data[i]); 
          }
        }
        res.render('product', {products:filteredData});
      }
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });  
  });
}