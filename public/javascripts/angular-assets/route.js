﻿var app = angular.module("RDash", [
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
            }) 
            .state('subject-create', {
                url: '/subject-create',
                templateUrl: '/javascripts/angular-assets/partialviews/subjects/create.html'
            })
            .state('subject-detail', {
                url: '/subject-detail',
                templateUrl: '/javascripts/angular-assets/partialviews/subjects/detail.html'
            })
            .state('subject-edit', {
                url: '/subject-edit',
                templateUrl: '/javascripts/angular-assets/partialviews/subjects/edit.html'
            })
            .state('question-index', {
                url: '/question-index',
                templateUrl: '/javascripts/angular-assets/partialviews/questions/index.html'
            })
            .state('question-create', {
                url: '/question-create',
                templateUrl: '/javascripts/angular-assets/partialviews/questions/create.html'
            })
            .state('question-detail', {
                url: '/question-detail',
                templateUrl: '/javascripts/angular-assets/partialviews/questions/detail.html'
            })
            .state('question-edit', {
                url: '/question-edit',
                templateUrl: '/javascripts/angular-assets/partialviews/questions/edit.html'
            })
            .state('user-index', {
                url: '/user-index',
                templateUrl: '/javascripts/angular-assets/partialviews/users/index.html'
            })
            .state('login', {
                url: '/login',
                templateUrl: '/javascripts/angular-assets/partialviews/users/login.html'
            })
            .state('register', {
                url: '/register',
                templateUrl: '/javascripts/angular-assets/partialviews/users/register.html'
            })
            .state('quizindex', {
                url: '/quizindex',
                templateUrl: '/javascripts/angular-assets/partialviews/quiz/index.html'
            })
            .state('quiz', {
                url: '/quiz',
                templateUrl: '/javascripts/angular-assets/partialviews/quiz/quiz.html'
            })
            .state('choices-index', {
                url: '/choices-index',
                templateUrl: '/javascripts/angular-assets/partialviews/choices/index.html'
            })
            .state('exampresult-index', {
                    url: '/exampresult-index',
                    templateUrl: '/javascripts/angular-assets/partialviews/exampresult/index.html'
            })
            .state('exampresult-detail', {
                    url: '/exampresult-detail',
                    templateUrl: '/javascripts/angular-assets/partialviews/exampresult/detail.html'
            })
            .state('home', {
                    url: '/home',
                    templateUrl: '/javascripts/angular-assets/partialviews/home.html'
            })
            ;
    }
]);