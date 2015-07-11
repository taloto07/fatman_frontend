angular.module('ServiceModule')
.factory('AuthenticationFactory', ['Base_URL', '$localStorage', function(baseUrl, $localStorage){
	var isLogged = false;
	var currentUser = {};
	var token = '';

	return{

		check: function(){
			if ($localStorage.token && $localStorage.user){

				this.setLogged(true);
				this.setUser($localStorage.user);
				this.setToken($localStorage.token);

			}else{

				this.setLogged(false);
				this.setUser({});
				this.setToken('');

				delete $localStorage.token;
				delete $localStorage.user;

			}
		},

		setLogged: function(logged){
			isLogged = logged;
		},

		isLogged: function(){
			return isLogged;
		},

		setUser: function(user){
			currentUser = user;
		},

		getUser: function(){
			return currentUser;
		},

		setToken: function(myToken){
			token = myToken;
		},

		getToken: function(){
			return token;
		}
	}
}])