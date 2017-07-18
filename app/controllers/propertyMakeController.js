var Model = require('../model/models.js'),
	validator = require('validator');
//	addressValidator = require('address-validator'),
//    Address = addressValidator.Address,
//    _= require('underscore');

module.exports.show = function(req, res) {
	res.render('properties');
};

module.exports.createProperty = function(req, res) {

	var street = req.body.street;
	var zipcode = req.body.zipcode;
	var city = req.body.city;
	var state = req.body.state;
	var country = req.body.country;
	var zipcode = req.body.zipcode;
	var bedrooms = req.body.bedrooms;
	var bathrooms = req.body.bathrooms;
	var parking = req.body.parking;
	var squareFootage = req.body.squareFootage;
	var rent = req.body.rent;
	var mortgage = req.body.mortgage;
	var tenantOccupancy = req.body.tenantOccupancy;

	if (!validator.isNumeric(zipcode)) {
		req.flash('error', "Please, enter a valid zipcode.");
		res.redirect('properties');
	}

	if (!validator.isNumeric(bedrooms) || !validator.isInt(bedrooms, {min:0, max:15})) {
		req.flash('error', "Please, enter a valid number of bedrooms.");
		res.redirect('properties');
	}

	if (!validator.isNumeric(bathrooms) || !validator.isInt(bathrooms, {min:0, max:15})) {
		req.flash('error', "Please, enter a valid number of bathrooms.");
		res.redirect('properties');
	}

	if (!validator.isNumeric(parking)) {
		req.flash('error', "Please, enter a valid number of parking units.");
		res.redirect('properties');
	}

	if (!validator.isNumeric(squareFootage)) {
		req.flash('error', "Please, enter a valid square footage.");
		res.redirect('properties');
	}

	var newAddress = {
		owner: req.user.username,
        street: street,
        city: city,
        state: state,
        country: country,
        zipcode: zipcode,
		bedrooms: bedrooms,
        bathrooms: bathrooms,
        parking: parking,
        squareFootage: squareFootage,
        rent: rent,
        mortgage: mortgage,
        fullAdress: street + ", " + city + ", " + state + ", " + zipcode,
        tenantOccupancy: tenantOccupancy
    };

    Model.Property.create(newAddress).then(function(property) {
        var temp = [];
        if (req.user.properties !== null) {
            temp = req.user.properties;
        }
        temp.push(property.id);
		req.user.updateAttributes({properties: temp});
		res.redirect('/dashboard');
	}).catch(function(error) {
		req.flash('error', "Please enter the information again.");
		res.redirect('/properties');
	});



	/*
	var testAddress = new Address({
		street: street,
		city: city,
		state: state,
		country: country
	});

    var newAddress;
    var first;
// addressValidator.match.streetAddress` -> tells the validator that you think the input should be a street address. This data makes the validator more accurate.  
	
	// addressValidator not working
	
	addressValidator.validate(testAddress, addressValidator.match.streetAddress, function(err, exact, inexact) {
       	console.log('input: ', testAddress.toString())
    	console.log('match: ', _.map(exact, function(a) {
      		return a.toString();
    	}));
    	console.log('did you mean: ', _.map(inexact, function(a) {
      		return a.toString();
    	}));

        first = exact[0];
        if (first === null) {
			req.flash('error', "Please enter a valid address.");
			res.redirect('properties');
        }
        console.log(first);
   		console.log(inexact[0]);
        console.log(first.streetNumber);

        newAddress = {
			owner: req.user.username,
            street: first.streetNumber + " " + first.street,
            city: first.city,
            state: first.state,
            country: first.countryAbbr,
            zipcode: first.postalCode,
            latitude: first.location.lat,
            longitude: first.location.lon,
			bedrooms: bedrooms,
            bathrooms: bathrooms,
            parking: parking,
            squareFootage: squareFootage,
            rent: rent,
            mortgage: mortgage,
            fullAdress: first.streetNumber + " " + first.street + ", " + first.city + ", " + first.state + ", " + first.postalCode,
            tenantOccupancy: tenantOccupancy
        };

        Model.Property.create(newAddress).then(function(property) {
            var temp = [];
            if (req.user.properties !== null) {
                temp = req.user.properties;
            }
            temp.push(property.id);
			req.user.updateAttributes({properties: temp});
			res.redirect('/dashboard');
		}).catch(function(error) {
			req.flash('error', "Please enter the information again.");
			res.redirect('/properties');
		});


	});
*/

};