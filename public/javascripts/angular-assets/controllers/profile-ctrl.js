app.controller('profilecontroller', function ($scope, $rootScope, $state, $filter, configurationformResource, userprofileResource, profileResource) {
    var configurationformresource = new configurationformResource();
    var userprofileresource = new userprofileResource();
    var profileresource = new profileResource();
    
    $scope.userprofileobj = {};
    $scope.user = {"_userid":$rootScope.setting.user_id, "_id":0};
    $scope.userFields = [];
    $scope.initform = function(){
        profileresource.$initform({}, function(data){
            angular.forEach(data.Obj,function(item) {
                // item.templateOptions.value = "test";
                var fieldname = item.key;
            
                $scope.userFields.push({"key":item.key, "type": item.type,"templateOptions":item.templateOptions});
            });
        });
        userprofileresource.$init({"_userid":$rootScope.setting.user_id},function(data){
            if(data.Obj != null){
                $scope.user = data.Obj;
            }
        });
    }
    $scope.initform();

    $scope.submit = function(obj){
        console.log(obj);        
        userprofileresource.userprofileobj=obj;
        userprofileresource.$save(function(data){
            console.log(data);

        });
    }

});