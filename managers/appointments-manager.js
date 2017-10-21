const Appointment = require('../models/appointment');
const Utils = require("../utils/utils.js");
const Validators = require("../public/app/validation/validators.js");
const Q = require("q");

var AppointmentsManager = {}

AppointmentsManager.getAppointment = (id) => {
	var d = Q.defer();
	
	Appointment.findById(id, function(err, appointment) {
		if (err) {
			console.error(err);
			d.reject(err);
		} else {
			d.resolve(appointment);
		}
	});
	
	return d.promise;
}

AppointmentsManager.searchAppointments = (search) => {
	console.log("AppointmentsManager.searchAppointments", search)
	var d = Q.defer();
	
    Appointment.find(searchParams, (err, appointments) => {
		if (err) {
			console.error(err);
			d.reject(err);
		} else {
			d.resolve(appointments);
		}
    }
    ).populate(
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
	
	return d.promise;
}

AppointmentsManager.getAppointmentsByDate = (startDate, endDate) => {
	console.log("AppointmentsManager.getAppointmentsByDate", startDate, endDate)
	var d = Q.defer();
	
    var searchParams = {};
    searchParams['dateTimeStart'] = {$gte: startDate, $lt: startDate};
    searchParams['status'] = {$gte: 0}
    
    Appointment.find(searchParams, (err, appointments) => {
		if (err) {
			console.error(err);
			d.reject(err);
		} else {
			// construir un mapa[fecha][hora]->apointment
	        var appointmentsByDate = appointments.reduce(function(appointmentsByDate, item){
	            var date = moment(item.dateTimeStart).format('YYYYMMDD');
	            var time = moment(item.dateTimeStart).format('hh:mm');
	            if(appointmentsByDate[date] == undefined) {
	            	appointmentsByDate[date] = {};
	            }
	            if(appointmentsByDate[date][time] == undefined) {
	            	appointmentsByDate[date][time] = item;
	            }
	            
	            return appointmentsByDate;
	        }, {});
	        
			d.resolve(appointmentsByDate);
		}
    }
    ).populate(
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
	
	return d.promise;
}

AppointmentsManager.save = (json) => {
	console.log("AppointmentsManager.save", json);
	var d = Q.defer();
	
	const appointment = new Appointment(json);
	appointment.save((err) => {
		if (err) {
			console.error(err);
			d.reject(err);
		} else {
			d.resolve(appointment);
		}
	})	
	
	return d.promise;	
}

AppointmentsManager.update = (json) => {
	var d = Q.defer();	
	
	Appointment.findByIdAndUpdate(json._id, json, {new : true}, function(err, appointment) {
		console.log("Updated Appointment:", appointment);
		if (err) {
			console.error(err);
			d.reject(err);
		} else {
			d.resolve(appointment);
		}
	});	
	
	return d.promise;
}

AppointmentsManager.delete = (id) => {
	var d = Q.defer();	
	
	Appointment.findByIdAndRemove(id, function(err, appointment) {
		if (err) {
			console.error(err);
			d.reject(err);
		} else {
			d.resolve(0);
		}
	});	
	
	return d.promise;
}


module.exports = AppointmentsManager;