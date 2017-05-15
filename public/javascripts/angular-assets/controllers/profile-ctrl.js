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
});