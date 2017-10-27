/**
 * PetStoreApplicationShell
 */
angular.module('petStoreApplicationShell', ['ngRoute']);
angular.module('petStoreApplicationShell')
    .component('petStoreApplicationShell', {
        templateUrl:'/app/shell/PetStoreApplicationShell.html',
        controller: function($rootScope, $scope, $http) {
            console.log("Incializando PetStoreApplicationShell");
            
            var username = "ivangsa";
            $http.get('/api/users/' + username + '/config').success(function(response) {
            	$rootScope.userPreferences = response;
            });
       
        }
    });