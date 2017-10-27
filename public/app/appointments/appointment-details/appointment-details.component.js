'use strict';

angular.module('appointmentDetailsModule', []);

angular.module('appointmentDetailsModule')
    .component('appointmentDetailsModule', {
        templateUrl:'/app/appointments/appointment-details/appointment-details.html',
        controller: function($scope, $http) {
            console.log("Incializando appointment-details")
        }
    })
    .controller('AppointmentController',function($scope, $http, $location, $routeParams, appointmentsService){
        console.log("AppointmentController");
    	$scope.appointment = {};
    	var id = $routeParams.id;
    	if(id) {
    		appointmentsService.getAppointment(id).then(function(response) {
        		$scope.appointment = response;
        	});
    	} else {
    		console.log("New Appointment", $routeParams.datetime);
    		$scope.appointment.dateTimeStart = moment($routeParams.datetime, 'YYYYMMDD-hh:mm').toDate();
    		$scope.appointment.dateTimeEnd = moment($scope.appointment.dateTimeStart).add(30,'m').toDate();
    		$scope.appointment.status = 0;
    	}
    	
    	$http.get("/api/pets").then(function(response) {
    		$scope.petsList = response.data;
    	});
    	
    	$scope.submit = function() {
    		console.log("Save Appointment", $scope.appointment);
    		appointmentsService.saveAppointment($scope.appointment).then(
    				function(response) {
    					$scope.appointment = response;
    					var date = moment($scope.appointment.dateTimeStart).format("YYYYMMDD")
    					$location.path("/appointments-day-list/" + date);
    				}, function(response) {
    					console.log("Error", response);
    				});
		}
    	
    	$scope.remove = function() {
    		if(confirm("Esta seguro que desea borrar este registro")) {
    			var date = moment($scope.appointment.dateTimeStart).format("YYYYMMDD");
				appointmentsService.deleteAppointment($scope.appointment).then(
					function() {
						$location.path("/appointments-day-list/" + date);
					}, function() {
						alert("Borrado Failed!!");
					});
				}
    	};
    	
    	$scope.cancel = function() {
    		history.back();
    	};
    })
    ;

    