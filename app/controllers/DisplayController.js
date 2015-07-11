angular.module('ControllerModule').
controller('DisplayController', ['$scope', '$stateParams', 'DataFactory', 'REMOTE_SERVER', function($scope, $stateParams, DataFactory, REMOTE_SERVER){
	$scope.id = $stateParams.id;
	$scope.imagePath = "";
	$scope.REMOTE_SERVER = REMOTE_SERVER;

	$scope.changeImage = function(id){
		$scope.imagePath = REMOTE_SERVER + $scope.post.pictures_l[id];
	}

	DataFactory.getPost($scope.id).success(function(response){
		console.log(response);
		$scope.post = response;
		$scope.imagePath = REMOTE_SERVER + $scope.post.pictures_l[0];
		$scope.postTitle = $scope.post.title;
		$('.fancybox').fancybox();
	}).error(function(err){
		console.log(err);
	});
}])