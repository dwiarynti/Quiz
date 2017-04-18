var app = angular.module("RDash", [
    "ui.bootstrap",
    "ui.router",
    "oc.lazyLoad",
    "common.services", 
    "dndLists"]);

app.config([
    '$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('subject-index', {
                url: '/subject-index',
                templateUrl: '/javascripts/angular-assets/partialviews/indexsubject.html'
            });

    }
]);