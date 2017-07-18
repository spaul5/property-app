var Model = require('../model/models.js'),
    nodemailer = require('nodemailer'),
    async = require('async');

module.exports.find = function(req, res) {
  // add after reseting the database: , 'resetPasswordExpires': { $gt: Date.now() } 
  Model.PropertyManager.findOne({ where: { 'resetPasswordToken': req.params.token}}).then(function(user) {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgot');
    }

    res.send('reset', {
      user: req.user
    });


  });
};

module.exports.reset = function(req, res) {
  async.waterfall([
    function(done) {
      // add after reseting the database: , 'resetPasswordExpires': { $gt: Date.now() } 
      Model.PropertyManager.findOne({where: { 'resetPasswordToken': req.params.token}}).then(function(user) {
        if (!user) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('/forgot');
        }

        if (password !== password2) {
          req.flash('error', "Please, enter the same password twice.");
          res.redirect('reset', {
            user: user
          });
        }

        if (!password || !password2) {
          req.flash('error', "Please, fill in yhr password fields.");
          res.redirect('reset', {
            user: user
          });
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        return done(null, user);
      });
    },
    function(user, done) {
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'xopxopxop6@gmail.com',
          pass: 'nj6GTlNZF46#0Ad3zACR'
        }
      });
      var mailOptions = {
        from: '"Patty" <patty@patty.com>',
        to: user.email,
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      transporter.sendMail(mailOptions, function(err) {
        req.flash('success', 'Success! Your password has been changed.');
        done(err);
      });
    }
  ], function(err) {
    res.redirect('/');
  });
};