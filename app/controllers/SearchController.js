angular.module('Fatman').
controller('SearchController', ['$rootScope', '$scope', 'DataFactory', '$stateParams', '$state', 'REMOTE_SERVER', function($rootScope, $scope, DataFactory, $stateParams, $state, REMOTE_SERVER){

	$scope.REMOTE_SERVER = REMOTE_SERVER;

	$scope.filter = {};
	$scope.filter.skip = 0;
	$scope.posts = [];

	$scope.btn_loading_label = 'Load';

	// check if location parameter exist add it to rootScope
	if ($stateParams.location !== undefined){
		// alert('SearchController');
		 $rootScope.location = $stateParams.location;
		 $scope.filter.location = $stateParams.location;
	}else{
		$scope.filter.location = '';
	}

	// check if keyword parameter exist add it to rootScope
	if ($stateParams.keyword !== undefined){
		// alert('SearchController');
		 $rootScope.keyword = $stateParams.keyword;
		 $scope.filter.keyword = $stateParams.keyword;
	}else{
		$scope.filter.keyword = '';
	}

	// sort data
	$scope.sorts = [
		{value: 'low', label: 'Price: Low to High'},
		{value: 'high', label: 'Price: High to Low'},
		{value: 'newest', label: 'Date: Newest'},
		{value: 'oldest', label: 'Date: Oldest'}
	];

	// check for sort if it existed earlier
	if ($stateParams.sort != undefined){
		$scope.sorts.forEach(function(obj){
			if ($stateParams.sort == obj.value){
				$scope.sort = obj;
				$rootScope.sort = $scope.sort;
			}
		});

		$scope.filter.sort = $stateParams.sort;
	}else{
		$scope.filter.sort = '';
	}

	// check for category
	if ($stateParams.category != undefined){
		$scope.filter.category = $stateParams.category;
	}else{
		$scope.filter.category = '';
	}
	
	// get categories
	DataFactory.getCategory().success(function(response){
		
		$scope.categories = response.sort(function(a,b){
			var nameA = a.type.toLowerCase(), nameB = b.type.toLowerCase();
			if (nameA < nameB)
				return -1;
			if (nameA > nameB)
				return 1;
			return 0;
		});

		if ($stateParams.category != undefined){
			$scope.categories.forEach(function(obj){
				if (obj._id == $stateParams.category){
					$scope.category = obj;
					$rootScope.category = $scope.category;
				}
			})
		}		
	}).error(function(error){
		console.log(error);
	});

	// search posts
	$scope.load = function(){
		$scope.btn_loading_label = 'Loading More Posts';
		DataFactory.search($scope.filter).success(function(response){
			
			if (response.length > 0){
				$scope.posts = $scope.posts.concat(response);
				$scope.filter.skip++;
				$scope.btn_loading_label = 'Load';
			}else{
				$scope.noMorePost = true;
				$scope.btn_loading_label = 'Load';
			}		
		}).error(function(error){
			$scope.btn_loading_label = 'Load';
			$scope.err = error;
			console.log(error);
		})
	}

	$scope.load();

	$scope.categoryChange = function(){
		$rootScope.category = $scope.category;
	}

	$scope.sortChange = function(){
		$scope.filter.skip = 0;
		$rootScope.sort = $scope.sort;
		$scope.filter.sort = $rootScope.sort.value;

		console.log($scope.filter);

		$scope.btn_loading_label = 'Loading More Posts';
		$scope.noMorePost = false;

		DataFactory.search($scope.filter).success(function(response){
			$scope.posts = response;
			$scope.filter.skip++;
			$scope.btn_loading_label = 'Load';
		}).error(function(error){
			console.log(error);
			$scope.btn_loading_label = 'Load';
		});
	}

}])