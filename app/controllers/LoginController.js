angular.module('ControllerModule')
.controller('LoginController', ['$scope', 'AuthenticationFactory', 'UserAuthFactory', '$state', '$localStorage', 'FlashFactory', function($scope, AuthenticationFactory, UserAuthFactory, $state, $localStorage, FlashFactory){

	$scope.err = false;

	$scope.submitForm = function(valid){
		
		if (valid){
		
			UserAuthFactory.login($scope.user.email, $scope.user.password).
			
			then(function(response){

				$scope.err = {};	
				
				// redirect to intended page, if no intented page, go home
				var route = FlashFactory.getRoute();

				if (route){
					$state.go(route);
				}else{
					$state.go('app');	
				}
				

			}, function(error){
				if (error.data){
					// http resquest error
					$scope.err = error.data;
					$scope.user.password = '';	
					
				}else{
					// Internal server error
					$scope.err = {};
					$scope.err.message = "Oop! Something when wrong.";
					
				}
			});
		}
	}

}])