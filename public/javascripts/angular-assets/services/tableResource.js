(function () {
    "use strict";
    angular
        .module("common.services")
        .factory("tableResource",
                ["$resource",
                 tableResource]);
    function tableResource($resource) {
        return $resource("/api/tables/",
               { id: '@id' },
               {
                   init: { method: 'GET'},

               })
    }
}());