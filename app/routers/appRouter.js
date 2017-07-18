var passport = require('passport'),
    forgotPasswordController = require('../controllers/forgotPasswordController.js'),
    inviteTenantController = require('../controllers/inviteTenantController.js'),
    paymentController = require('../controllers/paymentController.js'),
    propertyMakeController = require('../controllers/propertyMakeController.js'),
    resetController = require('../controllers/resetController.js'),
    Model = require('../model/models.js'),
    signupController = require('../controllers/signupController.js'),
    handlebars = require('handlebars'),
    fs = require('fs');

module.exports = function(express) {
  var router = express.Router();

  var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error', 'You have to be logged in to access the page.');
    res.redirect('/');
  };

  // var isPropertyManager = function (req, res, next) {
  //   passport.authenticate('propertyManager'), function(req, res, next) {
  //     return next;
  //   }
  //   req.flash('error', 'You have to be logged in and/or a property manager to access the page.');
  //   res.redirect('/');
  // }

  // var isTenant = function (req, res, next) {
  //   passport.authenticate('tenant'), function(req, res, next) {
  //     return next;
  //   }
  //   req.flash('error', 'You have to be logged in and/or a tenant to access the page.');
  //   res.redirect('/');
  // }
  
  router.get('/signup', signupController.show);
  router.post('/signup', signupController.signup);

  router.get('/', function(req, res) {
    res.render('home');
  });

  router.post('/login',
    passport.authenticate(['propertyManager', 'tenant']),
      function(req, res) {
        if (req.user.userType == "propertyManager") {
          res.redirect('/dashboard');
        } else if (req.user.userType == "tenant") {
          res.redirect('tenantDashboard');
        }
        else {
          req.flash('error', 'You have to be logged in to access the page.');
          res.redirect('/');
        }
  });

  router.get('/forgot', function(req, res) {
    res.render('forgot', {
      user: req.user
    });
  });

  router.post('/forgot', forgotPasswordController.forgot);

  router.get('/reset/:token', resetController.find);

  router.post('/reset/:token', resetController.reset);

  router.get('/dashboard', isAuthenticated, function(req, res) {

      var data = {
        user: req.user.username,
        firstname: req.user.firstName,
        lastname: req.user.lastName,
        properties: req.user.properties,
        addresses: [],
        rents: [],
        mortgages: [],
        tenants: [],
        author: req.user.username,
        tags: ['express', 'node', 'javascript']
      };

      Model.Property.findAll({ where: { id: req.user.properties } }).then(function(properties) {
        data.properties = properties;
        console.log("PROPERTIES:" + properties);

        fs.readFile('views/dashboard.handlebars', 'utf-8', function(error, source){
        handlebars.registerHelper('load', function(title){
          var words = title.split(' ');
          for (var i = 0; i < words.length; i++) {
            if (words[i].length > 4) {
              words[i] = words[i][0].toUpperCase() + words[i].substr(1);
            }
          }
          title = words.join(' ');
          return new handlebars.SafeString(title);
        });

        var template = handlebars.compile(source);
        var html = template(data);


        res.send(html);
      });
        // for (var i in properties) {
        //   console.log(properties[i]);
        //   console.log(properties[i].owner);
        //   data.addresses.push(properties[i].streetNumber + " " + properties[i].street + ", " + properties[i].city + ", " + properties[i].state + ", " + properties[i].postalCode);
        //   data.rents.push(properties[i].bathrooms);
        //   data.mortgages.push(properties[i].bedrooms);
        //   data.tenants.push(properties[i].squareFootage);

        //   console.log(data.addresses);
        //   console.log(data.rents);
        //   console.log(data.tenants);
        // }
      });
  });



  router.get('/tenantDashboard', isAuthenticated, function(req, res) {
    res.render('tenantDashboard');
  });

  router.get('/test', function(req, res) {
    res.render('test');
  });

  router.get('/profitMargin', isAuthenticated, function(req, res) {
    res.render('profitMargin');
  });

  
  router.get('/request', isAuthenticated, function(req, res) {
    res.render('request');
  });
  router.get('/properties', isAuthenticated, propertyMakeController.show);
  router.post('/properties', isAuthenticated, propertyMakeController.createProperty);

  router.get('/invite', isAuthenticated, inviteTenantController.show);


  router.post('/invite', isAuthenticated, inviteTenantController.invite);
    
  // need new payment medium. not using stripe anymore
  router.get('/payment', isAuthenticated, paymentController.show);
  // router.post('/payment', isAuthenticated, paymentController.pay);

  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  return router;
};
