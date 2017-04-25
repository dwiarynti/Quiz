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
                templateUrl: '/javascripts/angular-assets/partialviews/subjects/index.html'
            });       
        $stateProvider
            .state('subject-create', {
                url: '/subject-create',
                templateUrl: '/javascripts/angular-assets/partialviews/subjects/create.html'
            });        
        $stateProvider
            .state('subject-detail', {
                url: '/subject-detail',
                templateUrl: '/javascripts/angular-assets/partialviews/subjects/detail.html'
            });
        $stateProvider
            .state('subject-edit', {
                url: '/subject-edit',
                templateUrl: '/javascripts/angular-assets/partialviews/subjects/edit.html'
            });

        $stateProvider
            .state('question-index', {
                url: '/question-index',
                templateUrl: '/javascripts/angular-assets/partialviews/questions/index.html'
            });       
        $stateProvider
            .state('question-create', {
                url: '/question-create',
                templateUrl: '/javascripts/angular-assets/partialviews/questions/create.html'
            });        
        $stateProvider
            .state('question-detail', {
                url: '/question-detail',
                templateUrl: '/javascripts/angular-assets/partialviews/questions/detail.html'
            });
        $stateProvider
            .state('question-edit', {
                url: '/question-edit',
                templateUrl: '/javascripts/angular-assets/partialviews/questions/edit.html'
            });
         $stateProvider
            .state('user-index', {
                url: '/user-index',
                templateUrl: '/javascripts/angular-assets/partialviews/users/index.html'
            });
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: '/javascripts/angular-assets/partialviews/users/login.html'
            });
        $stateProvider
            .state('register', {
                url: '/register',
                templateUrl: '/javascripts/angular-assets/partialviews/users/register.html'
            });
        $stateProvider
            .state('quiz', {
                url: '/quiz',
                templateUrl: '/javascripts/angular-assets/partialviews/quiz/index.html'
            });
        $stateProvider
            .state('choices-index', {
                url: '/choices-index',
                templateUrl: '/javascripts/angular-assets/partialviews/choices/index.html'
        });

    }
]);