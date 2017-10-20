'use strict';

angular.module('appointmentsCalendar', []);
angular.module('appointmentsCalendar')
    .component('appointmentsCalendar', {
        templateUrl:'/app/appointments-calendar/appointments-calendar.html',
        controller: function($scope, $http, $routeParams) {
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

            
            $http.get("/api/appointmentsByDate/20171001/20171101").then(function(response){
            	$scope.appointmentsByDate = response.data;
                for (var m = moment(currentMonth); m.isBefore($scope.nextMonth); m.add(1, 'days')) {
                	var currentDate = m.format('YYYY-MM-DD');
                	$scope.cells.push({
                		date: currentDate, 
                		appointments: $scope.appointmentsByDate[currentDate],
                		appointmentsCount: $scope.appointmentsByDate[currentDate] ? Object.keys($scope.appointmentsByDate[currentDate]).length : 0,
                	});
            	}
            });
            

        }
    });

    