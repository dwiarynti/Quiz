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
                 getbyid :{method:'GET'},
                 reset : {method:'POST',params: {action:'reset'}},
                 update: {method:'POST',params:{action:'update'}},
                 delete: {method:'POST',params:{action:'delete'}},
                 isAuthenticate: {method:'GET',params:{action:'isAuthenticate'}},
                 getusernamebyuserid: {method:'GET',params:{action:'getusername'}}
               })
    }
}());