'use strict';

angular.module('appointmentsModule', ['appointmentsDayList', 'appointmentDetailsModule',]);

angular.module('appointmentsModule')
    .component('appointmentsModule', {
        templateUrl:'/app/appointments/appointments.html',
        controller: function($scope, $http) {
            console.log("Incializando appointments")

            $scope.$on("appointments:showAppointmentClick", (event, data) => {
            	console.log("broadcasting appointments:showAppointment", data);
            	$scope.$broadcast("appointments:showAppointment", data); 
            });
            
            $scope.$on("appointments:addAppointmentClick", (event, data) => {
            	console.log("broadcasting appointments:addAppointment", data);
            	$scope.$broadcast("appointments:addAppointment", data); 
            });
            
            $scope.$on("appointments:appointmentSaved", (event, appointment) => {
            	console.log("on appointments:appointmentSaved", appointment);
            });
            
            $scope.$on("appointments:appointmentDeleted", (event) => {
            	console.log("on appointments:appointmentSaved", appointment);
            });
        }
    });

    