(function () {
    "use strict";
    angular
        .module("common.services")
        .factory("quizResource",
                ["$resource",
                 quizResource]);
    function quizResource($resource) {
        return $resource("/api/quiz/",
               { id: '@id' },
               {
                   init: { method: 'GET' },
                   add: { method: 'POST' },

               })
    }
}());