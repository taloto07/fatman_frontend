angular.module('ServiceModule').
factory('DataFactory', ['$http', 'Base_URL', 'Upload', function($http, Base_URL, Upload){
	return {
		getPosts: function(){
			return $http.get(Base_URL + '/posts');
		},

		search: function(filters){
			return $http.get(Base_URL + '/search', {params: filters});
		},

		getLocations: function(){
			return $http.get(Base_URL + '/locations');
		},

		getCategory: function(){
			return $http.get(Base_URL + '/subcategory');
		},

		getCategories: function(){
			return $http.get(Base_URL + '/categories');
		},

		upload: function(data, files){
			return Upload.upload({
				url: Base_URL + '/upload',
				file: files,
				fields: data
			});
		},

		editPost: function(data, files, postId){
			return Upload.upload({
				url: Base_URL + '/post/' + postId,
				file: files,
				fields: data,
				method: 'PUT'
			});
		},

		getPost: function(id){
			return $http.get(Base_URL + '/post/' + id);
		},

		getUserInfo: function(id){
			return $http.get(Base_URL + '/user/' + id);
		},

		editAccount: function(id, data){
			return $http.put(Base_URL + '/user/' + id, data);
		},

		getUserPosts: function(id){
			return $http.get(Base_URL + '/user/' + id + '/posts');
		},

		deleteImage : function(postId, imageIndex){
			return $http.delete(Base_URL + '/post/' + postId + '/image/' + imageIndex);
		}
	}
}]);