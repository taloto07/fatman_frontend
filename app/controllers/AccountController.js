angular.module('ControllerModule').
controller('AccountController', ['$scope', '$state', '$rootScope', 'DataFactory', function($scope, $state, $rootScope, DataFactory){
	$rootScope.selectedSetting = 0;

	$scope.edit = false;
	
	$scope.user = $rootScope.userMenu;
	$scope.editUser = angular.copy($rootScope.userMenu);

	$scope.editClick = function(flag){
		$scope.edit = flag;
	}

	$scope.submitForm = function(){

		var edit = {};
		edit.fname = $scope.editUser.fname;
		edit.lname = $scope.editUser.lname;
		edit.email = $scope.editUser.email;

		DataFactory.editAccount($scope.user._id, edit).
		success(function(response){
			$scope.user = response;
			$rootScope.userMenu = response;
			$scope.editUser = angular.copy($scope.user);
			$scope.edit = false;
		}).
		error(function(error){
			console.log(error);
		});
	}
}])