'use strict';

angular.module('petStore')
    .config(function(
        $locationProvider,
        $routeProvider
    ){
        $locationProvider.html5Mode({ enabled: true });
        $routeProvider
            .when("/",{ template: "Pet Store Demo (Hello World)" })
            .when("/customers",{ template: "<customer-list-module></customer-list-module>" })
            .when("/customers/:id",{ template: "<customer-module></customer-module>" })
            .when("/pets",{ template: "<pet-list-module></pet-list-module>" })
            .when("/pets/:id",{ template: "<pet-module></pet-module>" })
            .when("/appointments-calendar",{ template: "<appointments-calendar></appointments-calendar>" })
            .when("/appointments-calendar/:month",{ template: "<appointments-calendar></appointments-calendar>" })
            .when("/appointments-day-list/:date",{ template: "<appointments-day-list></appointments-day-list>" })
            .when("/appointments/:id",{ template: "<appointment-details-module></appointment-details-module>" })
            .when("/appointments/add/:datetime",{ template: "<appointment-details-module></appointment-details-module>" })
            .otherwise({
                template: "Other"
            });
    });