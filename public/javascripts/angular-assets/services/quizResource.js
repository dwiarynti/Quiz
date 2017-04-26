(function () {
    "use strict";
    angular
        .module("common.services")
        .factory("quizResource",
                ["$resource",
                 quizResource]);
    function quizResource($resource) {
        return $resource("/api/quiz/:action/:_id",
               { id: '@id' },
               {
                   init: { method: 'GET' ,params:{action:'questions'}},
                   add: { method: 'POST' },
                   getchoices : {method:'GET',params:{action:'choices'}}

               })
    }
}());