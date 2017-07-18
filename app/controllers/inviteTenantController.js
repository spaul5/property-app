var Model = require('../model/models.js'),
    validator = require('validator'),
    nodemailer = require('nodemailer'),
    handlebars = require('handlebars');

module.exports.show = function(req, res) {
  res.render('invite');
};

module.exports.invite = function(req, res) {
  var email = req.body.email;

  console.log(req.user.username);
  if (!validator.isEmail(email)) {
    req.flash('error', "Please, enter a valid E-Mail");
    res.redirect('invite');
  }

  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'xopxopxop6@gmail.com',
          pass: 'nj6GTlNZF46#0Ad3zACR'
      }
  });

  // setup email data with unicode symbols
  var mailOptions = {
      from: '"Paddy" <paddy@paddy.com>', // sender address
      to: email, // list of receivers
      subject: 'Paddy: Your Landlord Invited You.', // Subject line
      html: '<p>Welcome to Paddy, <br><br> You have been invited by your landlord ' + req.user.firstName + ' ' + req.user.lastName + ' to join Paddy. Please sign up with the following link <a href="http://localhost:5000/signup/">Here</a></p>' // add an appropriate link
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
          req.flash('error', "Please, enter a valid E-Mail");
          res.redirect('dashboard');
          return console.log(error);
      }
      res.redirect('dashboard');
      console.log('Message %s sent: %s', info.messageId, info.response);
  });
};
