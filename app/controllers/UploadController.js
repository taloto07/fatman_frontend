angular.module('ControllerModule').
controller('UploadController', ['$rootScope', '$scope', 'DataFactory', 'Upload', '$http', function($rootScope, $scope, DataFactory, Upload, $http){
	$scope.pictureLimit = false;

	$scope.submitForm = function(uploadForm){
		if ($scope.files != undefined && $scope.files.length > 0 && $scope.files.length < 13){
			$scope.pictureLimit = false;

			// set up upload fields
			var form = {};
			form.category = $scope.upload.category._id;
			form.subCategory = $scope.upload.subcategory._id;
			form.title = $scope.upload.title;
			form.condition = $scope.upload.condition;
			form.price = $scope.upload.price;
			form.details = $scope.upload.description;
			form.location = $scope.upload.location._id;
			form.user = $rootScope.userMenu._id;

			

			DataFactory.upload(form, $scope.files).success(function(response){
				$scope.upload = {};
				$scope.files = [];				
				uploadForm.$setPristine();

				$scope.success = response;
				$scope.err = false;
			}).error(function(error){
				$scope.err = [];
				
				for (var key in error.error){
					$scope.err.push(error.error[key]); 
				}
				$scope.success = false;
			});
		}else{
			$scope.pictureLimit = true;
			return false;
		}
	}

	// data for condition
	$scope.conditions = ['new', 'mint', 'used'];

	// get categories
	DataFactory.getCategories().success(function(response){
		$scope.categories = response;
	}).error(function(error){
		console.log(error);
	});

	// get locations
	DataFactory.getLocations().success(function(response){
		$scope.locations = response;
	}).error(function(error){
		console.log(error);
	});

	// adjust sub category when changing category
	$scope.changeCategory = function(){
		if ($scope.upload.category != undefined)
			$scope.subcategories = $scope.upload.category.sub_categories;
		else
			$scope.subcategories = "";

		$scope.upload.subcategory = '';
	}
}])