(function () {
    "use strict";
    angular
        .module("common.services")
        .factory("widgetResource",
                ["$resource",
                 widgetResource]);
    function widgetResource($resource) {
        return $resource("/api/widget/:action/:_id",
               { id: '@id' },
               {
                   init: { method: 'GET' },
                   update: { method: 'POST',params: {action:'update'} }
               });
    };
}());