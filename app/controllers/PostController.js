angular.module('ControllerModule').
controller('PostController', ['$scope', '$rootScope', 'DataFactory', 'REMOTE_SERVER', '$http', '$window',function($scope, $rootScope, DataFactory, REMOTE_SERVER, $http, $window){
	$rootScope.selectedSetting = 1;

	$scope.REMOTE_SERVER = REMOTE_SERVER;

	$scope.conditions = [
		{value: 'new', label: 'NEW'},
		{value: 'mint', label: 'MINT'},
		{value: 'used', label: 'USED'},
	];

	DataFactory.getCategory().success(function(response){
		$scope.categories = response;
	}).error(function(error){
		console.log(error);
	});

	DataFactory.getLocations().success(function(response){
		$scope.locations = response;
	}).error(function(error){
		console.log(error);
	});

	DataFactory.getUserPosts($rootScope.userMenu._id)
	.success(function(response){
		$scope.posts = response
		
	}).error(function(error){
		console.log(error);
	});

	$scope.editClick = function(post){
		$scope.originalPost = post;
		$scope.editPost = angular.copy(post);
		
		$scope.categories.forEach(function(category){
			if ($scope.editPost.sub_category._id == category._id){
				$scope.editPost.sub_category = category;
				return;
			}
		});

		$scope.conditions.forEach(function(condition){
			if (condition.value === $scope.editPost.condition){
				$scope.editPost.condition = condition;
				return;
			}
		});

		$scope.locations.forEach(function(location){
			if (($scope.editPost.location._id) == location._id){
				$scope.editPost.location = location;
				return;
			}
		});

		// $scope.editPost.files = '';

		$('#editModal').modal();
	};

	$scope.deleteImage = function(imageIndex){
		if ($scope.editPost.pictures.length <= 1){
			alert('You need at least 1 picture!');
			return;
		}

		DataFactory.deleteImage($scope.editPost._id, imageIndex)
		.success(function(response){
			$scope.originalPost.pictures.splice(imageIndex, 1);
			$scope.originalPost.pictures_l.splice(imageIndex, 1);
			$scope.originalPost.pictures_s.splice(imageIndex, 1);
			
			$scope.editPost.pictures.splice(imageIndex, 1);
			$scope.editPost.pictures_l.splice(imageIndex, 1);
			$scope.editPost.pictures_s.splice(imageIndex, 1);
		}).error(function(error){
			console.log(error);
		})
	}

	$scope.editFormSubmit = function(){
		if ($scope.editPost.files != undefined && ($scope.editPost.files.length + $scope.editPost.pictures.length > 12)){
			$scope.fileError = true;
			return false;
		}else{
			$scope.fileError = false;

			var data = {};
			data.title = $scope.editPost.title;
			data.description = $scope.editPost.description;
			data.subCategory = $scope.editPost.sub_category._id;
			data.price = $scope.editPost.price;
			data.condition = $scope.editPost.condition.value;
			data.location = $scope.editPost.location._id;

			var files = $scope.editPost.files;

			DataFactory.editPost(data, files, $scope.editPost._id)
			.success(function(response){

				$("#editModal").modal('hide');

				$window.location.reload();
			}).error(function(error){
				console.log(error);
			});
		}
	}
}])
