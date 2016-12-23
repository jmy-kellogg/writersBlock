'use strict';

app.config(function($stateProvider) {

    $stateProvider.state('story', {
        url: '/story/:storyId',
        templateUrl: '/js/pages/story/story.html',
        controller: 'StoryCtl'
    });

});