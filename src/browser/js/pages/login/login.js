'use strict';

app.config(function($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: '/js/pages/login/login.html',
        controller: 'LoginCtrl'
    });

});