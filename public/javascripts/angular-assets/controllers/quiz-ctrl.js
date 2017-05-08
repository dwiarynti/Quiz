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
$scope.submitquizobj = {"UserId":0, "Quiz":[], "Score":0, "SubjectName": $scope.subjectname };
$scope.No = 0;
$scope.displayedquestion = [];
$scope.togglebutton = true;
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
            console.log(data);
            // $scope.submitquizobj.Username = data.username;
            $scope.submitquizobj.UserId = data.userid;
            angular.forEach(data.obj,function(item) {
                $scope.Questions.push(item);
            });

            var Choices = [];

            for(var i = 0; i < $scope.Questions.length; i++)
            {
                $scope.Questions[i].Choices = [];
                $scope.Questions[i].No = 0;
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
            $scope.getsinglerandomquestion();
        });
    
}
    // $scope.nextquestion = function (obj){
    //     $scope.displayedquestion.push(obj);
    //     console.log(obj);
    //     if ($scope.displayedquestion.length >= $scope.Questions.length) {
    //         $scope.getsinglerandomquestion();
    //     }
    //     else{
    //         $scope.getsinglerandomquestion();
            
    //     }
    // }
    $scope.getsinglerandomquestion = function (){
        var obj = $scope.getEmptyAnswer();
        if(obj.length == 0){
            $scope.togglebutton = false;
        }else{
            $scope.randomQuestion = obj[Math.floor(Math.random() * obj.length)];
            if($scope.randomQuestion.No == 0){
                $scope.No = $scope.No+1;
                $scope.randomQuestion.No = $scope.No;
            }
        }
    }

    $scope.getEmptyAnswer = function(){
        return $filter('filter')($scope.Questions,function(item){return item.Answer === ""});
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
        });

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