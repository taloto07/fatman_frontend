angular.module('Fatman').
controller('MenuController', ['$rootScope', '$scope','DataFactory', '$state', 'REMOTE_SERVER', 'UserCountSocket',
	function($rootScope, $scope, DataFactory, $state, REMOTE_SERVER, UserCountSocket){
	
	DataFactory.getLocations().success(function(response){
		
		$scope.locations = response;

		//check if location has chosen before
		if ($rootScope.location != undefined){
			$scope.locations.forEach(function(l){
				if ($rootScope.location == l._id){
					$scope.location = l;
				}
			});
		}

	}).error(function(error){
		console.log(error);
	});

	//check if keyword has chosen before
	if ($rootScope.keyword != undefined){
		$scope.keyword = $rootScope.keyword;
	}

	// perform a check by redirect to search page with all the arguments
	$rootScope.search = function(){
		if ($scope.location == undefined){
			$scope.location = {_id: ''};
		}

		$rootScope.category = $rootScope.category ? $rootScope.category._id : '';
		$rootScope.sort = $rootScope.sort || '';

		$state.go('app.search', {
			keyword: $scope.keyword, 
			location: $scope.location._id,
			category: $rootScope.category,
			sort: $rootScope.sort.value
		});
	};

	UserCountSocket.on('userCount', function(count){
		$scope.totalUserOnline = count;
		console.log(count);
	});

	var out = true;
	$('#parent').click(function(){
		if (!(out = !out)){
			$('#totalUserOnline').animate({
				left: '+=140px'
			}, 400, function(){
				$('#sign').attr('class', 'glyphicon glyphicon-chevron-left');
			});	
		}else{
			$('#totalUserOnline').animate({
				left: '-=140px'
			}, 400, function(){
				$('#sign').attr('class', 'glyphicon glyphicon-chevron-right');
			});	
		}
		
	});
	// $('#totalUserOnlineContent').animate({left:'toggle'},350);

}])