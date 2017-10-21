'use strict';


// SCRIPT PARA RELLENAR 300 DIAS LABORABLES DE CITAS  PARA PROBAR CALENDARIO//
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/petStore', { useMongoClient: true });

const Pet = require('../models/pet');
const Customer = require('../models/customer');
const Appointment = require('../models/appointment');

const moment = require('moment');

var AppointmentsTime = 30;

var startdate = moment.utc().startOf('isoweek').set({hour: 9, minute: 0});
var enddate = moment().utc().startOf('isoweek').set({hour: 9, minute: AppointmentsTime});

console.log("Inicio fecha: " + startdate.format());
console.log('final fecha:' + enddate.format());

for (var j = 0; j <= 200; j++) {
    for (var i = 0; i <= 24; i++) {

        var statusRandom = Math.random() < 0.5 ? -1 : 1;

        var sampleAppointment = {
                "dateTimeStart": startdate,
                "dateTimeEnd": enddate,
                "pet": '59d9ac38ff5ce22d570c3aff',
                "vetId": null,
                "status": statusRandom
            };
        startdate = moment(startdate).add(AppointmentsTime, 'minutes');
        enddate = moment(enddate).add(AppointmentsTime, 'minutes');

        //con isoweek compruebo que el dia actual no sea ni sabado ni domingo
        if (moment(enddate).isoWeekday() < 6) {
            saveAppointment();
        }
    }
    startdate = moment(startdate).set({hour: 9, minute: 0}).toDate();
    startdate = moment(startdate).add(1, 'days');
    enddate = moment(enddate).set({hour: 9, minute: 30}).toDate();
    enddate = moment(enddate).add(1, 'days');

}

console.log("FIN.");

function saveAppointment() {
    const appointment = new Appointment(sampleAppointment);
    appointment.save((err) => {
        if (err) return console.error(err);
    });
}