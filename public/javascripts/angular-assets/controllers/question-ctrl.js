app.controller('questioncontroller', function ($scope, $state, questionResource) {

    var questionresource = new questionResource();
    $scope.questions =[];
    questionresource.$init({}, function(data){

        $scope.questions = data.Obj;
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
    $scope.btnUpdateClick = function(id){
            $("#modal-update").modal('show');
            questionresource.$get({_id:id},function(data){
            console.log(data);
            $scope.QuestionObj.question = data.Obj.Question;
            console.log($scope.QuestionObj.question);
            
        });
    }





    
});