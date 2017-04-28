app.controller('usercontroller', function ($scope,$state,userResource) {

var userresource = new userResource();
$scope.Message =  {};
$scope.errormsg =  "";

$scope.btnHaveAccountClick = function()
{
    $state.go('login');
}

$scope.registerClick = function()
{
  
    userresource.username = $scope.user.Username;
    userresource.fullname  = $scope.user.FullName;
    userresource.password =  $scope.user.Password;   
    userresource.$add().then(function(data)
    {
        if(data.success)
        {
            $state.go("login");
        }else{
            $scope.errormsg = data.errormsg;
        }
    })
}

});