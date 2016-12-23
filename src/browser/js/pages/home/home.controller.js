'use strict';

app.controller('HomeCtrl', function($scope, $state, $stateParams,StoryFactory) {
	
	var pullStories = function(){
	StoryFactory.getAll()
		.then(function(stories){
			$scope.stories = stories.data;
			return stories
		})
	}
	pullStories();

	$scope.addStory = function (){
		var newStory = $scope.newStory
		StoryFactory.addOne({title: newStory.title, banner: newStory.banner, summary: newStory.summary})
		.then(function(resStory){
			$('#myModal').modal('hide')
			location.reload();
			return resStory			
		})
		$scope.newStory = {};
	}
});