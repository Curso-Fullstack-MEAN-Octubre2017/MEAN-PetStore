const Pet = require('../models/pet.js');
const Customer = require('../models/customer.js');

const PetsManager = require('../managers/pets-manager.js');
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
api.get('/pets', function(req, res, next) {
	var search = {};
	if(req.query.searchTerm) {
		var regexp = new RegExp(req.query.searchTerm, "i")
		search.$or = [{firstName: regexp}, {lastName: regexp}];
	}
	console.log("Search pets:", search);
	
	PetsManager.searchPets(search)
		.then(successCallback(res),failCallback(res));
});

/**
 * Get one
 */
api.get('/pets/:id', function(req, res) {
	PetsManager.getPet(req.params.id)
		.then(successCallback(res),failCallback(res));
});

/**
 * Insert
 */
api.post('/pets', (req, res, next) => {
	console.log("post /pets", req.body);
	const pet = req.body;
	const validationErrors = Validators.validatePet(pet);
	if(validationErrors) {
		return res.status(400).send(validationErrors);
	}
	
	PetsManager.save(pet)
		.then(successCallback(res),failCallback(res));
});

/**
 * Update
 */
api.put('/pets/:id', (req, res, next) => {
	console.log("put /pets/" + req.params.id, req.body);
	const pet = req.body;
	const validationErrors = Validators.validatePet(pet);
	if(validationErrors) {
		return res.status(400).send(validationErrors);
	}
	
	PetsManager.update(pet)
		.then(successCallback(res),failCallback(res));
});	

/**
 * Get one
 */
api.delete('/pets/:id', function(req, res, next) {
	console.log("delte /pets/" + req.params.id);
	PetsManager.delete(req.params.id)
		.then(successCallback(res),failCallback(res));
});
	
