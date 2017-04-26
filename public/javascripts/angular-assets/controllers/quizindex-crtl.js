app.controller('quizindexcontroller', function ($scope, $state,$filter, subjectResource, passingdataservice) {

    var subjectresource = new subjectResource();
    $scope.subjectobj = [];

    subjectresource.$init({},function(data)
    {
        $scope.subjectobj = data.obj;
        console.log($scope.subjectobj);
    });


    $scope.quiz = function(subject_id){
        passingdataservice.addObj.Subject_id = subject_id;
        $state.go('quiz');
    }

});