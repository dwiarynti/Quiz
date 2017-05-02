app.controller('mastercontroller', function ($scope, $rootScope, userResource ,$state) {

    userresource = new userResource();
    $rootScope.setting = {"username":"", "isAuthenticated":false, "role":""};
    userresource.$isAuthenticate({}, function(data){
        if(data.authenticate){
            $rootScope.setting.isAuthenticated = data.authorize;
            $rootScope.setting.username = data.authenticate ? data.username:"";
            $rootScope.setting.role = data.authenticate? data.role:"";   
        }else{
            $state.go('login');
        }
                     
            
        });
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
                $rootScope.setting.isAuthenticated = true;
                $rootScope.setting.role = data.role;
                console.log($rootScope);
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
