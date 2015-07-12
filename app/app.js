angular.module('Fatman', ['ui.router', 'ngStorage', 'wu.masonry', 'ControllerModule', 'ServiceModule', 'DirectiveModule', 'ngFileUpload', 'btford.socket-io'])

.config(['$urlRouterProvider', '$stateProvider', '$httpProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $httpProvider, $locationProvider){
	$locationProvider.html5Mode(true);

	// intercept request with token
	$httpProvider.interceptors.push('TokenInterceptor');

	$urlRouterProvider.otherwise('/');

	$stateProvider

	.state('app', {
		url: '/',
		views: {
			'menu': {
				templateUrl: 'app/views/layouts/menu.html',
				controller: 'MenuController'
			},

			'content': {
				templateUrl: 'app/views/home.html',
				controller: 'HomeController'
			},

			'footer': {
				templateUrl: 'app/views/layouts/footer.html'
			}
		},
		data: {
			pageTitle: 'HOME'
		}
	})

	.state('app.about', {
		url: 'about',
		views: {
			'content@': {
				templateUrl: 'app/views/about.html'
			}
		},
		data: {
			pageTitle: 'ABOUT'
		}
	})

	.state('app.contact', {
		url: 'contact',
		views: {
			'content@': {
				templateUrl: 'app/views/contact.html'
			}
		},
		data: {
			pageTitle: 'CONTACT'
		}
	})

	.state('app.login', {
		url: 'login',
		views: {
			'content@': {
				templateUrl: 'app/views/login.html',
				controller: 'LoginController'
			}
		},
		data: {
			pageTitle: 'LOGIN',
			requireLogged: false
		}
	})

	.state('app.logout', {
		url: 'logout',
		views: {
			'content@': {
				controller: 'LogoutController'
			}
		},
		data: {
			requireLogged: true,
			pageTitle: 'LOGOUT'
		}
	})

	.state('app.signup', {
		url: 'signup',
		views: {
			'content@': {
				templateUrl: 'app/views/signup.html',
				controller: 'SignupController'
			}
		},
		data: {
			pageTitle: 'SIGNUP'
		}
	})

	.state('app.post', {
		url: 'post',
		views: {
			'content@': {
				templateUrl: 'app/views/upload.html',
				controller: 'UploadController'
			}
		},
		data: {
			requireLogged: true,
			pageTitle: 'POST'
		}
	})

	.state('app.display', {
		url: 'display/:id',
		views: {
			'content@': {
				templateUrl: 'app/views/display.html',
				controller: 'DisplayController'
			}
		},
		data: {
			pageTitle: 'DISPLAY'
		}
	})

	.state('app.search', {
		url: 'search?keyword&location&category&sort',
		views:{
			'content@': {
				templateUrl: 'app/views/search.html',
				controller: 'SearchController'
			}
		}
	})

	.state('app.setting', {
		url: 'setting',
		views: {
			'content@': {
				templateUrl: 'app/views/setting/setting.html',
				controller: 'SettingController'
			}
		},
		data: {
			requireLogged: true,
			pageTitle: 'SETTING'	
		}
	})

	.state('app.setting.account', {
		url: '/account',
		templateUrl: 'app/views/setting/account.html',
		controller: 'AccountController',
		data: {
			requireLogged: true,
			pageTitle: 'ACCOUNT'	
		}
	})

	.state('app.setting.post', {
		url: '/post',
		templateUrl: 'app/views/setting/post.html',
		controller: 'PostController',
		data: {
			requireLogged: true,
			pageTitle: 'POST'	
		}
	})
}])

.run(['$rootScope', '$state', 'AuthenticationFactory', 'FlashFactory', function($rootScope, $state, AuthenticationFactory, FlashFactory){

	// when page is refreshed, check if user is already logged in
	AuthenticationFactory.check();

	$rootScope.$on('$stateChangeStart', function(event, toState, toParams){
				
		var pageTitle = toState.data.pageTitle;
		var requireLogged = toState.data.requireLogged;

		// set page title for brwoser tab
		if (pageTitle){
			$rootScope.pageTitle = pageTitle;
		}

		// check for route that required loggin, if not route to login page
		if (requireLogged && !AuthenticationFactory.isLogged()){
			event.preventDefault();
			FlashFactory.setRoute(toState.name);
			$state.go('app.login');
		}
		
	});

	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
		$rootScope.showMenu = AuthenticationFactory.isLogged();
		$rootScope.userMenu = AuthenticationFactory.getUser();

		if (AuthenticationFactory.isLogged()){
			if (toState.name == 'app.login' || toState.name == 'app.signup'){
				event.preventDefault();

				$state.go('app');
			}
		}
	});
}])

