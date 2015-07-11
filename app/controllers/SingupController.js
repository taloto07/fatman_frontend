angular.module('ControllerModule').
controller('SignupController', ['$scope', 'UserAuthFactory', '$state', '$timeout', function($scope, UserAuthFactory, $state, $timeout){
	$scope.user = {};
	$scope.emailExisted = false;

	$scope.matchEmail = function(){
		if ($scope.user.email !== $scope.user.confirmEmail){
			$scope.emailNotMatched = true;	
		}else{
			$scope.emailNotMatched = false;
		}
	}

	$scope.matchPassword = function(){
		if ($scope.user.password !== $scope.user.confirmPassword){
			$scope.passwordNotMatched = true;
		}else{
			$scope.passwordNotMatched = false;
		}
	}

	$scope.submitForm = function(){
		
		UserAuthFactory.signup($scope.user).success(function(response){
			$timeout(function() {
				$('#signupSuccessModal').modal('hide');

				$state.go('app.login');	
			}, 3000);

			$('#signupSuccessModal').modal({
				backdrop: false
			});
			
		}).error(function(error){
			
			console.log(error);
			$scope.err = error;
		});
		
	}

	$scope.checkEmail = function(){
		if ($scope.user.email !== undefined){
			UserAuthFactory.checkEmail($scope.user.email.toLowerCase()).
			success(function(email){
				$scope.emailExisted = email.isExisted;
				$scope.tempEmail = $scope.user.email;
			}).
			error(function(error){
				console.log(error);
			});
		}
	}
}])