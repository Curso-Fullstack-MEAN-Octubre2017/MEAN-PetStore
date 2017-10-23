'use strict';

angular.module('customersService', []).factory('customersService', function($resource, $q){
    return $resource('/api/customers/:id', {id: '@id'}, {
        update: { method:'PUT'}
    })	
});