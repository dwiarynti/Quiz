app.controller('subjectcontroller', function ($scope,$state,subjectResource) {

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
    $state.go('subject-create');
}


$scope.AddClik = function()
{
   
    subjectresource.SubjectName = $scope.subject.SubjectName;
    subjectresource.$add().then(function(data)
    {
      
        if(data.success)
        {
            $state.go('subject-index');
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
    subjectresource.$update().then(function(data)
    {
       $scope.initSubject = [];
       $scope.initProject();
    })
}


});