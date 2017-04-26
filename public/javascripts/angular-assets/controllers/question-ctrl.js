app.controller('questioncontroller', function ($scope, $state, questionResource, passingdataservice) {

    var questionresource = new questionResource();
    $scope.questions =[];
    $scope.subject_id =passingdataservice.addObj._id;
    $scope.subjectName =passingdataservice.addObj.subjectName;

$scope.init = function(){

    console.log(passingdataservice.addObj)
        questionresource.$init({_id:$scope.subject_id}, function(data){

            $scope.questions = data.Obj;
            console.log($scope.questions);
            // console.log($scope.questions);
            // console.log(data.Obj);

        });
    }
    $scope.init();

    


    $scope.QuestionObj = {'_id':"",'question':""};

    $scope.btnAddClick = function(id){
        $scope.QuestionObj = {'_id':"",'question':""};
        $("#modal-add").modal('show');
    }

    $scope.insert = function(){
        // $scope.QuestionObj = {'_id':"",'question':""};
        var questionresource = new questionResource();
        // questionresource._id = $scope.QuestionObj._id;
        questionresource.Subject_id = $scope.subject_id;
        questionresource.Question = $scope.QuestionObj.question;
        // console.log(questionresource);
        questionresource.$add(function(data){
            if(data.success){
                $("#modal-add").modal('hide');
                $scope.init();

            }
        });
    };
    


    $scope.updatedid = "";
    $scope.btnUpdateClick = function(id){
        $scope.QuestionObj._id = id;
        $("#modal-update").modal('show');
        questionresource.$getbyId({_id:id},function(data){
            $scope.QuestionObj.question = data.Obj.Question;
        });
    }
    $scope.UpdateClick = function()
    {
        $("#modal-update").modal('hide');
        questionresource._id = $scope.QuestionObj._id;
        questionresource.question = $scope.QuestionObj.question;
        questionresource.$update(function(data)
        {
            // $scope.initSubject = [];
            $scope.init();
        });
    }
    
    $scope.btnDeleteClick = function(_id){
        $("#modal-delete").modal('show');
        $scope.QuestionObj._id=_id;
    }    

    $scope.deleteClick = function(){
        $("#modal-delete").modal('hide');
        
        questionresource._id = $scope.QuestionObj._id;
        questionresource.Subject_id = $scope.subject_id;
        questionresource.$delete(function(data)
        {
            if(data.success)
            {
                $scope.init();
                
            }
        });
    }

    $scope.btnQuestionsClick =function(_id, question){
        passingdataservice.addObj = {"_id":_id, "question":question};
        $state.go('choices-index');
    }
});