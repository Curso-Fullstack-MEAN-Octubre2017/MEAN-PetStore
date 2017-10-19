'use strict';

var Appointment = require('../models/appointment');
var Pet = require('../models/pet');
var Customer = require('../models/customer');

var moment = require('moment');

var api = require('express').Router();

api.get('/appointments', function(req, res, next) {
	console.log("Search Appointment:");
	Appointment.find({}, (err, appointments) => {
		if (err) {
			console.error(err);
			res.sendStatus(500);//KO (TODO: elegir un codigo mas explicito)
		} else {
			res.json(appointments);
		}
	}).sort({'_id' : -1});
});

api.get('/appointments/:id',  function(req, res, next) {
	Appointment.findById(req.params.id, function(err, appointment) {
		if (err) {
			console.error(err);
			res.sendStatus(500);//KO (TODO: elegir un codigo mas explicito)
		} else {
			res.json(appointment);
		}
	});	
});

api.get('/appointments/:from/:to',  function(req, res, next) {

    var from = moment(req.params.from); //20171001
    var to = moment(req.params.to); //20171101
    console.log("/appointmens from: " + from.format()  + " to: " + to.format());

    var searchParams = {};
    searchParams['dateTimeStart'] = {$gte: from, $lt: to};
    Appointment.find(searchParams, (err, appointments) => {
		if (err) {
			console.error(err);
			return res.sendStatus(500);//KO (TODO: elegir un codigo mas explicito)
		}
		
        res.status(200).send(appointments);

    }).populate(
        {
            path: 'pet',
            model: 'Pet',
            select: 'name specie',
            populate: {
                path: 'owner',
                model: 'Customer',
                select: 'firstName lastName'
            }
        }
    ).sort({'dateTimeStart': 1})	
	
});

api.get('/appointmentsByDate/:from/:to',  function(req, res, next) {

    var from = moment(req.params.from); //20171001
    var to = moment(req.params.to); //20171101
    console.log("/appointmens from: " + from.format()  + " to: " + to.format());

    var searchParams = {};
    searchParams['dateTimeStart'] = {$gte: from, $lt: to};
    Appointment.find(searchParams, (err, appointments) => {
		if (err) {
			console.error(err);
			return res.sendStatus(500);//KO (TODO: elegir un codigo mas explicito)
		}
		
        var appointmentsByDate = appointments.reduce(function(appointmentsByDate, item){
            var date = moment(item.dateTimeStart).format('YYYY-MM-DD');
            var time = moment(item.dateTimeStart).format('hh:mm');
            if(appointmentsByDate[date] == undefined) {
            	appointmentsByDate[date] = {};
            }
            if(appointmentsByDate[date][time] == undefined) {
            	appointmentsByDate[date][time] = item;
            }
            
            return appointmentsByDate;
        }, {});
		
		
        res.status(200).send(appointmentsByDate);

    }).populate(
        {
            path: 'pet',
            model: 'Pet',
            select: 'name specie',
            populate: {
                path: 'owner',
                model: 'Customer',
                select: 'firstName lastName'
            }
        }
    ).sort({'dateTimeStart': 1})	
	
});


api.post('/appointments',  function(req, res, next) {});
api.put('/appointments/:id',  function(req, res, next) {});

module.exports = api;