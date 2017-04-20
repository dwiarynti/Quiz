(function () {
    "use strict";
    angular
        .module("common.services")
        .factory("subjectResource",
                ["$resource",
                 subjectResource]);
    function subjectResource($resource) {
        return $resource("/api/Subjects/:action/:_id",
               { _id: '@_id' },
               {
                 init: { method: 'GET',params:{action:'InitSubject'}},
                 add: {method:'POST', params: {action:'Create'}},
                 get: {method:'GET'},
                 update: {method:'POST',params:{action:'Update'}},
                 delete: {method:'POST',params:{action:'Delete'}}
               })
    }
}());