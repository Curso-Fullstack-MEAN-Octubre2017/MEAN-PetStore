const Customer = require('../models/customer.js');
const CustomersManager = require('../managers/customers-manager.js');
const Utils = require("../utils/utils.js");
const Validators = require("../public/app/validation/validators.js");

const successCallback = function(res) { return function(result) { res.json(result) }}
const failCallback = function(res){ return function(err) {
	console.error(err);
	res.sendStatus(500);//KO (TODO: elegir un codigo mas explicito)
}};

var api = require('express').Router();
module.exports = api;

/**
 * FindAll
 */
api.get('/customers', function(req, res, next) {
	var search = {};
	if(req.query.searchTerm) {
		var regexp = new RegExp(req.query.searchTerm, "i")
		search.$or = [{firstName: regexp}, {lastName: regexp}];
	}
	console.log("Search customers:", search);
	
//	var waitTill = new Date(new Date().getTime() + 1 /* seconds */ * 1000);
//	while(waitTill > new Date()){}
	
	CustomersManager.searchCustomers(search)
		.then(successCallback(res),failCallback(res));
});

/**
 * As LabelValue
 */
api.get('/customersAsList', function(req, res, next) {
	console.log("/customersList")
	Customer.find({}, {firstName: 0}, (err, customers) => {
		if (err) {
			console.error(err);
			res.sendStatus(500);//KO (TODO: elegir un codigo mas explicito)
		} else {
			res.json(Utils.asIdLabelList(customers, "fullNameSort"));
		}
	})
	.sort({'lastName' : -1});
});


/**
 * Get one
 */
api.get('/customers/:id', function(req, res) {
	CustomersManager.getCustomer(req.params.id)
		.then(successCallback(res),failCallback(res));
});

/**
 * Get Customer Pets
 */
api.get('/customers/:id/pets', function(req, res) {
	CustomersManager.getCustomerPets(req.params.id)
		.then(successCallback(res),failCallback(res));
});


/**
 * Insert
 */
api.post('/customers', (req, res, next) => {
	console.log("post /customers", req.body);
	const customer = req.body;
	const validationErrors = Validators.validateCustomer(customer);
	if(validationErrors) {
		return res.status(400).send(validationErrors);
	}
	
	CustomersManager.save(customer)
		.then(successCallback(res),failCallback(res));
});

/**
 * Update
 */
api.put('/customers/:id', (req, res, next) => {
	console.log("put /customers/" + req.params.id, req.body);
	const customer = req.body;
	const validationErrors = Validators.validateCustomer(customer);
	if(validationErrors) {
		return res.status(400).send(validationErrors);
	}
	
	CustomersManager.update(customer)
		.then(successCallback(res),failCallback(res));
});	

/**
 * 
 */
api.delete('/customers/:id', function(req, res, next) {
	console.log("delte /customers/" + req.params.id);
	CustomersManager.delete(req.params.id)
		.then(successCallback(res),failCallback(res));
});

