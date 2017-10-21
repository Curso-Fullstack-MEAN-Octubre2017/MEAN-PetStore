'use strict';

angular.module('appointmentsService', []).factory('appointmentsService', function($http, $q){
	var service = {};
	
	// cache local de los datos de appointments
	service._appointmentsMapByMonth = {};
	
	/**
	 * Devuelve una promesa con el mapa de appointments de este month indexados por [dia][hora]
	 */
	service.getMonthAppointmentsByDate = (month) => {
		var d = $q.defer();
		
        var startDate = moment(month).format('YYYYMMDD');
        var endDate = moment(month).add(1,'M').format('YYYYMMDD');

		// si ya tenemos los datos los devolvemos
		if(service._appointmentsMapByMonth[startDate]) {
			d.resolve(service._appointmentsMapByMonth[startDate]);
			return d.promise;
		}
		
		// en caso contrario vamos al servidor
		$http.get("/api/appointmentsByDate/" + startDate + "/"+ endDate)
			.success(function(response) {
				service._appointmentsMapByMonth[startDate] = response;
				d.resolve(service._appointmentsMapByMonth[startDate]);
			})
			.error(function(response) {
				d.reject({status: response.status, message: 'TODO'});
			});
		return d.promise;
	}
	
	/**
	 * Devuelve una promesa con el mapa de appointments de esta fecha indexados por [hora]
	 */
	service.getAppointmentsForDate = (date)  => {
		var month = moment(date).startOf('M');
		var monthKey = month.format('YYYYMMDD');
		var dateKey = moment(date).format('YYYYMMDD');
		
		var d = $q.defer();
				
		// si ya tenemos los datos los devolvemos
		if(service._appointmentsMapByMonth[monthKey]) {
			d.resolve(service._appointmentsMapByMonth[monthKey][dateKey]);
			return d.promise;
		}
		
		// en caso contrario llamamos a la carga de datos del mes
		service.getMonthAppointmentsByDate(month).then(
			function() {
				console.log("service._appointmentsMapByMonth[monthKey][dateKey]", service._appointmentsMapByMonth[monthKey][dateKey]);
				d.resolve(service._appointmentsMapByMonth[monthKey][dateKey]);
			},function(err) {
				d.reject(err)
			});
		return d.promise;
	}
	
	return service;
});