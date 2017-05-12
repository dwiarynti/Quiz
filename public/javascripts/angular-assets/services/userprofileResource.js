(function () {
    "use strict";
    angular
        .module("common.services")
        .factory("userprofileResource",
                ["$resource",
                 userprofileResource]);
    function userprofileResource($resource) {
        return $resource("/api/userprofile/:action/:_id",
               { id: '@id' },
               {
                   init: { method: 'GET' },
                   save: { method: 'POST' },

               })
    }
}());