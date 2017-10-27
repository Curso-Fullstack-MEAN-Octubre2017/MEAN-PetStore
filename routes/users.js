

var api = require('express').Router();
module.exports = api;

/**
 * Devuelve un objeto con las preferencias del usuario 
 */
api.get('/users/:username/config', function(req, res, next) {
	var username = req.params.username;
	//Devuelve una configuracion de ejemplo para hacer pruebas
	res.json({
		username: username,
		roles: ["admin", "vet", "clerk"],
		language: "en",
		petStores: [1,2,3],
	});
});