app.controller('exampresultIndexcontroller', function ($scope,$state, $filter, $rootScope,submitquizResource, userResource, passingdataservice) {
    
    var submitquizresource = new submitquizResource();
    var userresource = new userResource();
    $scope.initobj = [];
    $scope.user = [];

// questionresource.$add(function(data){
    if($rootScope.setting.role)
    // submitquizresource._username = $rootScope.setting.role == "admin"?"":$rootScope.setting.username;
    submitquizresource._userid = $rootScope.setting.role == "admin"?"":$rootScope.setting.user_id;
    submitquizresource.$init(function(data)
    {
        if(!data.authorize){
            $state.go('login');
        }else{
            $scope.initobj = data.obj;
            angular.forEach($scope.initobj, function (item) {
                item.Username = "";
                if($rootScope.setting.role == "user"){
                    item.Username = $rootScope.setting.username
                }else{
                    userresource.$getusernamebyuserid({_id:item.UserId},function(data){
                        // $scope.user.push({"_id":data.user_id, "username":data.username});
                        item.Username=data.username;

                        // angular.forEach($scope.initobj, function (item) {

                        // });



                    });
                }
            });
                  
        }
    });

    $scope.getusername = function(){
        for(var i = 0; i < $scope.initobj.length; i++){
            var item = $scope.initobj[i];
            item.Username = $filter('filter')($scope.user,function(obj){
                return item.UserId === obj._id ? obj.username : "";
            });
        }
    }

    // $scope.getusernamebyuserid = function(_id){
    //     var username="";
    //     userresource.$getusernamebyuserid({_id:_id},function(data){
    //         username=data.username;
    //     });
    //     return username;
    // }

    $scope.btnDetailClick = function (obj){
        for(var i = 0; i < obj.Quiz.length; i++)
        {
            obj.Quiz[i].No = i+1;
            console.log(obj.Quiz);
        }
        passingdataservice.addObj = obj;
        $state.go('exampresult-detail');
    }
});