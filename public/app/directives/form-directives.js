'use strict';

angular.module('customDirectivesModule', [])
	.directive(
			'labelInputFormGroup',
			function() {
				return {
					restrict : 'E',
					replace : true,
					scope: {
						label: '@',
						model: '=',
						name: '@',
						placeholder: '@',
					},
					template : 	'<div class="form-group"> \
								      <label>{{label}}</label>\
								      <input type="text" class="form-control" name="{{name}}" placeholder={{placeholder}} ng-model="model">\
								</div>'					
				}
			})
	.directive('formGroupWrapper', function() {
		return {
			restrict : 'E',
			replace : true,
			transclude : true,
			scope: {
				label: '@',
			},			
			template : '<div class="form-group"> \
						    <label>{{label}}</label>\
							<div ng-transclude></div>\
						</div>'
		};
	})			


