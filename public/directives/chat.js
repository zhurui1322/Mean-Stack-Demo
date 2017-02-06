(function () {
    'use strict';

    angular
        .module('app')
  		.directive('chat', function() {
			return {
				restrict: 'E',
				scope: {
					info: '='
				},
				templateUrl : 'directives/chat.html'
			};
		});     

    
})();







