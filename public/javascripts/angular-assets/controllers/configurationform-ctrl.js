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
        "editmode" : false,
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
       if(item._id == 0)
       {
       data = {};
       data.formname = "Profile";
       data.key = item.key;
       data.type = item.type;
       data.templateOptions = item.templateOptions;
       listObj.push(data);
       }
   });
    //console.log(listObj);
    configurationformresource.data = listObj;
    //console.log(configurationformresource.data);
    configurationformresource.$add().then(function(item)
    {
        //console.log("i",item);
        $scope.init();
        

    });
  
}

$scope.init = function()
{
    configurationformresource.$init().then(function(data)
    {
       
        angular.forEach(data.Obj,function(item) {
                 item.editmode = false;                 
                $scope.profilefield.push(item);
            });
        console.log($scope.profilefield);
    })
}
$scope.init();

$scope.btnUpdateClick = function(obj)
{
    obj.editmode = true;
}

$scope.UpdateClick = function(obj)
{
     console.log(obj);
     configurationformresource._id =obj._id;
     configurationformresource.type = obj.type;
     configurationformresource.key = obj.key;
     configurationformresource.templateOptions = obj.templateOptions;
    
     configurationformresource.$update().then(function(data)
     {
        
         $scope.profilefield = [];
         $scope.init();
     })
}

$scope.turnoffeditmode = function(obj){
    obj.editmode = false;    
}

})