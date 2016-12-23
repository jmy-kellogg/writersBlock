'use strict';

window.app = angular.module('AngularApp', ['ui.router', 'ui.bootstrap']);

app.config(function ($urlRouterProvider, $locationProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/story');
    // Trigger page refresh when accessing an OAuth route
    $urlRouterProvider.when('/auth/:provider', function () {
        window.location.reload();
    });
});

//This app.run is for controlling access to specific states.
// app.run(function ($rootScope, AuthService, $state) {

//     // The given state requires an authenticated user.
//     const destinationStateRequiresAuth = function (state) {
//         return state.data && state.data.authenticate;
//     };

//     // $stateChangeStart is an event fired
//     // whenever the process of changing a state begins.
//     $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

//         if (!destinationStateRequiresAuth(toState)) {
//             // The destination state does not require authentication
//             // Short circuit with return.
//             return;
//         }

//         if (AuthService.isAuthenticated()) {
//             // The user is authenticated.
//             // Short circuit with return.
//             return;
//         }

//         // Cancel navigating to new state.
//         event.preventDefault();

//         AuthService.getLoggedInUser().then(function (user) {
//             // If a user is retrieved, then renavigate to the destination
//             // (the second time, AuthService.isAuthenticated() will work)
//             // otherwise, if no user is logged in, go to "login" state.
//             if (user) {
//                 $state.go(toState.name, toParams);
//             } else {
//                 $state.go('login');
//             }
//         });

//     });

//});

app.factory('StoryFactory', function ($http) {
    var storyObj = {};

    storyObj.getAll = function () {
        return $http.get('/api/stories/');
    };
    storyObj.getOne = function (id) {
        return $http.get('/api/stories/' + id);
    };
    return storyObj;
});

// (function() {

//     'use strict';

//     // Hope you didn't forget Angular! Duh-doy.
//     if (!window.angular) throw new Error('I can\'t find Angular!');

//     var app = angular.module('fsaPreBuilt', []);

//     app.factory('Socket', function() {
//         if (!window.io) throw new Error('socket.io not found!');
//         return window.io(window.location.origin);
//     });

//     // AUTH_EVENTS is used throughout our app to
//     // broadcast and listen from and to the $rootScope
//     // for important events about authentication flow.
//     app.constant('AUTH_EVENTS', {
//         loginSuccess: 'auth-login-success',
//         loginFailed: 'auth-login-failed',
//         logoutSuccess: 'auth-logout-success',
//         sessionTimeout: 'auth-session-timeout',
//         notAuthenticated: 'auth-not-authenticated',
//         notAuthorized: 'auth-not-authorized'
//     });

//     app.factory('AuthInterceptor', function($rootScope, $q, AUTH_EVENTS) {
//         var statusDict = {
//             401: AUTH_EVENTS.notAuthenticated,
//             403: AUTH_EVENTS.notAuthorized,
//             419: AUTH_EVENTS.sessionTimeout,
//             440: AUTH_EVENTS.sessionTimeout
//         };
//         return {
//             responseError: function(response) {
//                 $rootScope.$broadcast(statusDict[response.status], response);
//                 return $q.reject(response)
//             }
//         };
//     });

//     app.config(function($httpProvider) {
//         $httpProvider.interceptors.push([
//             '$injector',
//             function($injector) {
//                 return $injector.get('AuthInterceptor');
//             }
//         ]);
//     });

//     app.service('AuthService', function($http, Session, $rootScope, AUTH_EVENTS, $q) {

//         function onSuccessfulLogin(response) {
//             var user = response.data.user;
//             Session.create(user);
//             $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
//             return user;
//         }

//         // Uses the session factory to see if an
//         // authenticated user is currently registered.
//         this.isAuthenticated = function() {
//             return !!Session.user;
//         };

//         this.getLoggedInUser = function(fromServer) {

//             // If an authenticated session exists, we
//             // return the user attached to that session
//             // with a promise. This ensures that we can
//             // always interface with this method asynchronously.

//             // Optionally, if true is given as the fromServer parameter,
//             // then this cached value will not be used.

//             if (this.isAuthenticated() && fromServer !== true) {
//                 return $q.when(Session.user);
//             }

//             // Make request GET /session.
//             // If it returns a user, call onSuccessfulLogin with the response.
//             // If it returns a 401 response, we catch it and instead resolve to null.
//             return $http.get('/session').then(onSuccessfulLogin).catch(function() {
//                 return null;
//             });

//         };

//         this.login = function(credentials) {
//             return $http.post('/login', credentials)
//                 .then(onSuccessfulLogin)
//                 .catch(function() {
//                     return $q.reject({ message: 'Invalid login credentials.' });
//                 });
//         };

//         this.logout = function() {
//             return $http.get('/logout').then(function() {
//                 Session.destroy();
//                 $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
//             });
//         };

//     });

//     app.service('Session', function($rootScope, AUTH_EVENTS) {

//         var self = this;

//         $rootScope.$on(AUTH_EVENTS.notAuthenticated, function() {
//             self.destroy();
//         });

//         $rootScope.$on(AUTH_EVENTS.sessionTimeout, function() {
//             self.destroy();
//         });

//         this.user = null;

//         this.create = function(user) {
//             this.user = user;
//         };

//         this.destroy = function() {
//             this.user = null;
//         };

//     });

// }());
'use strict';
app.directive('navbar', function ($rootScope) {

    return {
        restrict: 'E',
        scope: { searchBoxResult: '=' },
        templateUrl: '/js/directives/navbar/navbar.html',
        link: function link(scope) {

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

'use strict';
app.directive('banner', function () {
    return {
        restrict: 'E',
        templateUrl: '/js/directives/banner/banner.html',
        link: function link(scope, element, attrs) {
            scope.banner_url = 'http://www.f-covers.com/cover/abstract-book-facebook-cover-timeline-banner-for-fb.jpg';
        }

    };
});

'use strict';

app.controller('CharactersCtrl', function ($scope, $state) {});
'use strict';

app.config(function ($stateProvider) {

    $stateProvider.state('characters', {
        url: '/story/:storyId/characters',
        templateUrl: '/js/pages/characters/characters.html',
        controller: 'CharactersCtrl'
    });
});
'use strict';

app.controller('HomeCtrl', function ($scope, $state, StoryFactory) {
    StoryFactory.getAll().then(function (stories) {
        $scope.stories = stories.data;
    });
});
'use strict';

app.config(function ($stateProvider) {

    $stateProvider.state('home', {
        url: '/story',
        templateUrl: '/js/pages/home/home.html',
        controller: 'HomeCtrl'
    });
});
'use strict';

app.controller('LoginCtrl', function ($scope, AuthService, $state) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo).then(function () {
            $state.go('/story/');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });
    };
});
'use strict';

app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: '/js/pages/login/login.html',
        controller: 'LoginCtrl'
    });
});
'use strict';

app.controller('StoryCtl', function ($scope, $state, $rootScope, $stateParams, StoryFactory) {

    StoryFactory.getOne($stateParams.storyId).then(function (story) {
        $rootScope.story = story.data;
    });
});

'use strict';

app.config(function ($stateProvider) {

    $stateProvider.state('story', {
        url: '/story/:storyId',
        templateUrl: '/js/pages/story/story.html',
        controller: 'StoryCtl'
    });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImZhY3Rvcmllcy9zdG9yeS5mYWN0b3J5LmpzIiwiZnNhL2ZzYS1wcmUtYnVpbHQuanMiLCJkaXJlY3RpdmVzL25hdmJhci9uYXZiYXIuanMiLCJkaXJlY3RpdmVzL2Jhbm5lci9iYW5uZXIuanMiLCJwYWdlcy9jaGFyYWN0ZXJzL2NoYXJhY3RlcnMuY29udHJvbGxlci5qcyIsInBhZ2VzL2NoYXJhY3RlcnMvY2hhcmFjdGVycy5qcyIsInBhZ2VzL2hvbWUvaG9tZS5jb250cm9sbGVyLmpzIiwicGFnZXMvaG9tZS9ob21lLmpzIiwicGFnZXMvbG9naW4vbG9naW4uY29udHJvbGxlci5qcyIsInBhZ2VzL2xvZ2luL2xvZ2luLmpzIiwicGFnZXMvc3Rvcnkvc3RvcnkuY29udHJvbGxlci5qcyIsInBhZ2VzL3N0b3J5L3N0b3J5LmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsImFwcCIsImFuZ3VsYXIiLCJtb2R1bGUiLCJjb25maWciLCIkdXJsUm91dGVyUHJvdmlkZXIiLCIkbG9jYXRpb25Qcm92aWRlciIsImh0bWw1TW9kZSIsIm90aGVyd2lzZSIsIndoZW4iLCJsb2NhdGlvbiIsInJlbG9hZCIsImZhY3RvcnkiLCIkaHR0cCIsInN0b3J5T2JqIiwiZ2V0QWxsIiwiZ2V0IiwiZ2V0T25lIiwiaWQiLCJkaXJlY3RpdmUiLCIkcm9vdFNjb3BlIiwicmVzdHJpY3QiLCJzY29wZSIsInNlYXJjaEJveFJlc3VsdCIsInRlbXBsYXRlVXJsIiwibGluayIsImVsZW1lbnQiLCJhdHRycyIsImJhbm5lcl91cmwiLCJjb250cm9sbGVyIiwiJHNjb3BlIiwiJHN0YXRlIiwiJHN0YXRlUHJvdmlkZXIiLCJzdGF0ZSIsInVybCIsIlN0b3J5RmFjdG9yeSIsInRoZW4iLCJzdG9yaWVzIiwiZGF0YSIsIkF1dGhTZXJ2aWNlIiwibG9naW4iLCJlcnJvciIsInNlbmRMb2dpbiIsImxvZ2luSW5mbyIsImdvIiwiY2F0Y2giLCIkc3RhdGVQYXJhbXMiLCJzdG9yeUlkIiwi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QVZBO0FBWUEsQ0FqQkE7QUNGQTs7QUFFQXhDLElBQUFHLE1BQUEsQ0FBQSxVQUFBNEIsY0FBQSxFQUFBOztBQUVBQSxtQkFBQUMsS0FBQSxDQUFBLE9BQUEsRUFBQTtBQUNBQyxhQUFBLFFBREE7QUFFQVYscUJBQUEsNEJBRkE7QUFHQUssb0JBQUE7QUFIQSxLQUFBO0FBTUEsQ0FSQTtBQ0ZBOztBQUVBNUIsSUFBQTRCLFVBQUEsQ0FBQSxVQUFBLEVBQUEsVUFBQUMsTUFBQSxFQUFBQyxNQUFBLEVBQUFYLFVBQUEsRUFBQTBCLFlBQUEsRUFBQVgsWUFBQSxFQUFBOztBQUVBQSxpQkFBQWxCLE1BQUEsQ0FBQTZCLGFBQUFDLE9BQUEsRUFDQVgsSUFEQSxDQUNBLFVBQUFZLEtBQUEsRUFBQTtBQUNBNUIsbUJBQUE0QixLQUFBLEdBQUFBLE1BQUFWLElBQUE7QUFDQSxLQUhBO0FBT0EsQ0FUQTs7QUNGQTs7QUFFQXJDLElBQUFHLE1BQUEsQ0FBQSxVQUFBNEIsY0FBQSxFQUFBOztBQUVBQSxtQkFBQUMsS0FBQSxDQUFBLE9BQUEsRUFBQTtBQUNBQyxhQUFBLGlCQURBO0FBRUFWLHFCQUFBLDRCQUZBO0FBR0FLLG9CQUFBO0FBSEEsS0FBQTtBQU1BLENBUkEiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG53aW5kb3cuYXBwID0gYW5ndWxhci5tb2R1bGUoJ0FuZ3VsYXJBcHAnLCBbJ3VpLnJvdXRlcicsICd1aS5ib290c3RyYXAnXSk7XG5cbmFwcC5jb25maWcoZnVuY3Rpb24gKCR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcbiAgICAvLyBUaGlzIHR1cm5zIG9mZiBoYXNoYmFuZyB1cmxzICgvI2Fib3V0KSBhbmQgY2hhbmdlcyBpdCB0byBzb21ldGhpbmcgbm9ybWFsICgvYWJvdXQpXG4gICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xuICAgIC8vIElmIHdlIGdvIHRvIGEgVVJMIHRoYXQgdWktcm91dGVyIGRvZXNuJ3QgaGF2ZSByZWdpc3RlcmVkLCBnbyB0byB0aGUgXCIvXCIgdXJsLlxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9zdG9yeScpO1xuICAgIC8vIFRyaWdnZXIgcGFnZSByZWZyZXNoIHdoZW4gYWNjZXNzaW5nIGFuIE9BdXRoIHJvdXRlXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLndoZW4oJy9hdXRoLzpwcm92aWRlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH0pO1xufSk7XG5cblxuLy9UaGlzIGFwcC5ydW4gaXMgZm9yIGNvbnRyb2xsaW5nIGFjY2VzcyB0byBzcGVjaWZpYyBzdGF0ZXMuXG4vLyBhcHAucnVuKGZ1bmN0aW9uICgkcm9vdFNjb3BlLCBBdXRoU2VydmljZSwgJHN0YXRlKSB7XG5cbi8vICAgICAvLyBUaGUgZ2l2ZW4gc3RhdGUgcmVxdWlyZXMgYW4gYXV0aGVudGljYXRlZCB1c2VyLlxuLy8gICAgIGNvbnN0IGRlc3RpbmF0aW9uU3RhdGVSZXF1aXJlc0F1dGggPSBmdW5jdGlvbiAoc3RhdGUpIHtcbi8vICAgICAgICAgcmV0dXJuIHN0YXRlLmRhdGEgJiYgc3RhdGUuZGF0YS5hdXRoZW50aWNhdGU7XG4vLyAgICAgfTtcblxuLy8gICAgIC8vICRzdGF0ZUNoYW5nZVN0YXJ0IGlzIGFuIGV2ZW50IGZpcmVkXG4vLyAgICAgLy8gd2hlbmV2ZXIgdGhlIHByb2Nlc3Mgb2YgY2hhbmdpbmcgYSBzdGF0ZSBiZWdpbnMuXG4vLyAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN0YXJ0JywgZnVuY3Rpb24gKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcykge1xuXG4vLyAgICAgICAgIGlmICghZGVzdGluYXRpb25TdGF0ZVJlcXVpcmVzQXV0aCh0b1N0YXRlKSkge1xuLy8gICAgICAgICAgICAgLy8gVGhlIGRlc3RpbmF0aW9uIHN0YXRlIGRvZXMgbm90IHJlcXVpcmUgYXV0aGVudGljYXRpb25cbi8vICAgICAgICAgICAgIC8vIFNob3J0IGNpcmN1aXQgd2l0aCByZXR1cm4uXG4vLyAgICAgICAgICAgICByZXR1cm47XG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICBpZiAoQXV0aFNlcnZpY2UuaXNBdXRoZW50aWNhdGVkKCkpIHtcbi8vICAgICAgICAgICAgIC8vIFRoZSB1c2VyIGlzIGF1dGhlbnRpY2F0ZWQuXG4vLyAgICAgICAgICAgICAvLyBTaG9ydCBjaXJjdWl0IHdpdGggcmV0dXJuLlxuLy8gICAgICAgICAgICAgcmV0dXJuO1xuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgLy8gQ2FuY2VsIG5hdmlnYXRpbmcgdG8gbmV3IHN0YXRlLlxuLy8gICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4vLyAgICAgICAgIEF1dGhTZXJ2aWNlLmdldExvZ2dlZEluVXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbi8vICAgICAgICAgICAgIC8vIElmIGEgdXNlciBpcyByZXRyaWV2ZWQsIHRoZW4gcmVuYXZpZ2F0ZSB0byB0aGUgZGVzdGluYXRpb25cbi8vICAgICAgICAgICAgIC8vICh0aGUgc2Vjb25kIHRpbWUsIEF1dGhTZXJ2aWNlLmlzQXV0aGVudGljYXRlZCgpIHdpbGwgd29yaylcbi8vICAgICAgICAgICAgIC8vIG90aGVyd2lzZSwgaWYgbm8gdXNlciBpcyBsb2dnZWQgaW4sIGdvIHRvIFwibG9naW5cIiBzdGF0ZS5cbi8vICAgICAgICAgICAgIGlmICh1c2VyKSB7XG4vLyAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKHRvU3RhdGUubmFtZSwgdG9QYXJhbXMpO1xuLy8gICAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH0pO1xuXG4vLyAgICAgfSk7XG5cbi8vfSk7XG4iLCJhcHAuZmFjdG9yeSgnU3RvcnlGYWN0b3J5JywgZnVuY3Rpb24oJGh0dHApIHtcblx0dmFyIHN0b3J5T2JqID0ge307XG5cblx0c3RvcnlPYmouZ2V0QWxsPSBmdW5jdGlvbigpe1xuXHRcdHJldHVybiAkaHR0cC5nZXQoJy9hcGkvc3Rvcmllcy8nKVxuXHR9XG5cdHN0b3J5T2JqLmdldE9uZT0gZnVuY3Rpb24oaWQpe1xuXHRcdHJldHVybiAkaHR0cC5nZXQoJy9hcGkvc3Rvcmllcy8nK2lkKVxuXHR9XG5cdHJldHVybiBzdG9yeU9ialxufSkiLCIvLyAoZnVuY3Rpb24oKSB7XG5cbi8vICAgICAndXNlIHN0cmljdCc7XG5cbi8vICAgICAvLyBIb3BlIHlvdSBkaWRuJ3QgZm9yZ2V0IEFuZ3VsYXIhIER1aC1kb3kuXG4vLyAgICAgaWYgKCF3aW5kb3cuYW5ndWxhcikgdGhyb3cgbmV3IEVycm9yKCdJIGNhblxcJ3QgZmluZCBBbmd1bGFyIScpO1xuXG4vLyAgICAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdmc2FQcmVCdWlsdCcsIFtdKTtcblxuLy8gICAgIGFwcC5mYWN0b3J5KCdTb2NrZXQnLCBmdW5jdGlvbigpIHtcbi8vICAgICAgICAgaWYgKCF3aW5kb3cuaW8pIHRocm93IG5ldyBFcnJvcignc29ja2V0LmlvIG5vdCBmb3VuZCEnKTtcbi8vICAgICAgICAgcmV0dXJuIHdpbmRvdy5pbyh3aW5kb3cubG9jYXRpb24ub3JpZ2luKTtcbi8vICAgICB9KTtcblxuLy8gICAgIC8vIEFVVEhfRVZFTlRTIGlzIHVzZWQgdGhyb3VnaG91dCBvdXIgYXBwIHRvXG4vLyAgICAgLy8gYnJvYWRjYXN0IGFuZCBsaXN0ZW4gZnJvbSBhbmQgdG8gdGhlICRyb290U2NvcGVcbi8vICAgICAvLyBmb3IgaW1wb3J0YW50IGV2ZW50cyBhYm91dCBhdXRoZW50aWNhdGlvbiBmbG93LlxuLy8gICAgIGFwcC5jb25zdGFudCgnQVVUSF9FVkVOVFMnLCB7XG4vLyAgICAgICAgIGxvZ2luU3VjY2VzczogJ2F1dGgtbG9naW4tc3VjY2VzcycsXG4vLyAgICAgICAgIGxvZ2luRmFpbGVkOiAnYXV0aC1sb2dpbi1mYWlsZWQnLFxuLy8gICAgICAgICBsb2dvdXRTdWNjZXNzOiAnYXV0aC1sb2dvdXQtc3VjY2VzcycsXG4vLyAgICAgICAgIHNlc3Npb25UaW1lb3V0OiAnYXV0aC1zZXNzaW9uLXRpbWVvdXQnLFxuLy8gICAgICAgICBub3RBdXRoZW50aWNhdGVkOiAnYXV0aC1ub3QtYXV0aGVudGljYXRlZCcsXG4vLyAgICAgICAgIG5vdEF1dGhvcml6ZWQ6ICdhdXRoLW5vdC1hdXRob3JpemVkJ1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLmZhY3RvcnkoJ0F1dGhJbnRlcmNlcHRvcicsIGZ1bmN0aW9uKCRyb290U2NvcGUsICRxLCBBVVRIX0VWRU5UUykge1xuLy8gICAgICAgICB2YXIgc3RhdHVzRGljdCA9IHtcbi8vICAgICAgICAgICAgIDQwMTogQVVUSF9FVkVOVFMubm90QXV0aGVudGljYXRlZCxcbi8vICAgICAgICAgICAgIDQwMzogQVVUSF9FVkVOVFMubm90QXV0aG9yaXplZCxcbi8vICAgICAgICAgICAgIDQxOTogQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXQsXG4vLyAgICAgICAgICAgICA0NDA6IEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0XG4vLyAgICAgICAgIH07XG4vLyAgICAgICAgIHJldHVybiB7XG4vLyAgICAgICAgICAgICByZXNwb25zZUVycm9yOiBmdW5jdGlvbihyZXNwb25zZSkge1xuLy8gICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChzdGF0dXNEaWN0W3Jlc3BvbnNlLnN0YXR1c10sIHJlc3BvbnNlKTtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlc3BvbnNlKVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9O1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLmNvbmZpZyhmdW5jdGlvbigkaHR0cFByb3ZpZGVyKSB7XG4vLyAgICAgICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goW1xuLy8gICAgICAgICAgICAgJyRpbmplY3RvcicsXG4vLyAgICAgICAgICAgICBmdW5jdGlvbigkaW5qZWN0b3IpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJGluamVjdG9yLmdldCgnQXV0aEludGVyY2VwdG9yJyk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIF0pO1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLnNlcnZpY2UoJ0F1dGhTZXJ2aWNlJywgZnVuY3Rpb24oJGh0dHAsIFNlc3Npb24sICRyb290U2NvcGUsIEFVVEhfRVZFTlRTLCAkcSkge1xuXG4vLyAgICAgICAgIGZ1bmN0aW9uIG9uU3VjY2Vzc2Z1bExvZ2luKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgICAgICB2YXIgdXNlciA9IHJlc3BvbnNlLmRhdGEudXNlcjtcbi8vICAgICAgICAgICAgIFNlc3Npb24uY3JlYXRlKHVzZXIpO1xuLy8gICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KEFVVEhfRVZFTlRTLmxvZ2luU3VjY2Vzcyk7XG4vLyAgICAgICAgICAgICByZXR1cm4gdXNlcjtcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIC8vIFVzZXMgdGhlIHNlc3Npb24gZmFjdG9yeSB0byBzZWUgaWYgYW5cbi8vICAgICAgICAgLy8gYXV0aGVudGljYXRlZCB1c2VyIGlzIGN1cnJlbnRseSByZWdpc3RlcmVkLlxuLy8gICAgICAgICB0aGlzLmlzQXV0aGVudGljYXRlZCA9IGZ1bmN0aW9uKCkge1xuLy8gICAgICAgICAgICAgcmV0dXJuICEhU2Vzc2lvbi51c2VyO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMuZ2V0TG9nZ2VkSW5Vc2VyID0gZnVuY3Rpb24oZnJvbVNlcnZlcikge1xuXG4vLyAgICAgICAgICAgICAvLyBJZiBhbiBhdXRoZW50aWNhdGVkIHNlc3Npb24gZXhpc3RzLCB3ZVxuLy8gICAgICAgICAgICAgLy8gcmV0dXJuIHRoZSB1c2VyIGF0dGFjaGVkIHRvIHRoYXQgc2Vzc2lvblxuLy8gICAgICAgICAgICAgLy8gd2l0aCBhIHByb21pc2UuIFRoaXMgZW5zdXJlcyB0aGF0IHdlIGNhblxuLy8gICAgICAgICAgICAgLy8gYWx3YXlzIGludGVyZmFjZSB3aXRoIHRoaXMgbWV0aG9kIGFzeW5jaHJvbm91c2x5LlxuXG4vLyAgICAgICAgICAgICAvLyBPcHRpb25hbGx5LCBpZiB0cnVlIGlzIGdpdmVuIGFzIHRoZSBmcm9tU2VydmVyIHBhcmFtZXRlcixcbi8vICAgICAgICAgICAgIC8vIHRoZW4gdGhpcyBjYWNoZWQgdmFsdWUgd2lsbCBub3QgYmUgdXNlZC5cblxuLy8gICAgICAgICAgICAgaWYgKHRoaXMuaXNBdXRoZW50aWNhdGVkKCkgJiYgZnJvbVNlcnZlciAhPT0gdHJ1ZSkge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkcS53aGVuKFNlc3Npb24udXNlcik7XG4vLyAgICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAgIC8vIE1ha2UgcmVxdWVzdCBHRVQgL3Nlc3Npb24uXG4vLyAgICAgICAgICAgICAvLyBJZiBpdCByZXR1cm5zIGEgdXNlciwgY2FsbCBvblN1Y2Nlc3NmdWxMb2dpbiB3aXRoIHRoZSByZXNwb25zZS5cbi8vICAgICAgICAgICAgIC8vIElmIGl0IHJldHVybnMgYSA0MDEgcmVzcG9uc2UsIHdlIGNhdGNoIGl0IGFuZCBpbnN0ZWFkIHJlc29sdmUgdG8gbnVsbC5cbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9zZXNzaW9uJykudGhlbihvblN1Y2Nlc3NmdWxMb2dpbikuY2F0Y2goZnVuY3Rpb24oKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4vLyAgICAgICAgICAgICB9KTtcblxuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMubG9naW4gPSBmdW5jdGlvbihjcmVkZW50aWFscykge1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9sb2dpbicsIGNyZWRlbnRpYWxzKVxuLy8gICAgICAgICAgICAgICAgIC50aGVuKG9uU3VjY2Vzc2Z1bExvZ2luKVxuLy8gICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbigpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdCh7IG1lc3NhZ2U6ICdJbnZhbGlkIGxvZ2luIGNyZWRlbnRpYWxzLicgfSk7XG4vLyAgICAgICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5sb2dvdXQgPSBmdW5jdGlvbigpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9sb2dvdXQnKS50aGVuKGZ1bmN0aW9uKCkge1xuLy8gICAgICAgICAgICAgICAgIFNlc3Npb24uZGVzdHJveSgpO1xuLy8gICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChBVVRIX0VWRU5UUy5sb2dvdXRTdWNjZXNzKTtcbi8vICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuc2VydmljZSgnU2Vzc2lvbicsIGZ1bmN0aW9uKCRyb290U2NvcGUsIEFVVEhfRVZFTlRTKSB7XG5cbi8vICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4vLyAgICAgICAgICRyb290U2NvcGUuJG9uKEFVVEhfRVZFTlRTLm5vdEF1dGhlbnRpY2F0ZWQsIGZ1bmN0aW9uKCkge1xuLy8gICAgICAgICAgICAgc2VsZi5kZXN0cm95KCk7XG4vLyAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgICRyb290U2NvcGUuJG9uKEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0LCBmdW5jdGlvbigpIHtcbi8vICAgICAgICAgICAgIHNlbGYuZGVzdHJveSgpO1xuLy8gICAgICAgICB9KTtcblxuLy8gICAgICAgICB0aGlzLnVzZXIgPSBudWxsO1xuXG4vLyAgICAgICAgIHRoaXMuY3JlYXRlID0gZnVuY3Rpb24odXNlcikge1xuLy8gICAgICAgICAgICAgdGhpcy51c2VyID0gdXNlcjtcbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbi8vICAgICAgICAgICAgIHRoaXMudXNlciA9IG51bGw7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICB9KTtcblxuLy8gfSgpKTsiLCIndXNlIHN0cmljdCc7XG5hcHAuZGlyZWN0aXZlKCduYXZiYXInLCBmdW5jdGlvbigkcm9vdFNjb3BlKSB7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICBzY29wZTogeyBzZWFyY2hCb3hSZXN1bHQ6ICc9JyB9LFxuICAgICAgICB0ZW1wbGF0ZVVybDogJy9qcy9kaXJlY3RpdmVzL25hdmJhci9uYXZiYXIuaHRtbCcsXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlKSB7XG5cbiAgICAgICAgICAgIC8vIHNjb3BlLnVzZXIgPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBzY29wZS5pc0xvZ2dlZEluID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuIEF1dGhTZXJ2aWNlLmlzQXV0aGVudGljYXRlZCgpO1xuICAgICAgICAgICAgLy8gfTtcblxuICAgICAgICAgICAgLy8gc2NvcGUubG9nb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyAgICAgQXV0aFNlcnZpY2UubG9nb3V0KCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgJHN0YXRlLmdvKCdzZWFyY2gnKTtcbiAgICAgICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgICAgIC8vIH07XG5cbiAgICAgICAgICAgIC8vIHZhciBzZXRVc2VyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyAgICAgQXV0aFNlcnZpY2UuZ2V0TG9nZ2VkSW5Vc2VyKCkudGhlbihmdW5jdGlvbih1c2VyKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIHNjb3BlLnVzZXIgPSB1c2VyO1xuICAgICAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAgICAgLy8gfTtcblxuICAgICAgICAgICAgLy8gdmFyIHJlbW92ZVVzZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vICAgICBzY29wZS51c2VyID0gbnVsbDtcbiAgICAgICAgICAgIC8vIH07XG5cbiAgICAgICAgICAgIC8vIHNldFVzZXIoKTtcblxuICAgICAgICAgICAgLy8gJHJvb3RTY29wZS4kb24oQVVUSF9FVkVOVFMubG9naW5TdWNjZXNzLCBzZXRVc2VyKTtcbiAgICAgICAgICAgIC8vICRyb290U2NvcGUuJG9uKEFVVEhfRVZFTlRTLmxvZ291dFN1Y2Nlc3MsIHJlbW92ZVVzZXIpO1xuICAgICAgICAgICAgLy8gJHJvb3RTY29wZS4kb24oQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXQsIHJlbW92ZVVzZXIpO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuYXBwLmRpcmVjdGl2ZSgnYmFubmVyJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICcvanMvZGlyZWN0aXZlcy9iYW5uZXIvYmFubmVyLmh0bWwnLFxuICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgXHRzY29wZS5iYW5uZXJfdXJsID0gJ2h0dHA6Ly93d3cuZi1jb3ZlcnMuY29tL2NvdmVyL2Fic3RyYWN0LWJvb2stZmFjZWJvb2stY292ZXItdGltZWxpbmUtYmFubmVyLWZvci1mYi5qcGcnXG4gICAgICAgIH1cblxuICAgIH07XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcblxuYXBwLmNvbnRyb2xsZXIoJ0NoYXJhY3RlcnNDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGUpIHtcblxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKSB7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnY2hhcmFjdGVycycsIHtcbiAgICAgICAgdXJsOiAnL3N0b3J5LzpzdG9yeUlkL2NoYXJhY3RlcnMnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJy9qcy9wYWdlcy9jaGFyYWN0ZXJzL2NoYXJhY3RlcnMuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdDaGFyYWN0ZXJzQ3RybCdcbiAgICB9KTtcblxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5hcHAuY29udHJvbGxlcignSG9tZUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZSwgU3RvcnlGYWN0b3J5KSB7XG5cdFN0b3J5RmFjdG9yeS5nZXRBbGwoKVxuXHRcdC50aGVuKGZ1bmN0aW9uKHN0b3JpZXMpe1xuXHRcdFx0JHNjb3BlLnN0b3JpZXMgPSBzdG9yaWVzLmRhdGFcblx0XHR9KVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKSB7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnaG9tZScsIHtcbiAgICAgICAgdXJsOiAnL3N0b3J5JyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICcvanMvcGFnZXMvaG9tZS9ob21lLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnSG9tZUN0cmwnXG4gICAgfSk7XG5cbn0pOyIsIid1c2Ugc3RyaWN0JztcblxuYXBwLmNvbnRyb2xsZXIoJ0xvZ2luQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgQXV0aFNlcnZpY2UsICRzdGF0ZSkge1xuXG4gICAgJHNjb3BlLmxvZ2luID0ge307XG4gICAgJHNjb3BlLmVycm9yID0gbnVsbDtcblxuICAgICRzY29wZS5zZW5kTG9naW4gPSBmdW5jdGlvbihsb2dpbkluZm8pIHtcblxuICAgICAgICAkc2NvcGUuZXJyb3IgPSBudWxsO1xuXG4gICAgICAgIEF1dGhTZXJ2aWNlLmxvZ2luKGxvZ2luSW5mbykudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzdGF0ZS5nbygnL3N0b3J5LycpO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5lcnJvciA9ICdJbnZhbGlkIGxvZ2luIGNyZWRlbnRpYWxzLic7XG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKSB7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnbG9naW4nLCB7XG4gICAgICAgIHVybDogJy9sb2dpbicsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnL2pzL3BhZ2VzL2xvZ2luL2xvZ2luLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnTG9naW5DdHJsJ1xuICAgIH0pO1xuXG59KTsiLCIndXNlIHN0cmljdCc7XG5cbmFwcC5jb250cm9sbGVyKCdTdG9yeUN0bCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCAkcm9vdFNjb3BlLCAkc3RhdGVQYXJhbXMsIFN0b3J5RmFjdG9yeSkge1xuXHQgXG5cdFN0b3J5RmFjdG9yeS5nZXRPbmUoJHN0YXRlUGFyYW1zLnN0b3J5SWQpXG5cdC50aGVuKGZ1bmN0aW9uKHN0b3J5KXtcblx0XHQkcm9vdFNjb3BlLnN0b3J5ID0gc3RvcnkuZGF0YVxuXHR9KVxuXG5cblxufSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpIHtcblxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdzdG9yeScsIHtcbiAgICAgICAgdXJsOiAnL3N0b3J5LzpzdG9yeUlkJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICcvanMvcGFnZXMvc3Rvcnkvc3RvcnkuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdTdG9yeUN0bCdcbiAgICB9KTtcblxufSk7Il19
