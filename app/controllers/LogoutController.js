angular.module('ControllerModule').
controller('LogoutController', ['$scope', 'UserAuthFactory', function($scope, UserAuthFactory){
	UserAuthFactory.logout();
}])