'use strict';

angular.module('appointmentsDayList', []);
angular.module('appointmentsDayList')
    .component('appointmentsDayList', {
        templateUrl:'/app/appointments-day-list/appointments-day-list.html',
        controller: function($scope, $http, $routeParams, appointmentsService) {
            console.log("Incializando appointments day-list")
            moment.locale("es");
            
            var currentDate = moment($routeParams.date, "YYYYMMDD"); 
            $scope.currentDate = currentDate.format("YYYYMMDD");

            $scope.hourSlots = [];
            $scope.hello = {message: "hola" };

            
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
            
            $scope.openAppointment = (id) => {
                alert(id);  
            };
        }
    })
  .directive('myMessage', function() {
    return {
      link: function(scope, element) {
        scope.$watch('hello.message', function(newVal, oldVal) {
          //if(oldVal !== newVal) return;

          ReactDOM.render(
        		  Hello({name: scope.hello.message}), // componente + props
        		  document.getElementById('output') // element
          );
        });
      }
    }
  })   

    