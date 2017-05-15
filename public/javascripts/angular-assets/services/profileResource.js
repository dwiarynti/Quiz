(function () {
    "use strict";
    angular
        .module("common.services")
        .factory("profileResource",
                ["$resource",
                 profileResource]);
    function profileResource($resource) {
        return $resource("/api/profile/:action/:_id",
               { id: '@id' },
               {
                   initform: { method: 'GET',params: {action:'initform'} }
               });
    };
}());