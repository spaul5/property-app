var Model = require('../model/models.js'),
    validator = require('validator'),
    bcrypt = require('bcrypt-nodejs');

module.exports.show = function(req, res) {
  res.render('signup');
};

module.exports.signup = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var userType = req.body.userType;

  if (!username || !password || !password2 || !firstName || !lastName) {
    req.flash('error', "Please, fill in all the fields.");
    res.redirect('signup');
  }
  
  if (!validator.isAlpha(firstName)) {
    req.flash('error', "First Name should only have letters.");
    req.flash('error', "Please, enter a different First Name.");
    res.redirect('signup');
  }

  if (!validator.isAlpha(lastName)) {
    req.flash('error', "Last Name should only have letters.");
    req.flash('error', "Please, enter a different Last Name.");
    res.redirect('signup');
  }
  
  if (!validator.isEmail(email)) {
    req.flash('error', "Please, enter a valid E-Mail");
    res.redirect('signup');
  }

  if (password !== password2) {
    req.flash('error', "Please, enter the same password twice.");
    res.redirect('signup');
  }

  console.log("usertype: " + userType);
  if (userType === undefined) {
    req.flash('error', "Please, select a user type.");
    res.redirect('signup');
  }
  
  var salt = bcrypt.genSaltSync(10);
  var hashedPassword = bcrypt.hashSync(password, salt); // actual hashing

  // For safety reasons, user's password itself is not stored
  var user = {
    username: username,
    password: hashedPassword,
    firstName: firstName,
    lastName: lastName,
    email: email,
    salt: salt,
    userType: userType
  };

  if (userType == "propertyManager") {
    Model.PropertyManager.create(user).then(function() {
      res.redirect('/');
    }).catch(function(error) {
      req.flash('error', "Please, choose a different username.");
      res.redirect('/');
    });
  } else if (userType == "tenant") {
    Model.Tenant.create(user).then(function() {
      res.redirect('/');
    }).catch(function(error) {
      req.flash('error', "Please, choose a different username.");
      res.redirect('/');
    });
  }
};
