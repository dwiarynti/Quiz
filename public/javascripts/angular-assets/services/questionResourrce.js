(function () {
    "use strict";
    angular
        .module("common.services")
        .factory("questionResource",
                ["$resource",
                 questionResource]);
    function questionResource($resource) {
        return $resource("/api/questions/:_id",
               { id: '@id' },
               {
                   init: { method: 'GET' },
                   add: { method: 'POST' },

               })
    }
}());