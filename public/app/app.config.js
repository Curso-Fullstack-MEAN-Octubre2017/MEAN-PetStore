'use strict';

angular.module('petStore')
	.factory('loadingInterceptor', function($rootScope, $q) {
		var interceptor = {
			'request': function(config) {
				console.log("resquest", config.method, config.url);
				$rootScope.$broadcast("http:request", config);
				return config;
			},
			'response': function(response) {
				console.log("response", response.status, response.statusText);
				$rootScope.$broadcast("http:response", response);
				return response;
			},
			'requestError': function(rejection) {
				console.log("requestError", rejection);
				$rootScope.$broadcast("http:requestError", rejection);
				return $q.reject(rejection);;
			},
			'responseError': function(rejection) {
				console.log("responseError", rejection);
				$rootScope.$broadcast("http:responseError", rejection);
				return $q.reject(rejection);;
			}
		};
		return interceptor;
	})
    .config(function(
        $locationProvider,
        $httpProvider,
        $routeProvider
    ){
        $locationProvider.html5Mode({ enabled: true });
        $httpProvider.interceptors.push('loadingInterceptor');
        $routeProvider
            .when("/",{ template: "Pet Store Demo (Hello World)" })
            .when("/customers",{ template: "<customer-list-module></customer-list-module>" })
            .when("/customers/:id",{ template: "<customer-module></customer-module>" })
            .when("/pets",{ template: "<pet-list-module></pet-list-module>" })
            .when("/pets/:id",{ template: "<pet-module></pet-module>" })
            .when("/appointments-calendar",{ template: "<appointments-calendar></appointments-calendar>" })
            .when("/appointments-calendar/:month",{ template: "<appointments-calendar></appointments-calendar>" })
            .when("/appointments/:date",{ template: "<appointments-module></appointments-module>" })
//            .when("/appointments-day-list/:date",{ template: "<appointments-day-list></appointments-day-list>" })
//            .when("/appointments/:id",{ template: "<appointment-details-module></appointment-details-module>" })
//            .when("/appointments/add/:datetime",{ template: "<appointment-details-module></appointment-details-module>" })
            .otherwise({
                template: "Other"
            });
    });

