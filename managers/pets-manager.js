const Pet = require('../models/pet');
const Utils = require("../utils/utils.js");
const Validators = require("../public/app/validation/validators.js");
const Q = require("q");

var PetsManager = {}

PetsManager.getPet = (id) => {
	var d = Q.defer();
	
	Pet.findById(id, function(err, pet) {
		if (err) {
			console.error(err);
			d.reject(err);
		} else {
			d.resolve(pet);
		}
	});
	
	return d.promise;
}

PetsManager.searchPets = (search) => {
	console.log("PetsManager.searchPets", search)
	var d = Q.defer();
	
	Pet.find(search, (err, pets) => {
		if (err) {
			console.error(err);
			d.reject(err);
		} else {
			d.resolve(pets);
		}
	}).sort({'_id' : -1});
	
	return d.promise;
}

PetsManager.save = (json) => {
	console.log("PetsManager.save", json);
	var d = Q.defer();
	
	const pet = new Pet(json);
	pet.save((err) => {
		if (err) {
			console.error(err);
			d.reject(err);
		} else {
			d.resolve(pet);
		}
	})	
	
	return d.promise;	
}

PetsManager.update = (json) => {
	var d = Q.defer();	
	
	Pet.findByIdAndUpdate(json._id, json, {new : true}, function(err, pet) {
		console.log("Updated Pet:", pet);
		if (err) {
			console.error(err);
			d.reject(err);
		} else {
			d.resolve(pet);
		}
	});	
	
	return d.promise;
}

PetsManager.delete = (id) => {
	var d = Q.defer();	
	
	Pet.findByIdAndRemove(id, function(err, pet) {
		if (err) {
			console.error(err);
			d.reject(err);
		} else {
			d.resolve(0);
		}
	});	
	
	return d.promise;
}


module.exports = PetsManager;