const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    dni: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String},
    note: {type: String},
});

/*
 * propiedades virtuales para rellenar listas, <selects>, etc..
 */
customerSchema.virtual('fullName').get(function() {
	return this.firstName + " " + this.lastName;
});
customerSchema.virtual('fullNameSort').get(function() {
	return this.lastName + ", " + this.firstName;
});

module.exports = mongoose.model('Customer', customerSchema);