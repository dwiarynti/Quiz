(function () {
    "use strict";
    angular
        .module("common.services")
        .factory("submitquizResource",
                ["$resource",
                 submitquizResource]);
    function submitquizResource($resource) {
        return $resource("/api/submit/:action/:_id",
               { _id: '@_id' },
               {
                 init: { method: 'POST',params:{action:'init'}},
                 add: {method:'POST'},
                 get: {method:'GET'},
                 update: {method:'POST',params:{action:'Update'}},
                 delete: {method:'POST',params:{action:'Delete'}}
               })
    }
}());