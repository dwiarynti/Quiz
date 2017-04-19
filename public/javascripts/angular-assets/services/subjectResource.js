(function () {
    "use strict";
    angular
        .module("common.services")
        .factory("subjectResource",
                ["$resource",
                 subjectResource]);
    function subjectResource($resource) {
        return $resource("/api/Subjects/:_id",
               { _id: '@_id' },
               {
                 init: { method: 'GET'},
                 add: {method:'POST'},
                 get: {method:'GET'},
                 update: {method:'POST'}
               })
    }
}());