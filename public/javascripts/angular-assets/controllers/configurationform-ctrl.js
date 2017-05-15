app.controller('configurationformcontroller', function ($scope, $rootScope, $state, $filter, configurationformResource, passingdataservice) {

var configurationformresource = new configurationformResource();

$scope.profilefield = [];
$scope.fieldType = {};
$scope.showbtn = false;

$scope.btnAddClick = function()
{
    $scope.showbtn = true;
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
   var listObj = [];
   var data = {'formname':"",'key': "" , 'type':"" ,'templateOptions':{'type':"",'label':"",'placeholder':""}};
  
   angular.forEach(obj, function(item)
   {
       data = {};
       data.formname = "Profile";
       data.key = item.key;
       data.type = item.type;
       data.templateOptions = item.templateOptions;
       listObj.push(data);
   });
    //console.log(listObj);
    configurationformresource.data = listObj;
    console.log(configurationformresource.data);
    configurationformresource.$add().then(function(data)
    {
        if(data.success)
        {
        $scope.init();
        }

    });
  
}

$scope.init = function()
{
    configurationformresource.$init().then(function(data)
    {
        $scope.profilefield = data.Obj;
        console.log($scope.profilefield);
    })
}
$scope.init();
})