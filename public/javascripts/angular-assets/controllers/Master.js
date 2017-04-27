app.controller('mastercontroller', function ($scope, userResource ,$state) {

userresource = new userResource();
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

});
