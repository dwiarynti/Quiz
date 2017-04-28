app.controller('quizcontroller', function ($scope, $state,$filter, quizResource, submitquizResource, passingdataservice) {
var quizresource  = new quizResource();
var submitquiresource  = new submitquizResource();
$scope.init = [];
$scope.Questions = [];
$scope.Choices = [];
$scope.initData = [];
$scope.subject_id =passingdataservice.addObj.Subject_id;
$scope.subjectname =passingdataservice.addObj.SubjectName;
$scope.Score = 0;
$scope.userid = 123123;
$scope.submitquizobj = {"User_id":$scope.userid, "Quiz":[], "Score":0, "SubjectName": $scope.subjectname };

$scope.GetChoices = function(questionid)
    {
        quizresource.$getchoices({_id:questionid},function(data)
        {
            return data.obj;
        });
    }
    
$scope.init = function (){
  
        quizresource.$init({subject_id:$scope.subject_id }, function(data)
        {
            angular.forEach(data.obj,function(item) {
                $scope.Questions.push(item);
            });

            var Choices = [];

            for(var i = 0; i < $scope.Questions.length; i++)
            {
                $scope.Questions[i].Choices = [];
                $scope.Questions[i].No = i+1;
                $scope.Questions[i].Answer = "";
                quizresource.$getchoices({_id:$scope.Questions[i]._id},function(data)
                {
                    Choices = data.obj; 

                    for(var i = 0; i < $scope.Questions.length; i++)
                    {
                        $scope.Questions[i].Choices = $filter('filter')(Choices,function(item){
                            return item.Questions_id === $scope.Questions[i]._id
                        });

                    };
                });
                
            };
            console.log($scope.Questions);
        });
    
}


    $scope.init();

    $scope.submit = function(){
        var score=0;
        angular.forEach($scope.Questions,function(question) {
            var getcorrectanswer = $filter('filter')(question.Choices, function (choiceobj) { return choiceobj.isCorrectAnswer === true })[0];
            var getAnswer = $filter('filter')(question.Choices, function (choiceobj) { return choiceobj._id === question.Answer })[0];
            score = question.Answer == getcorrectanswer._id ?  score + 1 : score;

            $scope.submitquizobj.Quiz.push({
                "Question":question.Question,
                "Answer": getAnswer == undefined ? "":getAnswer.ChoicesName,
                "CorrectAnswer": getcorrectanswer.ChoicesName
            });
            console.log($scope.submitquizobj.Quiz);
        });
        console.log($scope.submitquizobj);

        //save
        var submitquiresource  = new submitquizResource();
        $scope.submitquizobj.Score = score * 10;        
        submitquiresource.submitquizobj = $scope.submitquizobj;
        submitquiresource.$add(function(data){
            $("#modal-score").modal('show');
        });
        console.log($scope.submitquizobj);
    }

    $scope.savesubmittedquiz = function(){
        
        return result;
    }


    



});