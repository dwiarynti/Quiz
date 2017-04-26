app.controller('quizindexcontroller', function ($scope, $state,$filter, subjectResource, passingdataservice) {

    var subjectresource = new subjectResource();
    $scope.subjectobj = [];

    subjectresource.$init({},function(data)
    {
        $scope.subjectobj = data.obj;
        console.log($scope.subjectobj);
    });


    $scope.quiz = function(subject_id, subjectname){
        passingdataservice.addObj.Subject_id = subject_id;
        passingdataservice.addObj.SubjectName = subjectname;
        $state.go('quiz');
    }

});