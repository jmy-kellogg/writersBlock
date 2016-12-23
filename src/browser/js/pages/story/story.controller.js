'use strict';

app.controller('StoryCtl', function($scope, $state, $rootScope, $stateParams, StoryFactory) {
	 
	StoryFactory.getOne($stateParams.storyId)
	.then(function(story){
		$rootScope.story = story.data;
		$(window).scrollTop(0);
	})

});
