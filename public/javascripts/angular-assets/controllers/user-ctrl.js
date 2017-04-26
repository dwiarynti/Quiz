app.controller('usercontroller', function ($scope,$state,userResource) {

var userresource = new userResource();
$scope.Message =  {};
$scope.btnRegisterClick = function()
{
    $state.go('register');
}
$scope.btnHaveAccountClick = function()
{
    $state.go('login');
}

$scope.RegisterClick = function()
{
  
    userresource.Username = $scope.user.Username;
    userresource.FullName  = $scope.user.FullName;
    userresource.Password =  $scope.user.Password;
    
    userresource.$add().then(function(data)
    {
        if(data.success)
        {
            $state.go("login");
        }
        
    })
}
});