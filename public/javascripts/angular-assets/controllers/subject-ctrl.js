app.controller('subjectcontroller', function ($scope,$state,subjectResource, passingdataservice) {

var subjectresource = new subjectResource();
$scope.initSubject = [];
$scope.subject ={'_id ': "",'SubjectName': ""};

subjectresource.$init({},function(data)
{
    angular.forEach(data.obj,function(item) {
        $scope.initSubject.push(item);
    });
});

$scope.initProject = function()
{
subjectresource.$init({},function(data)
{
    $scope.initSubject = [];
    angular.forEach(data.obj,function(item) {
        $scope.initSubject.push(item);
    });
});
}

$scope.btnAddClick = function()
{
    $("#modal-add").modal('show');
}


$scope.AddClik = function()
{
    
    subjectresource.SubjectName = $scope.subject.SubjectName;
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

$scope.btnUpdateClick = function(id)
{
    $("#modal-update").modal('show');
  
    subjectresource.$get({_id:id}).then(function(data)
    {
       
        $scope.subject._id = data.obj._id;
        $scope.subject.SubjectName = data.obj.SubjectName;
    
      
    });
}

$scope.UpdateClick = function()
{
    $("#modal-update").modal('hide');
    subjectresource._id = $scope.subject._id;
    subjectresource.SubjectName = $scope.subject.SubjectName;
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
    subjectresource._id = $scope.subject._id;
    subjectresource.SubjectName = $scope.subject.SubjectName;
    subjectresource.$delete().then(function(data)
    {
       if(data.success)
       {
       $scope.initSubject = [];
       $scope.initProject();
       }
    })
}

$scope.btnQuestionsClick =function(_id){
    passingdataservice.addObj = _id;
    $state.go('question-index');
}


});