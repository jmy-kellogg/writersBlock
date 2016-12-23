'use strict';

app.controller('HomeCtrl', function($scope, $state, StoryFactory) {
	StoryFactory.getAll()
		.then(function(stories){
			$scope.stories = stories.data
		})
});