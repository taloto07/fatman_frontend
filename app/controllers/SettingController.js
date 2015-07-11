angular.module("ControllerModule").
controller('SettingController', ['$scope', '$rootScope', '$state',function($scope, $rootScope, $state){

	$scope.listClick = function(value){
		$scope.selectedSetting = value;
	}

	$rootScope.$watch('selectedSetting', function(newValue, oldValue){
		$scope.selectedSetting = newValue;
	});

	$rootScope.selectedSetting = -1;

}])