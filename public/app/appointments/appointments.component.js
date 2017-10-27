'use strict';

angular.module('appointmentsModule', []);

angular.module('appointmentsModule')
    .component('appointmentsModule', {
        templateUrl:'/app/appointments/appointments.html',
        controller: function($scope, $http) {
            console.log("Incializando appointments")

        }
    });

    