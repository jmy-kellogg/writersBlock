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
    storyObj.addOne = function (newStory) {
        return $http.post('/api/stories/', newStory);
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
app.directive('navbar', function ($rootScope) {

    return {
        restrict: 'E',
        scope: {},
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

app.controller('HomeCtrl', function ($scope, $state, $stateParams, StoryFactory) {

    var pullStories = function pullStories() {
        StoryFactory.getAll().then(function (stories) {
            $scope.stories = stories.data;
            return stories;
        });
    };
    pullStories();

    $scope.addStory = function () {
        var newStory = $scope.newStory;
        StoryFactory.addOne({ title: newStory.title, banner: newStory.banner, summary: newStory.summary }).then(function (resStory) {
            $('#myModal').modal('hide');
            location.reload();
            return resStory;
        });
        $scope.newStory = {};
    };
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
        $(window).scrollTop(0);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImZhY3Rvcmllcy9zdG9yeS5mYWN0b3J5LmpzIiwiZnNhL2ZzYS1wcmUtYnVpbHQuanMiLCJkaXJlY3RpdmVzL2Jhbm5lci9iYW5uZXIuanMiLCJkaXJlY3RpdmVzL25hdmJhci9uYXZiYXIuanMiLCJwYWdlcy9jaGFyYWN0ZXJzL2NoYXJhY3RlcnMuY29udHJvbGxlci5qcyIsInBhZ2VzL2NoYXJhY3RlcnMvY2hhcmFjdGVycy5qcyIsInBhZ2VzL2hvbWUvaG9tZS5jb250cm9sbGVyLmpzIiwicGFnZXMvaG9tZS9ob21lLmpzIiwicGFnZXMvbG9naW4vbG9naW4uY29udHJvbGxlci5qcyIsInBhZ2VzL2xvZ2luL2xvZ2luLmpzIiwicGFnZXMvc3Rvcnkvc3RvcnkuY29udHJvbGxlci5qcyIsInBhZ2VzL3N0b3J5L3N0b3J5LmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsImFwcCIsImFuZ3VsYXIiLCJtb2R1bGUiLCJjb25maWciLCIkdXJsUm91dGVyUHJvdmlkZXIiLCIkbG9jYXRpb25Qcm92aWRlciIsImh0bWw1TW9kZSIsIm90aGVyd2lzZSIsIndoZW4iLCJsb2NhdGlvbiIsInJlbG9hZCIsImZhY3RvcnkiLCIkaHR0cCIsInN0b3J5T2JqIiwiZ2V0QWxsIiwiZ2V0IiwiZ2V0T25lIiwiaWQiLCJhZGRPbmUiLCJuZXdTdG9yeSIsInBvc3QiLCJkaXJlY3RpdmUiLCJyZXN0cmljdCIsInRlbXBsYXRlVXJsIiwibGluayIsInNjb3BlIiwiZWxlbWVudCIsImF0dHJzIiwiYmFubmVyX3VybCIsIiRyb290U2NvcGUiLCJjb250cm9sbGVyIiwiJHNjb3BlIiwiJHN0YXRlIiwiJHN0YXRlUHJvdmlkZXIiLCJzdGF0ZSIsInVybCIsIiRzdGF0ZVBhcmFtcyIsIlN0b3J5RmFjdG9yeSIsInB1bGxTdG9yaWVzIiwidGhlbiIsInN0b3JpZXMiLCJkYXRhIiwiYWRkU3RvcnkiLCJ0aXRsZSIsImJhbm5lciIsInN1bW1hcnkiLCJyZXNTdG9yeSIsIiQiLCJtb2RhbCIsIkF1dGhTZXJ2aWNlIiwibG9naW4iLCJlcnJvciIsInNlbmRMb2dpbiIsImxvZ2luSW5mbyIsImdvIiwiY2F0Y2giLCJzdG9yeUlkIiwic3RvcnkiLCJzY3JvbGxUb3AiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBQSxPQUFBQyxHQUFBLEdBQUFDLFFBQUFDLE1BQUEsQ0FBQSxZQUFBLEVBQUEsQ0FBQSxXQUFBLEVBQUEsY0FBQSxDQUFBLENBQUE7O0FBRUFGLElBQUFHLE1BQUEsQ0FBQSxVQUFBQyxrQkFBQSxFQUFBQyxpQkFBQSxFQUFBO0FBQ0E7QUFDQUEsc0JBQUFDLFNBQUEsQ0FBQSxJQUFBO0FBQ0E7QUFDQUYsdUJBQUFHLFNBQUEsQ0FBQSxRQUFBO0FBQ0E7QUFDQUgsdUJBQUFJLElBQUEsQ0FBQSxpQkFBQSxFQUFBLFlBQUE7QUFDQVQsZUFBQVUsUUFBQSxDQUFBQyxNQUFBO0FBQ0EsS0FGQTtBQUdBLENBVEE7O0FBWUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FDeERBVixJQUFBVyxPQUFBLENBQUEsY0FBQSxFQUFBLFVBQUFDLEtBQUEsRUFBQTtBQUNBLFFBQUFDLFdBQUEsRUFBQTs7QUFFQUEsYUFBQUMsTUFBQSxHQUFBLFlBQUE7QUFDQSxlQUFBRixNQUFBRyxHQUFBLENBQUEsZUFBQSxDQUFBO0FBQ0EsS0FGQTtBQUdBRixhQUFBRyxNQUFBLEdBQUEsVUFBQUMsRUFBQSxFQUFBO0FBQ0EsZUFBQUwsTUFBQUcsR0FBQSxDQUFBLGtCQUFBRSxFQUFBLENBQUE7QUFDQSxLQUZBO0FBR0FKLGFBQUFLLE1BQUEsR0FBQSxVQUFBQyxRQUFBLEVBQUE7QUFDQSxlQUFBUCxNQUFBUSxJQUFBLENBQUEsZUFBQSxFQUFBRCxR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QUFrQixLQUFBLEVBQUE7QUFDQTVCLG1CQUFBNEIsS0FBQSxHQUFBQSxNQUFBaEIsSUFBQTtBQUNBTSxVQUFBaEQsTUFBQSxFQUFBMkQsU0FBQSxDQUFBLENBQUE7QUFDQSxLQUpBO0FBTUEsQ0FSQTs7QUNGQTs7QUFFQTFELElBQUFHLE1BQUEsQ0FBQSxVQUFBOEIsY0FBQSxFQUFBOztBQUVBQSxtQkFBQUMsS0FBQSxDQUFBLE9BQUEsRUFBQTtBQUNBQyxhQUFBLGlCQURBO0FBRUFaLHFCQUFBLDRCQUZBO0FBR0FPLG9CQUFBO0FBSEEsS0FBQTtBQU1BLENBUkEiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG53aW5kb3cuYXBwID0gYW5ndWxhci5tb2R1bGUoJ0FuZ3VsYXJBcHAnLCBbJ3VpLnJvdXRlcicsICd1aS5ib290c3RyYXAnXSk7XG5cbmFwcC5jb25maWcoZnVuY3Rpb24gKCR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcbiAgICAvLyBUaGlzIHR1cm5zIG9mZiBoYXNoYmFuZyB1cmxzICgvI2Fib3V0KSBhbmQgY2hhbmdlcyBpdCB0byBzb21ldGhpbmcgbm9ybWFsICgvYWJvdXQpXG4gICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xuICAgIC8vIElmIHdlIGdvIHRvIGEgVVJMIHRoYXQgdWktcm91dGVyIGRvZXNuJ3QgaGF2ZSByZWdpc3RlcmVkLCBnbyB0byB0aGUgXCIvXCIgdXJsLlxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9zdG9yeScpO1xuICAgIC8vIFRyaWdnZXIgcGFnZSByZWZyZXNoIHdoZW4gYWNjZXNzaW5nIGFuIE9BdXRoIHJvdXRlXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLndoZW4oJy9hdXRoLzpwcm92aWRlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH0pO1xufSk7XG5cblxuLy9UaGlzIGFwcC5ydW4gaXMgZm9yIGNvbnRyb2xsaW5nIGFjY2VzcyB0byBzcGVjaWZpYyBzdGF0ZXMuXG4vLyBhcHAucnVuKGZ1bmN0aW9uICgkcm9vdFNjb3BlLCBBdXRoU2VydmljZSwgJHN0YXRlKSB7XG5cbi8vICAgICAvLyBUaGUgZ2l2ZW4gc3RhdGUgcmVxdWlyZXMgYW4gYXV0aGVudGljYXRlZCB1c2VyLlxuLy8gICAgIGNvbnN0IGRlc3RpbmF0aW9uU3RhdGVSZXF1aXJlc0F1dGggPSBmdW5jdGlvbiAoc3RhdGUpIHtcbi8vICAgICAgICAgcmV0dXJuIHN0YXRlLmRhdGEgJiYgc3RhdGUuZGF0YS5hdXRoZW50aWNhdGU7XG4vLyAgICAgfTtcblxuLy8gICAgIC8vICRzdGF0ZUNoYW5nZVN0YXJ0IGlzIGFuIGV2ZW50IGZpcmVkXG4vLyAgICAgLy8gd2hlbmV2ZXIgdGhlIHByb2Nlc3Mgb2YgY2hhbmdpbmcgYSBzdGF0ZSBiZWdpbnMuXG4vLyAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN0YXJ0JywgZnVuY3Rpb24gKGV2ZW50LCB0b1N0YXRlLCB0b1BhcmFtcykge1xuXG4vLyAgICAgICAgIGlmICghZGVzdGluYXRpb25TdGF0ZVJlcXVpcmVzQXV0aCh0b1N0YXRlKSkge1xuLy8gICAgICAgICAgICAgLy8gVGhlIGRlc3RpbmF0aW9uIHN0YXRlIGRvZXMgbm90IHJlcXVpcmUgYXV0aGVudGljYXRpb25cbi8vICAgICAgICAgICAgIC8vIFNob3J0IGNpcmN1aXQgd2l0aCByZXR1cm4uXG4vLyAgICAgICAgICAgICByZXR1cm47XG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICBpZiAoQXV0aFNlcnZpY2UuaXNBdXRoZW50aWNhdGVkKCkpIHtcbi8vICAgICAgICAgICAgIC8vIFRoZSB1c2VyIGlzIGF1dGhlbnRpY2F0ZWQuXG4vLyAgICAgICAgICAgICAvLyBTaG9ydCBjaXJjdWl0IHdpdGggcmV0dXJuLlxuLy8gICAgICAgICAgICAgcmV0dXJuO1xuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgLy8gQ2FuY2VsIG5hdmlnYXRpbmcgdG8gbmV3IHN0YXRlLlxuLy8gICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4vLyAgICAgICAgIEF1dGhTZXJ2aWNlLmdldExvZ2dlZEluVXNlcigpLnRoZW4oZnVuY3Rpb24gKHVzZXIpIHtcbi8vICAgICAgICAgICAgIC8vIElmIGEgdXNlciBpcyByZXRyaWV2ZWQsIHRoZW4gcmVuYXZpZ2F0ZSB0byB0aGUgZGVzdGluYXRpb25cbi8vICAgICAgICAgICAgIC8vICh0aGUgc2Vjb25kIHRpbWUsIEF1dGhTZXJ2aWNlLmlzQXV0aGVudGljYXRlZCgpIHdpbGwgd29yaylcbi8vICAgICAgICAgICAgIC8vIG90aGVyd2lzZSwgaWYgbm8gdXNlciBpcyBsb2dnZWQgaW4sIGdvIHRvIFwibG9naW5cIiBzdGF0ZS5cbi8vICAgICAgICAgICAgIGlmICh1c2VyKSB7XG4vLyAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKHRvU3RhdGUubmFtZSwgdG9QYXJhbXMpO1xuLy8gICAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH0pO1xuXG4vLyAgICAgfSk7XG5cbi8vfSk7XG4iLCJhcHAuZmFjdG9yeSgnU3RvcnlGYWN0b3J5JywgZnVuY3Rpb24oJGh0dHApIHtcblx0dmFyIHN0b3J5T2JqID0ge307XG5cblx0c3RvcnlPYmouZ2V0QWxsPSBmdW5jdGlvbigpe1xuXHRcdHJldHVybiAkaHR0cC5nZXQoJy9hcGkvc3Rvcmllcy8nKVxuXHR9XG5cdHN0b3J5T2JqLmdldE9uZT0gZnVuY3Rpb24oaWQpe1xuXHRcdHJldHVybiAkaHR0cC5nZXQoJy9hcGkvc3Rvcmllcy8nK2lkKVxuXHR9XG5cdHN0b3J5T2JqLmFkZE9uZT0gZnVuY3Rpb24obmV3U3Rvcnkpe1xuXHRcdHJldHVybiAkaHR0cC5wb3N0KCcvYXBpL3N0b3JpZXMvJywgbmV3U3RvcnkpXG5cblx0fVxuXHRyZXR1cm4gc3RvcnlPYmpcbn0pIiwiLy8gKGZ1bmN0aW9uKCkge1xuXG4vLyAgICAgJ3VzZSBzdHJpY3QnO1xuXG4vLyAgICAgLy8gSG9wZSB5b3UgZGlkbid0IGZvcmdldCBBbmd1bGFyISBEdWgtZG95LlxuLy8gICAgIGlmICghd2luZG93LmFuZ3VsYXIpIHRocm93IG5ldyBFcnJvcignSSBjYW5cXCd0IGZpbmQgQW5ndWxhciEnKTtcblxuLy8gICAgIHZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnZnNhUHJlQnVpbHQnLCBbXSk7XG5cbi8vICAgICBhcHAuZmFjdG9yeSgnU29ja2V0JywgZnVuY3Rpb24oKSB7XG4vLyAgICAgICAgIGlmICghd2luZG93LmlvKSB0aHJvdyBuZXcgRXJyb3IoJ3NvY2tldC5pbyBub3QgZm91bmQhJyk7XG4vLyAgICAgICAgIHJldHVybiB3aW5kb3cuaW8od2luZG93LmxvY2F0aW9uLm9yaWdpbik7XG4vLyAgICAgfSk7XG5cbi8vICAgICAvLyBBVVRIX0VWRU5UUyBpcyB1c2VkIHRocm91Z2hvdXQgb3VyIGFwcCB0b1xuLy8gICAgIC8vIGJyb2FkY2FzdCBhbmQgbGlzdGVuIGZyb20gYW5kIHRvIHRoZSAkcm9vdFNjb3BlXG4vLyAgICAgLy8gZm9yIGltcG9ydGFudCBldmVudHMgYWJvdXQgYXV0aGVudGljYXRpb24gZmxvdy5cbi8vICAgICBhcHAuY29uc3RhbnQoJ0FVVEhfRVZFTlRTJywge1xuLy8gICAgICAgICBsb2dpblN1Y2Nlc3M6ICdhdXRoLWxvZ2luLXN1Y2Nlc3MnLFxuLy8gICAgICAgICBsb2dpbkZhaWxlZDogJ2F1dGgtbG9naW4tZmFpbGVkJyxcbi8vICAgICAgICAgbG9nb3V0U3VjY2VzczogJ2F1dGgtbG9nb3V0LXN1Y2Nlc3MnLFxuLy8gICAgICAgICBzZXNzaW9uVGltZW91dDogJ2F1dGgtc2Vzc2lvbi10aW1lb3V0Jyxcbi8vICAgICAgICAgbm90QXV0aGVudGljYXRlZDogJ2F1dGgtbm90LWF1dGhlbnRpY2F0ZWQnLFxuLy8gICAgICAgICBub3RBdXRob3JpemVkOiAnYXV0aC1ub3QtYXV0aG9yaXplZCdcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5mYWN0b3J5KCdBdXRoSW50ZXJjZXB0b3InLCBmdW5jdGlvbigkcm9vdFNjb3BlLCAkcSwgQVVUSF9FVkVOVFMpIHtcbi8vICAgICAgICAgdmFyIHN0YXR1c0RpY3QgPSB7XG4vLyAgICAgICAgICAgICA0MDE6IEFVVEhfRVZFTlRTLm5vdEF1dGhlbnRpY2F0ZWQsXG4vLyAgICAgICAgICAgICA0MDM6IEFVVEhfRVZFTlRTLm5vdEF1dGhvcml6ZWQsXG4vLyAgICAgICAgICAgICA0MTk6IEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0LFxuLy8gICAgICAgICAgICAgNDQwOiBBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dFxuLy8gICAgICAgICB9O1xuLy8gICAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAgICAgcmVzcG9uc2VFcnJvcjogZnVuY3Rpb24ocmVzcG9uc2UpIHtcbi8vICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3Qoc3RhdHVzRGljdFtyZXNwb25zZS5zdGF0dXNdLCByZXNwb25zZSk7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZXNwb25zZSlcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfTtcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5jb25maWcoZnVuY3Rpb24oJGh0dHBQcm92aWRlcikge1xuLy8gICAgICAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKFtcbi8vICAgICAgICAgICAgICckaW5qZWN0b3InLFxuLy8gICAgICAgICAgICAgZnVuY3Rpb24oJGluamVjdG9yKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRpbmplY3Rvci5nZXQoJ0F1dGhJbnRlcmNlcHRvcicpO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICBdKTtcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5zZXJ2aWNlKCdBdXRoU2VydmljZScsIGZ1bmN0aW9uKCRodHRwLCBTZXNzaW9uLCAkcm9vdFNjb3BlLCBBVVRIX0VWRU5UUywgJHEpIHtcblxuLy8gICAgICAgICBmdW5jdGlvbiBvblN1Y2Nlc3NmdWxMb2dpbihyZXNwb25zZSkge1xuLy8gICAgICAgICAgICAgdmFyIHVzZXIgPSByZXNwb25zZS5kYXRhLnVzZXI7XG4vLyAgICAgICAgICAgICBTZXNzaW9uLmNyZWF0ZSh1c2VyKTtcbi8vICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChBVVRIX0VWRU5UUy5sb2dpblN1Y2Nlc3MpO1xuLy8gICAgICAgICAgICAgcmV0dXJuIHVzZXI7XG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICAvLyBVc2VzIHRoZSBzZXNzaW9uIGZhY3RvcnkgdG8gc2VlIGlmIGFuXG4vLyAgICAgICAgIC8vIGF1dGhlbnRpY2F0ZWQgdXNlciBpcyBjdXJyZW50bHkgcmVnaXN0ZXJlZC5cbi8vICAgICAgICAgdGhpcy5pc0F1dGhlbnRpY2F0ZWQgPSBmdW5jdGlvbigpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAhIVNlc3Npb24udXNlcjtcbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLmdldExvZ2dlZEluVXNlciA9IGZ1bmN0aW9uKGZyb21TZXJ2ZXIpIHtcblxuLy8gICAgICAgICAgICAgLy8gSWYgYW4gYXV0aGVudGljYXRlZCBzZXNzaW9uIGV4aXN0cywgd2Vcbi8vICAgICAgICAgICAgIC8vIHJldHVybiB0aGUgdXNlciBhdHRhY2hlZCB0byB0aGF0IHNlc3Npb25cbi8vICAgICAgICAgICAgIC8vIHdpdGggYSBwcm9taXNlLiBUaGlzIGVuc3VyZXMgdGhhdCB3ZSBjYW5cbi8vICAgICAgICAgICAgIC8vIGFsd2F5cyBpbnRlcmZhY2Ugd2l0aCB0aGlzIG1ldGhvZCBhc3luY2hyb25vdXNseS5cblxuLy8gICAgICAgICAgICAgLy8gT3B0aW9uYWxseSwgaWYgdHJ1ZSBpcyBnaXZlbiBhcyB0aGUgZnJvbVNlcnZlciBwYXJhbWV0ZXIsXG4vLyAgICAgICAgICAgICAvLyB0aGVuIHRoaXMgY2FjaGVkIHZhbHVlIHdpbGwgbm90IGJlIHVzZWQuXG5cbi8vICAgICAgICAgICAgIGlmICh0aGlzLmlzQXV0aGVudGljYXRlZCgpICYmIGZyb21TZXJ2ZXIgIT09IHRydWUpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEud2hlbihTZXNzaW9uLnVzZXIpO1xuLy8gICAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgICAvLyBNYWtlIHJlcXVlc3QgR0VUIC9zZXNzaW9uLlxuLy8gICAgICAgICAgICAgLy8gSWYgaXQgcmV0dXJucyBhIHVzZXIsIGNhbGwgb25TdWNjZXNzZnVsTG9naW4gd2l0aCB0aGUgcmVzcG9uc2UuXG4vLyAgICAgICAgICAgICAvLyBJZiBpdCByZXR1cm5zIGEgNDAxIHJlc3BvbnNlLCB3ZSBjYXRjaCBpdCBhbmQgaW5zdGVhZCByZXNvbHZlIHRvIG51bGwuXG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvc2Vzc2lvbicpLnRoZW4ob25TdWNjZXNzZnVsTG9naW4pLmNhdGNoKGZ1bmN0aW9uKCkge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuLy8gICAgICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLmxvZ2luID0gZnVuY3Rpb24oY3JlZGVudGlhbHMpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvbG9naW4nLCBjcmVkZW50aWFscylcbi8vICAgICAgICAgICAgICAgICAudGhlbihvblN1Y2Nlc3NmdWxMb2dpbilcbi8vICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QoeyBtZXNzYWdlOiAnSW52YWxpZCBsb2dpbiBjcmVkZW50aWFscy4nIH0pO1xuLy8gICAgICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMubG9nb3V0ID0gZnVuY3Rpb24oKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvbG9nb3V0JykudGhlbihmdW5jdGlvbigpIHtcbi8vICAgICAgICAgICAgICAgICBTZXNzaW9uLmRlc3Ryb3koKTtcbi8vICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoQVVUSF9FVkVOVFMubG9nb3V0U3VjY2Vzcyk7XG4vLyAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgfTtcblxuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLnNlcnZpY2UoJ1Nlc3Npb24nLCBmdW5jdGlvbigkcm9vdFNjb3BlLCBBVVRIX0VWRU5UUykge1xuXG4vLyAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuLy8gICAgICAgICAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5ub3RBdXRoZW50aWNhdGVkLCBmdW5jdGlvbigpIHtcbi8vICAgICAgICAgICAgIHNlbGYuZGVzdHJveSgpO1xuLy8gICAgICAgICB9KTtcblxuLy8gICAgICAgICAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dCwgZnVuY3Rpb24oKSB7XG4vLyAgICAgICAgICAgICBzZWxmLmRlc3Ryb3koKTtcbi8vICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgdGhpcy51c2VyID0gbnVsbDtcblxuLy8gICAgICAgICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uKHVzZXIpIHtcbi8vICAgICAgICAgICAgIHRoaXMudXNlciA9IHVzZXI7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4vLyAgICAgICAgICAgICB0aGlzLnVzZXIgPSBudWxsO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgfSk7XG5cbi8vIH0oKSk7IiwiJ3VzZSBzdHJpY3QnO1xuYXBwLmRpcmVjdGl2ZSgnYmFubmVyJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICcvanMvZGlyZWN0aXZlcy9iYW5uZXIvYmFubmVyLmh0bWwnLFxuICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgXHRzY29wZS5iYW5uZXJfdXJsID0gJ2h0dHA6Ly93d3cuZi1jb3ZlcnMuY29tL2NvdmVyL2Fic3RyYWN0LWJvb2stZmFjZWJvb2stY292ZXItdGltZWxpbmUtYmFubmVyLWZvci1mYi5qcGcnXG4gICAgICAgIH1cblxuICAgIH07XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbmFwcC5kaXJlY3RpdmUoJ25hdmJhcicsIGZ1bmN0aW9uKCRyb290U2NvcGUpIHtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgIHNjb3BlOiB7fSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICcvanMvZGlyZWN0aXZlcy9uYXZiYXIvbmF2YmFyLmh0bWwnLFxuICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSkge1xuICAgICAgICAgICAgLy8gc2NvcGUudXNlciA9IG51bGw7XG5cbiAgICAgICAgICAgIC8vIHNjb3BlLmlzTG9nZ2VkSW4gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vICAgICByZXR1cm4gQXV0aFNlcnZpY2UuaXNBdXRoZW50aWNhdGVkKCk7XG4gICAgICAgICAgICAvLyB9O1xuXG4gICAgICAgICAgICAvLyBzY29wZS5sb2dvdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vICAgICBBdXRoU2VydmljZS5sb2dvdXQoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gICAgICAgICAkc3RhdGUuZ28oJ3NlYXJjaCcpO1xuICAgICAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAgICAgLy8gfTtcblxuICAgICAgICAgICAgLy8gdmFyIHNldFVzZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vICAgICBBdXRoU2VydmljZS5nZXRMb2dnZWRJblVzZXIoKS50aGVuKGZ1bmN0aW9uKHVzZXIpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgc2NvcGUudXNlciA9IHVzZXI7XG4gICAgICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgICAgICAvLyB9O1xuXG4gICAgICAgICAgICAvLyB2YXIgcmVtb3ZlVXNlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gICAgIHNjb3BlLnVzZXIgPSBudWxsO1xuICAgICAgICAgICAgLy8gfTtcblxuICAgICAgICAgICAgLy8gc2V0VXNlcigpO1xuXG4gICAgICAgICAgICAvLyAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5sb2dpblN1Y2Nlc3MsIHNldFVzZXIpO1xuICAgICAgICAgICAgLy8gJHJvb3RTY29wZS4kb24oQVVUSF9FVkVOVFMubG9nb3V0U3VjY2VzcywgcmVtb3ZlVXNlcik7XG4gICAgICAgICAgICAvLyAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dCwgcmVtb3ZlVXNlcik7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxufSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmFwcC5jb250cm9sbGVyKCdDaGFyYWN0ZXJzQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlKSB7XG5cbn0pOyIsIid1c2Ugc3RyaWN0JztcblxuYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcikge1xuXG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2NoYXJhY3RlcnMnLCB7XG4gICAgICAgIHVybDogJy9zdG9yeS86c3RvcnlJZC9jaGFyYWN0ZXJzJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICcvanMvcGFnZXMvY2hhcmFjdGVycy9jaGFyYWN0ZXJzLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnQ2hhcmFjdGVyc0N0cmwnXG4gICAgfSk7XG5cbn0pOyIsIid1c2Ugc3RyaWN0JztcblxuYXBwLmNvbnRyb2xsZXIoJ0hvbWVDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcyxTdG9yeUZhY3RvcnkpIHtcblx0XG5cdHZhciBwdWxsU3RvcmllcyA9IGZ1bmN0aW9uKCl7XG5cdFN0b3J5RmFjdG9yeS5nZXRBbGwoKVxuXHRcdC50aGVuKGZ1bmN0aW9uKHN0b3JpZXMpe1xuXHRcdFx0JHNjb3BlLnN0b3JpZXMgPSBzdG9yaWVzLmRhdGE7XG5cdFx0XHRyZXR1cm4gc3Rvcmllc1xuXHRcdH0pXG5cdH1cblx0cHVsbFN0b3JpZXMoKTtcblxuXHQkc2NvcGUuYWRkU3RvcnkgPSBmdW5jdGlvbiAoKXtcblx0XHR2YXIgbmV3U3RvcnkgPSAkc2NvcGUubmV3U3Rvcnlcblx0XHRTdG9yeUZhY3RvcnkuYWRkT25lKHt0aXRsZTogbmV3U3RvcnkudGl0bGUsIGJhbm5lcjogbmV3U3RvcnkuYmFubmVyLCBzdW1tYXJ5OiBuZXdTdG9yeS5zdW1tYXJ5fSlcblx0XHQudGhlbihmdW5jdGlvbihyZXNTdG9yeSl7XG5cdFx0XHQkKCcjbXlNb2RhbCcpLm1vZGFsKCdoaWRlJylcblx0XHRcdGxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdFx0cmV0dXJuIHJlc1N0b3J5XHRcdFx0XG5cdFx0fSlcblx0XHQkc2NvcGUubmV3U3RvcnkgPSB7fTtcblx0fVxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKSB7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnaG9tZScsIHtcbiAgICAgICAgdXJsOiAnL3N0b3J5JyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICcvanMvcGFnZXMvaG9tZS9ob21lLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnSG9tZUN0cmwnXG4gICAgfSk7XG5cbn0pOyIsIid1c2Ugc3RyaWN0JztcblxuYXBwLmNvbnRyb2xsZXIoJ0xvZ2luQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgQXV0aFNlcnZpY2UsICRzdGF0ZSkge1xuXG4gICAgJHNjb3BlLmxvZ2luID0ge307XG4gICAgJHNjb3BlLmVycm9yID0gbnVsbDtcblxuICAgICRzY29wZS5zZW5kTG9naW4gPSBmdW5jdGlvbihsb2dpbkluZm8pIHtcblxuICAgICAgICAkc2NvcGUuZXJyb3IgPSBudWxsO1xuXG4gICAgICAgIEF1dGhTZXJ2aWNlLmxvZ2luKGxvZ2luSW5mbykudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzdGF0ZS5nbygnL3N0b3J5LycpO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5lcnJvciA9ICdJbnZhbGlkIGxvZ2luIGNyZWRlbnRpYWxzLic7XG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5hcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKSB7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnbG9naW4nLCB7XG4gICAgICAgIHVybDogJy9sb2dpbicsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnL2pzL3BhZ2VzL2xvZ2luL2xvZ2luLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnTG9naW5DdHJsJ1xuICAgIH0pO1xuXG59KTsiLCIndXNlIHN0cmljdCc7XG5cbmFwcC5jb250cm9sbGVyKCdTdG9yeUN0bCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCAkcm9vdFNjb3BlLCAkc3RhdGVQYXJhbXMsIFN0b3J5RmFjdG9yeSkge1xuXHQgXG5cdFN0b3J5RmFjdG9yeS5nZXRPbmUoJHN0YXRlUGFyYW1zLnN0b3J5SWQpXG5cdC50aGVuKGZ1bmN0aW9uKHN0b3J5KXtcblx0XHQkcm9vdFNjb3BlLnN0b3J5ID0gc3RvcnkuZGF0YTtcblx0XHQkKHdpbmRvdykuc2Nyb2xsVG9wKDApO1xuXHR9KVxuXG59KTtcbiIsIid1c2Ugc3RyaWN0JztcblxuYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcikge1xuXG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ3N0b3J5Jywge1xuICAgICAgICB1cmw6ICcvc3RvcnkvOnN0b3J5SWQnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJy9qcy9wYWdlcy9zdG9yeS9zdG9yeS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ1N0b3J5Q3RsJ1xuICAgIH0pO1xuXG59KTsiXX0=
