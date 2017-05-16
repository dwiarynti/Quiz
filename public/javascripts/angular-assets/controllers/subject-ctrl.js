app.controller('subjectcontroller', function ($scope,$state,subjectResource, passingdataservice) {

var subjectresource = new subjectResource();
$scope.initSubject = [];
$scope.subject ={'_id ': "",'SubjectName': ""};
$scope.errmsg ="";
subjectresource.$init({},function(data)
{
    if(!data.authorize){
        $state.go('login');
    }
    else
    {
        if(data.role != "admin")
        {
           $scope.errmsg = "this user is not authorize"
           $state.go('login');
        }
        else
        {
             angular.forEach(data.obj,function(item) {
                 item.editmode = false;                 
                $scope.initSubject.push(item);
            });
        }
    }
   
});

$scope.initProject = function()
{
subjectresource.$init({},function(data)
{
    if(!data.authorize)
    {
        $state.go('login');
    }
     else
    {
        if(data.role != "admin")
        {
           $scope.errmsg = "this user is not authorize"
           $state.go('login');
        }
        else
        {
             angular.forEach(data.obj,function(item) {
                 item.editmode = false;
                $scope.initSubject.push(item);
            });
        }
    }
});
}

$scope.btnAddClick = function()
{
    // $("#modal-add").modal('show');
    $scope.initSubject.push({
        "_id":0,
        "SubjectName": "",
        "IsActive" : true,
        "editmode" : false,
        "Questions" : []});
}


$scope.AddClik = function(obj)
{
    
    subjectresource.SubjectName = obj.SubjectName;
    subjectresource.$add().then(function(data)
    {
      
        if(data.success)
        {
            $("#modal-add").modal('hide');
            $scope.subject ="";
            $scope.initSubject = [];
            $scope.initProject();
        }
        else
        {

        }
    });
}

$scope.turnoffaddmode = function(index){
    $scope.initSubject.splice(index,1);
}

$scope.btnUpdateClick = function(obj)
{
    obj.editmode = true;
}

$scope.turnoffeditmode = function(obj){
    obj.editmode = false;    
}

$scope.UpdateClick = function(obj)
{
    // $("#modal-update").modal('hide');
    subjectresource._id = obj._id;
    subjectresource.SubjectName = obj.SubjectName;
    subjectresource.$update().then(function(data)
    {
       $scope.initSubject = [];
       $scope.initProject();
    })
}

$scope.btnDeleteClick = function(id)
{
    $("#modal-delete").modal('show');
  
    subjectresource.$get({_id:id}).then(function(data)
    {
       
        $scope.subject._id = data.obj._id;
        $scope.subject.SubjectName = data.obj.SubjectName;
    
      
    });
}

$scope.DeleteClick = function()
{
    $("#modal-delete").modal('hide');
    //subjectresource._id = $scope.subject._id;
  
    subjectresource.$delete({_id: $scope.subject._id}).then(function(data)
    {
       if(data.success)
       {
       $scope.initSubject = [];
       $scope.initProject();
       }
    });
}

$scope.btnQuestionsClick =function(_id, subjectname){
    passingdataservice.addObj = {"_id":_id,"subjectName":subjectname};
    $state.go('question-index');
}


});