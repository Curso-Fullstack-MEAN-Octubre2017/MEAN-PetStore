'use strict';

angular.module('navigationModule', []);
angular.module('navigationModule')
    .component('navigationModule', {
        templateUrl:'/app/navigation-module/navigation-module.html',
        controller: function($rootScope, $scope, $http) {
            console.log("Incializando navigation-module");
            
            $scope.loading = false;
            
            var onRequestStart = () => {
                $scope.loading = true;
            }
            var onRequestFinish = () => {
                $scope.loading = false;
            }

            $scope.$on('http:request', onRequestStart);
            $scope.$on('http:response', onRequestFinish);
            $scope.$on('http:requestError', onRequestFinish);
            $scope.$on('http:responseError', onRequestFinish);
            
            $rootScope.$on("message:success", function(event, message) {
            	alert(message.message);
            })
            $rootScope.$on("message:error", function(event, message) {
            	alert(message.message);
            })            
        }
    });

    