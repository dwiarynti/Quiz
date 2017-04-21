(function () {
    "use strict";
    angular
        .module("common.services")
        .factory("choicesResource",
                ["$resource",
                 choicesResource]);
    function choicesResource($resource) {
        return $resource("/api/choices/:action/:_id",
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