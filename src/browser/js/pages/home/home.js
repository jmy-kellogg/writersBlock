'use strict';

app.config(function($stateProvider) {

    $stateProvider.state('home', {
        url: '/story',
        templateUrl: '/js/pages/home/home.html',
        controller: 'HomeCtrl'
    });

});