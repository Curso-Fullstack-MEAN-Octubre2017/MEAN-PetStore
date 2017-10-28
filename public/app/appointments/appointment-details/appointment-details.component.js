'use strict';

angular.module('appointmentDetailsModule', []);

angular.module('appointmentDetailsModule')
    .component('appointmentDetailsModule', {
        templateUrl:'/app/appointments/appointment-details/appointment-details.html',
        controller: function($scope, $http) {
            console.log("Incializando appointment-details")
        }
    })
    .controller('AppointmentController',function($scope, $http, appointmentsService){
        console.log("AppointmentController");
    	$scope.appointment = null;
    	
    	$http.get("/api/pets").then(function(response) {
    		$scope.petsList = response.data;
    	});
    	
        $scope.$on("appointments:showAppointment", (event, data) => {
        	console.log("on appointments:showAppointment", data);
    		appointmentsService.getAppointment(data.id).then(function(response) {
        		$scope.appointment = response;
        	});
        });
        
        $scope.$on("appointments:addAppointment", (event, data) => {
        	console.log("on appointments:addAppointment", data);
    		console.log("New Appointment", data.datetime);
    		$scope.appointment = {};
    		$scope.appointment.dateTimeStart = data.datetime;
    		$scope.appointment.dateTimeEnd = moment($scope.appointment.dateTimeStart).add(30,'m').toDate();
    		$scope.appointment.status = 0;
        });      	
    	
    	$scope.submit = function() {
    		console.log("Save Appointment", $scope.appointment);
    		appointmentsService.saveAppointment($scope.appointment).then(
    				function(response) {
    					$scope.appointment = response;
    					var date = moment($scope.appointment.dateTimeStart).format("YYYYMMDD")
    					$scope.$emit("appointments:appointmentSaved", $scope.appointment)
    				}, function(response) {
    					console.log("Error", response);
    				});
		}
    	
    	$scope.remove = function() {
    		if(confirm("Esta seguro que desea borrar este registro")) {
    			var date = moment($scope.appointment.dateTimeStart).format("YYYYMMDD");
				appointmentsService.deleteAppointment($scope.appointment).then(
					function() {
						$scope.appointment = null;
						$scope.$emit("appointments:appointmentDeleted");
					}, function() {
						alert("Borrado Failed!!");
					});
				}
    	};
    	
    	$scope.cancel = function() {
    		$scope.appointment = null;
    	};
    })
    ;

    