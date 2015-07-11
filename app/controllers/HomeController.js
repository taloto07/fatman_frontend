angular.module('ControllerModule')
.controller('HomeController', ['$rootScope', 'UserFactory', '$scope', 'DataFactory', 'REMOTE_SERVER', function($rootScope, UserFactory, $scope, DataFactory, REMOTE_SERVER){
	
	$scope.REMOTE_SERVER = REMOTE_SERVER;

	DataFactory.getPosts().success(function(response){
		$scope.posts = response;
	});

}])