app.controller('profilecontroller', function ($scope, $rootScope, $state, $filter, configurationformResource, userprofileResource, profileResource) {
    var configurationformresource = new configurationformResource();
    var userprofileresource = new userprofileResource();
    var profileresource = new profileResource();
    $scope.userprofileobj = {};
    $scope.user = {};
    $scope.userFields = [];
    $scope.initform = function(){
        profileresource.$initform({}, function(data){
            angular.forEach(data.Obj,function(item) {
                $scope.userFields.push({"key":item.key, "type": item.type, "templateOptions":item.templateOptions});
            });
        });
    }
    $scope.initform();

    

    // $scope.

        configurationformresource.$init(function(data){

            angular.forEach(data.Obj.formelements,function(item) {
                item.value = "";
            })

            $scope.userprofileobj = data.Obj;
        });

        $scope.save = function(){
            var obj = {"_userid":$rootScope.setting.user_id, "data":[]};
            angular.forEach($scope.userprofileobj.formelements,function(item) {
                obj.data.push({"_fieldid": item._id, "value":item.value});
            });
            console.log(obj);

            userprofileresource.userprofileobj = obj;
            userprofileresource.$save(function(data){
                console.log(data);
            });

        }

        $scope.submit = function(obj){
            console.log(obj);
        }

});