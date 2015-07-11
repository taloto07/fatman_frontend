angular.module('ServiceModule')
.factory('TokenInterceptor', ['$q', '$localStorage', '$injector', function($q, $localStorage, $injector){

	return {
		request: function(config){
			
			config.headers = config.headers || {};

			if ($localStorage.token){
				config.headers['X-Access-Token'] = $localStorage.token;
				// config.headers['Content-Type'] = 'application/json';
			}

			return config || $q.when(config);
		},

		responseError: function(rejection){
			//expired 
			if (rejection.status == 401){
				
				$injector.get('UserAuthFactory').logout();

				$injector.get('$state').transitionTo('app.login');

			}

			return $q.reject(rejection);
		}
	}

}])