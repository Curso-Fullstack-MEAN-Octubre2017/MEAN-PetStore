'use strict';

angular.module('appointmentsCalendar', []);
angular.module('appointmentsCalendar')
    .component('appointmentsCalendar', {
        templateUrl:'/app/appointments-calendar/appointments-calendar.html',
        controller: function($scope, $http, $routeParams, $location, appointmentsService) {
            console.log("Incializando appointments calendar")
            moment.locale("es");
            
            var currentMonth = moment().startOf('month');
            if($routeParams.month) {
            	currentMonth = moment($routeParams.month, "YYYYMM"); 
            }
            $scope.currentMonth = currentMonth.toDate();
            $scope.prevMonth = moment(currentMonth).add(-1,'M').toDate();
            $scope.nextMonth = moment(currentMonth).add(1,'M').toDate();

            $scope.cells = []

            var firstWeekDay = currentMonth.weekday();
            for(var i = 0; i < firstWeekDay; i++) {
            	$scope.cells.push({date: "---"});
            }

            appointmentsService.getMonthAppointmentsByDate(currentMonth).then(function(response){
            	$scope.appointmentsByDate = response;
                for (var m = moment(currentMonth); m.isBefore($scope.nextMonth); m.add(1, 'days')) {
                	var currentDate = m.format('YYYYMMDD');
                	$scope.cells.push({
                		date: m.toDate(), 
                		appointments: $scope.appointmentsByDate[currentDate],
                		appointmentsCount: $scope.appointmentsByDate[currentDate] ? Object.keys($scope.appointmentsByDate[currentDate]).length : 0,
                	});
            	}
            });
            
            $scope.openDayAppointments = (date) => {
                $location.path("/appointments/" + moment(date).format('YYYYMMDD'))
            };
        }
    });

    