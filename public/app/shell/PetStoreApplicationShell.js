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
       
            $scope.$on('$locationChangeStart', function(event, current, next) {
            	console.log("$locationChangeStart", event, current, next);
            	/* 
            	 * AngularJS sets the CSS classes ng-pristine and ng-dirty on any input field you've used ng-model on, 
            	 * and your FormController has the properties $pristine and $dirty 
            	 * which you can check to see if the form is dirty or not
            	 */
            	if($(".ng-dirty").length > 0) {
            		if(!confirm("Hay datos sin guardar. ¿Quires continuar y perder dichos cambios?")){
            			event.preventDefault();
            		}
            	}
            });
        }
    });