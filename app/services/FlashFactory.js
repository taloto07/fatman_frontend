angular.module('ServiceModule').
factory('FlashFactory', [function(){
	var route = '';

	return {
		getRoute: function(){
			var returnRoute = route;
			route = '';
			return returnRoute;
		},

		setRoute: function(url){
			route = url;
		}
	}
}])