angular.module('ServiceModule')
.factory('UserFactory', ['$q', '$http', 'Base_URL', function($q, $http, Base_URL){
	return {
		getUser: function(url){
			return $http.get(Base_URL + url);
		}
	}
}])