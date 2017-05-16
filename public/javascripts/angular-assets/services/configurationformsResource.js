(function () {
    "use strict";
    angular
        .module("common.services")
        .factory("configurationformResource",
                ["$resource",
                 configurationformResource]);
    function configurationformResource($resource) {
        return $resource("/api/configurationform/:action/:_id",
               { id: '@id' },
               {
                   init: { method: 'GET' , params:{action:'init'} },
                   add : {method: 'POST' , params:{action:'create'}},
                   update : {method:'POST', params:{action: 'update'}},
                   get: {method:'GET'},
                   delete :{method:'POST', params:{action:'delete'}}
               })
    }
}());