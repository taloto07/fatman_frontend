angular.module('DirectiveModule').
directive('postDirective', ['Base_URL', function(Base_URL){
	return{
		restrict: 'AE',
		templateUrl: 'app/views/directives/posts.html',
		replace: true,
		scope: {
			data: '=',
			REMOTE_SERVER: '@remoteServer'
		}
	}
}]);