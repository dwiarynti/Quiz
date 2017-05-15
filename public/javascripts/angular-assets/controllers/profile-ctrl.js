<<<<<<< HEAD
app.controller('profilecontroller', function ($scope,$state,subjectResource, passingdataservice) {

$scope.profilefield = [];
$scope.fieldType = {};
$scope.btnAddClick = function()
{
    $scope.profilefield.push({
        "_id":0,
        "key" : "",
        "type": "",
        "templateOptions": {
            "type" : "",
            "label" : "",
            "placeholder":"",
        }
    })
}

$scope.AddClick = function(obj)
{
   
    var addobj = {};
    var listobj = [];
    //console.log(obj);
    addobj.formname ="Profile";
    angular.forEach(obj,function(item) {
    addobj.key = item.key;
    addobj.type =item.type;
    
   

});
    listobj.push(obj);
    console.log(listobj);
}
=======
app.controller('profilecontroller', function ($scope, $rootScope, $state, $filter, configurationformResource, userprofileResource) {
    var configurationformresource = new configurationformResource();
    var userprofileresource = new userprofileResource();
    $scope.userprofileobj = {};
    $scope.user = {};
    $scope.userFields = [
    // {
    //   key: 'email',
    //   type: 'input',
    //   templateOptions: {
    //     type: 'email',
    //     label: 'Email address',
    //     placeholder: 'Enter email'
    //   }
    // },
    // {
    //   key: 'password',
    //   type: 'input',
    //   templateOptions: {
    //     type: 'password',
    //     label: 'Password',
    //     placeholder: 'Password'
    //   }
    // },
    // {
    //   key: 'checked',
    //   type: 'checkbox',
    //   templateOptions: {
    //     label: 'Check me out'
    //   }
    // }
    {
          key: 'first_name',
            type: 'input',
            templateOptions: {
                type: 'text',
                label: 'First Name',
                placeholder: 'Enter your first name',
                required: true
            }
    }
  ];

    // $scope.

        configurationformresource.$init(function(data){

            angular.forEach(data.Obj.formelements,function(item) {
                item.value = "";
            })

            $scope.userprofileobj = data.Obj;
        });

        $scope.save = function(){
            var obj = {"_userid":$rootScope.setting.user_id, "data":[]};
            angular.forEach($scope.userprofileobj.formelements,function(item) {
                obj.data.push({"_fieldid": item._id, "value":item.value});
            });
            console.log(obj);

            userprofileresource.userprofileobj = obj;
            userprofileresource.$save(function(data){
                console.log(data);
            });

        }

        $scope.submit = function(obj){
            console.log(obj);
        }
>>>>>>> origin/master
});