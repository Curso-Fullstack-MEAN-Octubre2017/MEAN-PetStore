'use strict';

angular.module('customerListModule', []);

angular.module('customerListModule')
    .component('customerListModule', {
        templateUrl:'/app/customerList-module/customerList-module.html',
        controller: function($scope, $http) {
            console.log("Incializando customerList-module")
        }
    })
    .controller('CustomerListController',function($scope, $http, $location, $routeParams, customersService){
        console.log("CustomerListController");
    	$scope.customerList = [];
    	 
		$scope.search = {};
		if($location.search().searchTerm) {
			$scope.search.searchTerm = $location.search().searchTerm;
		}

//		customersService.query($scope.search, function(response) {
//    		$scope.customerList = response.data;
//    	});
		
		$scope.customerList = customersService.query($scope.search);


    	$scope.searchCustomers = function() {
    		$location.search("searchTerm", $scope.search.searchTerm);
    		$scope.customerList = customersService.query($scope.search);
    	};
    })
    ;

    