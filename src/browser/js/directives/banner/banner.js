'use strict';
app.directive('banner', function() {
    return {
        restrict: 'E',
        templateUrl: '/js/directives/banner/banner.html',
        link: function(scope, element, attrs) {
        	scope.banner_url = 'http://www.f-covers.com/cover/abstract-book-facebook-cover-timeline-banner-for-fb.jpg'
        }

    };
});
