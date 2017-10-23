'use strict';

app.directive('optionsDirective', function() {
  return {
      restrict: 'A',
      replace: 'true',
      scope: { 
    	  items: ">", // referencia one way
    	  model: "=", // referencia double binding
    	  label: "@", // valor readonly
    	  value: "@", // valor readonly
    	  onchange: "&",
    	  onclick: "&",
    	  onblur: "&"
      },
      template: '<option ng-model="{{model}}" ng-repeat="item in items" value="{{item[value]}}">{{item[label]}}</option>',
      link: function(scope, elem, attrs) {

      }
  };
});