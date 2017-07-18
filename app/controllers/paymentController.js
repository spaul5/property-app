//const keyPublishable = process.env.STRIPE_PUBLISHABLE_KEY;
//const keySecret = process.env.STRIPE_SECRET_KEY;
const keySecret = "pk_test_6pRNASCoBOKtIshFeQd4XMUh"
const Stripe = require("stripe")(keySecret);

module.exports.show = function(req, res) {
	res.render('payment');
};

module.exports.pay = function(req, res) {
	// Set your Stripe publishable API key here
	// Stripe.setPublishableKey('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
	// var Stripe = Stripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

	$(function() {
	    var $form = $('#payment-form');
	    $form.submit(function(event){
	        // Disable the submit button to prevent repeated clicks:
	        $form.find('.submit').prop('disabled', true).html('Please wait...');
	    
	        // Request a token from Stripe:
	        Stripe.card.createToken($form, stripeResponseHandler);
	    
	        // Prevent the form from being submitted:
	        return false;
	    });
	          
	    // Format the card number
	    $('#number').payment('formatCardNumber');
	});

	function stripeResponseHandler(status, response){
	    var $form = $('#payment-form');
	          
	    // Clear any existing errors
	    $form.find('.has-error').removeClass('has-error')
	          
	    if (response.error){
	        // Show the errors on the form
	        $form.find('.payment-errors').text(response.error.message).addClass('alert alert-danger');
	        $form.find('#' + response.error.param).parents('.form-group').addClass('has-error');
	        $form.find('button').prop('disabled', false).text('Pay $20'); // Re-enable submission and change amount to db call
	    } else { // Token was created!
	            // Get the token ID:
	        var token = response.id;
	        
	        // Insert the token into the form so it gets submitted to the server:
	        $form.append($('<input type="hidden" name="stripeToken" />').val(token));
	        
	        // Submit the form:
	        $form.get(0).submit();
	    }
	}
};