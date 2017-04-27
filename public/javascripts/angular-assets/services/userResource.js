(function () {
    "use strict";
    angular
        .module("common.services")
        .factory("userResource",
                ["$resource",
                 userResource]);
    function userResource($resource) {
        return $resource("/api/users/:action/:_id",
               { _id: '@_id' },
               {
                 init: { method: 'GET',params:{action:'Init'}},
                 add: {method:'POST', params: {action:'create'}},
                 login: {method:'POST',params: {action:'login'}},
                 logout:{method:'GET', params: {action: 'logout'}},
                 get: {method:'GET'},
                 update: {method:'POST',params:{action:'Update'}},
                 delete: {method:'POST',params:{action:'Delete'}}
               })
    }
}());