app.controller('usercontroller', function ($scope,$state,userResource) {

var userresource = new userResource();
$scope.Message =  {};
$scope.Users = [];
$scope.user = {'_id': "" , 'username': "" , 'fullname':"" , 'password': ""};
$scope.errormsg="";
$scope.btnRegisterClick = function()
{
    $state.go('register');
}

$scope.registerClick = function()
{
  
    userresource.username = $scope.user.Username;
    userresource.fullname  = $scope.user.FullName;
    userresource.password =  $scope.user.Password; 
    userresource.role = "user";  
    userresource.$add().then(function(data)
    {
        if(data.success)
        {
            $state.go("login");
        }
        else{
            $scope.errormsg = data.errormsg;
        }   
    })
}
$scope.InitUser = function()
{
userresource.$get().then(function(data)
    {
        if(data.success)
        {
            if(data.role == "user")
            {
                $state.go('login');
            }
            else
            {
            angular.forEach(data.obj,function(item) {
                $scope.Users.push(item);
            });
            }
    
        }
    });
}

$scope.InitUser();
$scope.btnAddClick = function()
{
    $("#modal-add").modal('show');
}

$scope.AddClick = function()
{
    userresource.username = $scope.user.username;
    userresource.fullname  = $scope.user.fullName;
    userresource.password =  $scope.user.password;   
    userresource.$add().then(function(data)
    {
        if(data.success)
        {
             $("#modal-add").modal('hide');
             $scope.user = "";
             $scope.Users = [];
             $scope.InitUser();

        }   
    })
}

$scope.btnUpdateClick = function(id)
{
     $("#modal-update").modal('show');
     userresource.$getbyid({_id:id}).then(function(data)
     {
            $scope.user._id =data.obj._id;
            $scope.user.username  = data.obj.username;
            $scope.user.fullName = data.obj.fullname;
           
     });
}
$scope.btnChangeClick = function(id)
{
     $("#modal-reset").modal('show');
     userresource.$getbyid({_id:id}).then(function(data)
     {
            $scope.user._id =data.obj._id;
            $scope.user.username  = data.obj.username;
            $scope.user.fullName = data.obj.fullname;
           
     });
}
$scope.ChangeClick = function()
{
  
    userresource._id = $scope.user._id;
    userresource.password = $scope.user.password;
    userresource.$reset().then(function(data)
    {
        if(data.success)
        {
            $("#modal-reset").modal('hide');
             $scope.user = "";
             $scope.Users = [];
             $scope.InitUser();
        }
    })
}

$scope.UpdateClick = function()
{
    userresource.fullname = $scope.user.fullName;
    userresource._id = $scope.user._id;
    userresource.username = $scope.user.username;
    userresource.$update().then(function(data)
    {
        if(data.success)
        {
            $("#modal-update").modal('hide');
             $scope.user = "";
             $scope.Users = [];
             $scope.InitUser();
        }
    })
}
});