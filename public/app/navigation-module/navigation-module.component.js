'use strict';

angular.module('navigationModule', []);
angular.module('navigationModule')
    .component('navigationModule', {
        templateUrl:'/app/navigation-module/navigation-module.html',
        controller: function($scope, $http) {
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
        }
    });

    