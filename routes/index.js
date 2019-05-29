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
        console.log("search regex: ",req.body.search_regex);

        var filteredData = [];
        for (i = 0; i < response.data.length; i++) {
          var str = response.data[i].name;
          var re = new RegExp(req.body.search_regex, 'g');
          if (str.match(re)) { 
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

  // update products rendered based on sort from EITHER dropdown
  // getMany endpoint - using simple GET HTTP request 
  app.post('/sortResults', function(req, res, next) {
    axios.get('https://next.json-generator.com/api/json/get/EkzBIUWNL')
    .then(response => {
      if (response.data) {
        console.log("selected option: ",req.body.submit_select);
        var select = req.body.submit_select;
        var filteredData = response.data;

        if (select == "Popularity") { 
          filteredData.sort(function(a,b) {
            if ((Boolean(a.isActive)-Boolean(b.isActive)) == 0) { return 0 } // do nothing
            else if ((Boolean(a.isActive)-Boolean(b.isActive)) == 1) { return -1 } // a comes first because it is more active than b
            else if ((Boolean(a.isActive)-Boolean(b.isActive)) == -1) { return 1 } // b comes first because it is more active than a
          });
        }
        else if (select == "Price: low to high") { filteredData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)); }
        else if (select == "Price: high to low") { filteredData.sort((a, b) => parseFloat(b.price) - parseFloat(a.price)); }
        else if (select == "$0.00 - $50.00") {
          filteredData = [];
          for (i = 0; i < response.data.length; i++) {
            if (response.data[i].price >= 0 && response.data[i].price <= 50) { 
              filteredData.push(response.data[i]); 
            }
          }  
        }
        else if (select == "$50.00 - $100.00") {
          filteredData = [];
          for (i = 0; i < response.data.length; i++) {
            if (response.data[i].price >= 50 && response.data[i].price <= 100) { 
              filteredData.push(response.data[i]); 
            }
          }  
        }
        else if (select == "$100.00 - $150.00") {
          filteredData = [];
          for (i = 0; i < response.data.length; i++) {
            if (response.data[i].price >= 100 && response.data[i].price <= 150) { 
              filteredData.push(response.data[i]); 
            }
          }  
        }
        else if (select == "$150.00 - $200.00") {
          filteredData = [];
          for (i = 0; i < response.data.length; i++) {
            if (response.data[i].price >= 150 && response.data[i].price <= 200) { 
              filteredData.push(response.data[i]); 
            }
          }
        }  
        else if (select == "$200.00+") {
          filteredData = [];
          for (i = 0; i < response.data.length; i++) {
            if (response.data[i].price >= 200) { 
              filteredData.push(response.data[i]); 
            }
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