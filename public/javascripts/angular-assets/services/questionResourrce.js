(function () {
    "use strict";
    angular
        .module("common.services")
        .factory("questionResource",
                ["$resource",
                 questionResource]);
    function questionResource($resource) {
        return $resource("/api/questions/:action/:_id",
               { id: '@id' },
               {
                   init: { method: 'GET' },
                   add: { method: 'POST' },
                   getbyId: {method:'GET', params:{action:'getby'}},
                   update: {method:'POST',params:{action:'Update'}},
                   delete: {method:'POST',params:{action:'Delete'}}


               })
    }
}());