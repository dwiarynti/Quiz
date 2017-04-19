app.controller('questioncontroller', function ($scope, questionResource) {

    var questionresource = new questionResource();
    $scope.questions =[];
    questionresource.$init({}, function(data){

        $scope.questions = data.Obj[0].Questions;
        console.log($scope.questions);
        console.log(data.Obj);

    });

    $scope.QuestionObj = {'_id':"",'question':""};
    $scope.insert = function(){
        // questionresource._id = $scope.QuestionObj._id;
        questionresource.Question = $scope.QuestionObj.question;
        questionresource.$add(function(data){
            console.log(data);
        });
    };


    
});