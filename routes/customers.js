const Customer = require('../models/customer');
const Utils = require("../utils/utils.js");
const Validators = require("../public/app/validation/validators.js");

module.exports = (router) => {

	/**
	 * FindAll
	 */
	router.get('/customers', function(req, res, next) {
		var search = {};
		if(req.query.searchTerm) {
			var regexp = new RegExp(req.query.searchTerm, "i")
			search.$or = [{firstName: regexp}, {lastName: regexp}];
		}
		console.log("Search customers:", search);
		Customer.find(search, (err, customers) => {
			if (err) {
				console.error(err);
				res.sendStatus(500);//KO (TODO: elegir un codigo mas explicito)
			} else {
				res.json(customers);
			}
		}).sort({'_id' : -1});
	});
	
	/**
	 * As LabelValue
	 */
	router.get('/customersAsList', function(req, res, next) {
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
	router.route('/customers/:id').get(function(req, res) {
		Customer.findById(req.params.id, function(err, customer) {
			if (err) {
				console.error(err);
				res.sendStatus(500);//KO (TODO: elegir un codigo mas explicito)
			} else {
				res.json(customer);
			}
		});
	});

	/**
	 * Insert
	 */
	router.post('/customers', (req, res, next) => {
		const customer = new Customer(req.body);
		const validationErrors = Validators.validateCustomer(customer);
		if(validationErrors) {
			return res.status(400).send(validationErrors);
		}
		customer.save((err) => {
			if (err) {
				console.error(err);
				res.sendStatus(500);//KO (TODO: elegir un codigo mas explicito)
			} else {
				res.json(customer);
			}
		})
	});
	
	/**
	 * Update
	 */
	router.put('/customers/:id', (req, res, next) => {
		Customer.findOne({_id : req.params.id }, function(err, customer) {
			if (err) {
				return res.send(err);
			}

			// rellenamos los datos que vienen en la peticion
			for(prop in req.body){
				customer[prop] = req.body[prop];
			}
			
			const validationErrors = Validators.validateCustomer(customer);
			if(validationErrors) {
				return res.status(400).send(validationErrors);
			}

			// save
			customer.save(function(err) {
				if (err) {
					console.error(err);
					res.sendStatus(500);//KO (TODO: elegir un codigo mas explicito)
				} else {
					res.json(customer);
				}
			});
		});
	});	
	
	/**
	 * Get one
	 */
	router.route('/customers/:id').delete(function(req, res) {
		console.log("/customers/" + req.params.id);
		Customer.findByIdAndRemove(req.params.id, function(err, customer) {
			if (err) {
				console.error(err);
				res.sendStatus(500);//KO (TODO: elegir un codigo mas explicito)
			} else {
				res.sendStatus(200);//OK
			}
		});
	});
	
	return router;
}
