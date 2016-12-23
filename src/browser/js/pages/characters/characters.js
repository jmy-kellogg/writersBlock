'use strict';

app.config(function($stateProvider) {

    $stateProvider.state('characters', {
        url: '/story/:storyId/characters',
        templateUrl: '/js/pages/characters/characters.html',
        controller: 'CharactersCtrl'
    });

});