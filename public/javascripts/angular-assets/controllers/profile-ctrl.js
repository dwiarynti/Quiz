app.controller('profilecontroller', function ($scope, $rootScope, $state, $filter, configurationformResource, userprofileResource, profileResource) {
    var configurationformresource = new configurationformResource();
    var userprofileresource = new userprofileResource();
    var profileresource = new profileResource();
    $scope.editmode = false;
    
    $scope.userprofileobj = {};
    $scope.user = {"_userid":$rootScope.setting.user_id, "_id":0};
    $scope.userFields = [];
    $scope.userFieldsviewmode = [];
    $scope.initform = function(){
        profileresource.$initform({}, function(data){
            $scope.userFields = [];            
            angular.forEach(data.Obj,function(item) {
                var fieldname = item.key;
                $scope.userFields.push({"key":item.key, "type": item.type,"templateOptions":item.templateOptions});

            });
        });
        userprofileresource.$init({"_userid":$rootScope.setting.user_id},function(data){
            if(data.Obj != null){
                $scope.userFieldsviewmode = [];
                $scope.user = data.Obj;
                angular.forEach($scope.userFields,function(item) {
                    var value = $scope.user[item.key];
                    $scope.userFieldsviewmode.push({"key":item.key, "value": value});                    
                });
            }
        });
    }
    $scope.initform();

    $scope.btnUpdateClick = function(){
        $scope.editmode = true;        
    }

    $scope.turnoffeditmode = function(){
        $scope.editmode = false;        
    }

    $scope.submit = function(obj){
        userprofileresource.userprofileobj=obj;
        userprofileresource.$save(function(data){
            if(data.return){
                $scope.initform();
                $scope.turnoffeditmode();
            }
        });
    }

});