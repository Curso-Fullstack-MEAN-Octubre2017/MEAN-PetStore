const Customer = require('../models/customer.js');
const Pet = require('../models/pet.js');
const Utils = require("../utils/utils.js");
const Validators = require("../public/app/validation/validators.js");
const Q = require("q");

var CustomersManager = {}

CustomersManager.getCustomer = (id) => {
	var d = Q.defer();
	
	Customer.findById(id, function(err, customer) {
		if (err) {
			console.error(err);
			d.reject(err);
		} else {
			d.resolve(customer);
		}
	});
	
	return d.promise;
}

CustomersManager.getCustomerPets = (id) => {
	var d = Q.defer();
	
	Pet.find({owner: id}, function(err, pets) {
		if (err) {
			console.error(err);
			d.reject(err);
		} else {
			d.resolve(pets);
		}
	});
	
	return d.promise;
}

CustomersManager.searchCustomers = (search) => {
	console.log("CustomersManager.searchCustomers", search)
	var d = Q.defer();
	
	Customer.find(search, (err, customers) => {
		if (err) {
			console.error(err);
			d.reject(err);
		} else {
			d.resolve(customers);
		}
	}).sort({'_id' : -1});
	
	return d.promise;
}

CustomersManager.save = (json) => {
	console.log("CustomersManager.save", json);
	var d = Q.defer();
	
	const customer = new Customer(json);
	customer.save((err) => {
		if (err) {
			console.error(err);
			d.reject(err);
		} else {
			d.resolve(customer);
		}
	})	
	
	return d.promise;	
}

CustomersManager.update = (json) => {
	var d = Q.defer();	
	
	var v = json.__v;
	json.__v++;
	
	Customer.findOneAndUpdate(
			{_id: json._id, __v: v}, // find current version
			json, // update
			{new : true}, // return inserted version
	function(err, customer) {
		console.log("Updated Customer:", customer);
		if (err) {
			console.error(err);
			d.reject(err);
		} else {
			d.resolve(customer);
		}
	});	
	
	return d.promise;
}

CustomersManager.delete = (id) => {
	var d = Q.defer();	
	
	Customer.findByIdAndRemove(id, function(err, customer) {
		if (err) {
			console.error(err);
			d.reject(err);
		} else {
			d.resolve(0);
		}
	});	
	
	return d.promise;
}


module.exports = CustomersManager;