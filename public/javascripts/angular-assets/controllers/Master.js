app.controller('mastercontroller', function ($scope, $rootScope, userResource ,$state) {

    userresource = new userResource();
    $rootScope.setting = {"username":"", "user_id":0, "isAuthenticated":false, "role":""};
    userresource.$isAuthenticate({}, function(data){
        if(data.authenticate){
           
            $rootScope.setting.isAuthenticated = data.authenticate;
            $rootScope.setting.username = data.username;
            $rootScope.setting.user_id = data.user_id;
            $rootScope.setting.role = data.role;   
             console.log($rootScope.setting);
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
