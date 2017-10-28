'use strict';

angular.module('appointmentsDayList', []);
angular.module('appointmentsDayList')
    .component('appointmentsDayList', {
        templateUrl:'/app/appointments/appointments-day-list/appointments-day-list.html',
        controller: function($scope, $http, $routeParams, appointmentsService) {
            console.log("Incializando appointments day-list")
            moment.locale("es");
            
            var currentDate = moment($routeParams.date, "YYYYMMDD"); 
            $scope.currentDate = currentDate.format("YYYYMMDD");

            $scope.hourSlots = [];

            
            appointmentsService.getAppointmentsForDate(currentDate).then(function(appointments){
                appointments = appointments || {};
                var openingHour = moment(currentDate).hour(9);
                var closingHour = moment(currentDate).hour(21);
                for(var hour = moment(openingHour); hour.isBefore(closingHour); hour.add(0.5, 'h')) {
                    var hourKey = hour.format('hh:mm');
                    $scope.hourSlots.push({
                        hour: hourKey,
                        appointment: appointments[hourKey],
                    });
                }            	
            });
            
            $scope.showAppointment = (id) => {
            	console.log("emiting appointments:showAppointmentClick");
                $scope.$emit("appointments:showAppointmentClick", {id: id}); 
            };
            
            $scope.addAppointment = (datetime) => {
            	console.log("emiting appointments:addAppointmentClick");
                $scope.$emit("appointments:addAppointmentClick", {datetime: moment(datetime, 'YYYYMMDD-hh:mm').toDate()}); 
            };
        }
    });

    