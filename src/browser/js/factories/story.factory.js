app.factory('StoryFactory', function($http) {
	var storyObj = {};

	storyObj.getAll= function(){
		return $http.get('/api/stories/')
	}
	storyObj.getOne= function(id){
		return $http.get('/api/stories/'+id)
	}
	storyObj.addOne= function(newStory){
		return $http.post('/api/stories/', newStory)

	}
	return storyObj
})