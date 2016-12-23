'use strict';
app.directive('navbar', function($rootScope) {

    return {
        restrict: 'E',
        scope: { searchBoxResult: '=' },
        templateUrl: '/js/directives/navbar/navbar.html',
        link: function(scope) {

            // scope.user = null;

            // scope.isLoggedIn = function() {
            //     return AuthService.isAuthenticated();
            // };

            // scope.logout = function() {
            //     AuthService.logout().then(function() {
            //         $state.go('search');
            //     });
            // };

            // var setUser = function() {
            //     AuthService.getLoggedInUser().then(function(user) {
            //         scope.user = user;
            //     });
            // };

            // var removeUser = function() {
            //     scope.user = null;
            // };

            // setUser();

            // $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            // $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            // $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});
