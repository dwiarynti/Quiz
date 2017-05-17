app.controller('mastercontroller', function ($scope, $filter, $rootScope, userResource ,$state, widgetResource) {
    $scope.widgetlist = [];
    var userresource = new userResource();
    var widgetresource = new widgetResource();    
    $rootScope.setting = {"username":"", "user_id":0, "isAuthenticated":false, "role":"", "widgetlist":$scope.widgetlist};
    
    $scope.getwidgetlist = function (){
        widgetresource.$init({}, function(data){
            $scope.widgetlist = data.Obj;   
            $rootScope.setting.widgetlist = $scope.widgetlist;
        });
    }
    
    userresource.$isAuthenticate({}, function(data){
        if(data.authenticate){
           
            $rootScope.setting.isAuthenticated = data.authenticate;
            $rootScope.setting.username = data.username;
            $rootScope.setting.user_id = data.user_id;
            $rootScope.setting.role = data.role;  
        }else{
            $state.go('login');
        }
    });

    $scope.getwidgetlist();    

    // $scope.$watch(function () {
    //     return $rootScope.setting.widgetlist;
    // }, function () {

    // });

    $scope.showWidget = function(widgetname){
        var result = false;
        if($rootScope.setting.isAuthenticated && $rootScope.setting.widgetlist.length != 0){
            result = $filter('filter')($rootScope.setting.widgetlist,function(item){
                return item.WidgetName === widgetname
            })[0].isActive;
        }
        return result;
    }


    $scope.logoutClick = function()
    {
        userresource.$logout().then(function(data)
        {
            if(data.success)
            {
                $state.go('login');
            }
        })
    }
    $scope.loginClick = function()
    {
        userresource.username = $scope.user.Username;
        userresource.password = $scope.user.Password;
        userresource.$login().then(function(data)
        {
            if(data.success)
            {
                $rootScope.setting.username = $scope.user.Username;
                $rootScope.setting.user_id = data.user_id;
                $rootScope.setting.isAuthenticated = true;
                $rootScope.setting.role = data.role;
                if(data.role == "user")
                {
                    $state.go('quizindex');
                }
                else
                {
                    $state.go('home')
                }
            }
        })
    }
    $scope.btnRegisterClick = function()
    {
        $state.go('register');
    }
    $scope.btnHaveAccountClick = function()
{
    $state.go('login');
}

});
