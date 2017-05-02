app.controller('mastercontroller', function ($scope, $rootScope, userResource ,$state) {

    userresource = new userResource();
    $rootScope.setting = {"username":"", "isAuthenticated":false};
    userresource.$isAuthorize({}, function(data){
            $rootScope.setting.isAuthenticated = data.authorize;
            $rootScope.setting.username = data.authorize ? data.username:"";
            
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
                console.log($rootScope);
                $state.go('quizindex');
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
