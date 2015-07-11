angular.module('ServiceModule').
factory('UserCountSocket', ['socketFactory', 'REMOTE_SERVER', function(socketFactory, REMOTE_SERVER){
	var userCountIoSocket = io.connect(REMOTE_SERVER);

	userCountSocket = socketFactory({
		ioSocket: userCountIoSocket
	});

	return userCountSocket;
}]);