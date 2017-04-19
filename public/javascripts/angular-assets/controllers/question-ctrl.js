app.controller('questioncontroller', function ($scope, $state, questionResource) {

    var questionresource = new questionResource();
    $scope.questions =[];
    questionresource.$init({}, function(data){

        $scope.questions = data.Obj.Questions;
        console.log($scope.questions);
        console.log(data.Obj);

    });

    $scope.QuestionObj = {'_id':"",'question':""};
    $scope.insert = function(){
        // questionresource._id = $scope.QuestionObj._id;
        questionresource.Question = $scope.QuestionObj.question;
        questionresource.$add(function(data){
            console.log(data.success);
            if(data.success){
                $state.go("question-index");
            }
        });
    };

    $scope.id = "";
    $scope.toEditpage = function(_id){
        $state.go("question-edit");
        $scope.id=_id;
        console.log(_id);
    }





    
});