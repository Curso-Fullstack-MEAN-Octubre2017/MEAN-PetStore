'use strict';

angular.module('customerModule', []);

angular.module('customerModule')
    .component('customerModule', {
        templateUrl:'/app/customer-module/customer-module.html',
        controller: function($scope, $http) {
            console.log("Incializando customer-module")
        }
    })
    .controller('CustomerController',function($scope, $http, $location, $routeParams, customersService){
        console.log("CustomerController");
    	$scope.customer = {};
    	var id = $routeParams.id;
    	if(id != 'new') {
    		$scope.customer = customersService.get({id: id});
    	}
    	
    	$scope.submit = function() {
    		console.log("Submit", $scope.customer);
    		const validationErrors = Validators.validateCustomer($scope.customer);
    		if(validationErrors) {
    			return alert(JSON.stringify(validationErrors));
    		}    		
    		
    		var errorCallback = function(response) { console.log("Error", response);}

    		var isNew = !$scope.customer._id;
    		if(isNew) {
    			customersService.save({}, $scope.customer, function(customer) {
    				$scope.$emit("message:success", {message: "Cliente dado de alta con exito"})
    				$location.path("customers");
    			}, errorCallback);
    		} else {
    			customersService.update({id: $scope.customer._id}, $scope.customer, function(customer) {
    				$scope.$emit("message:success", {message: "Cliente dado actualizado con exito"})
    				$scope.customer = customer;
    			}, errorCallback);    			
    		}
		}
    	
    	$scope.remove = function() {
    		if(confirm("Esta seguro que desea borrar este registro")) {
    			customersService.delete({id: $scope.customer._id},
					function() {
						alert("Borrado OK");
						$location.path("customers");
					}, function() {
						alert("Borrado Failed!!");
					});
				}
    	};
    	
    	$scope.cancel = function() {
    		history.back();
    	};
    })
    ;

    