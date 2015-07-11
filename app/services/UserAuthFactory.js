angular.module('ServiceModule')
.factory('UserAuthFactory', ['Base_URL', '$localStorage', '$http', 'AuthenticationFactory', '$state', function(baseUrl, $localStorage, $http, AuthenticationFactory, $state){
	return {
		login: function(email, password){
			return $http.post(baseUrl + '/login', 
				{
					email: email,
					password: password
				}
			).success(function(response){
				AuthenticationFactory.setLogged(true);
				AuthenticationFactory.setUser(response.user);
				AuthenticationFactory.setToken(response.token);

				$localStorage.user = response.user;
				$localStorage.token = response.token;

				return response;
			}).error(function(error, status){

				return error;
			});
		},

		logout: function(){
			if (AuthenticationFactory.isLogged()){
				AuthenticationFactory.setLogged(false);
				AuthenticationFactory.setUser({});
				AuthenticationFactory.setToken('');

				delete $localStorage.token;
				delete $localStorage.user;

				$state.go('app.login');
			}
		},

		signup: function(user){
			return $http.post(baseUrl + '/signup', user);
		},

		checkEmail: function(email){
			return $http.post(baseUrl + '/checkemail', 
				{
					email: email
				}
			);
		}
	}
}])